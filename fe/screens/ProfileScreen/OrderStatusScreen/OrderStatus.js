import React, { useCallback, useState, useEffect } from "react";
import { StatusBar, Text, View, ActivityIndicator, Alert } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import mainStyles from "../../../styles/mainStyles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../../assets/constant/color";
import { scaleWidth } from "../../../assets/constant/responsive";
import RenderTabBar from "../../../components/RenderTabBar";
import { useNavigation } from "@react-navigation/native";
import PendingOrder from "./PendingOrder";
import DeliveringOrder from "./DeliveringOrder";
import PreparingOrder from "./PreparingOrder";
import { BE_ENDPOINT } from "../../../settings/localVars";
import { useSelector } from "react-redux";
const OrderStatus = ({ route }) => {
  const user = useSelector((state) => state.auth.user);
  const { tab = 0 } = route.params || {};
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const pendingOrdersTab = useCallback(() => {
    return (
      <PendingOrder
        orders={orders}
        onOrderDelete={(order) => handleOrderDelete(order)}
      />
    );
  }, [orders]);

  const shippingOrdersTab = useCallback(() => {
    return <PreparingOrder orders={orders} />;
  }, [orders]);

  const deliveryOrdersTab = useCallback(() => {
    return (
      <DeliveringOrder
        orders={orders}
        onComplete={(order) => handleComplete(order)}
      />
    );
  }, [orders]);

  const [index, setIndex] = useState(tab);
  const [routes] = useState([
    { key: "pending", title: "Chờ xác nhận" },
    { key: "preparing", title: "Chờ chuẩn bị hàng" },
    { key: "delivering", title: "Chờ nhận hàng" },
  ]);

  const renderTabBar = RenderTabBar();

  const renderScene = SceneMap({
    pending: pendingOrdersTab,
    preparing: shippingOrdersTab,
    delivering: deliveryOrdersTab,
  });

  const fetchOrder = () => {
    setLoading(true);
    fetch(BE_ENDPOINT + `/order/getUserOrder/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleOrderDelete = (order) => {
    Alert.alert(
      "Bạn có chắc muốn hủy đơn hàng",
      "Hành động này không thể hoàn tác",
      [
        {
          text: "Đồng ý",
          onPress: () => {
            setLoading(true);
            fetch(BE_ENDPOINT + `/order/deleteOrder/${order.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                setLoading(false);
                if (res.ok) {
                  setOrders(orders.filter((o) => o.id !== order.id));
                } else {
                  alert("Không tìm thấy đơn hàng", "Có thể đơn hàng đã bị xóa");
                  fetchOrder();

                  // console.error("Error deleting order:", res.statusText);
                }
              })
              .catch((error) => {
                console.error("Error deleting order:", error);
              });
          },
        },
        {
          text: "Hủy",
          onPress: () => console.log("Hủy hành động xóa đơn hàng"),
          style: "cancel",
        },
      ],
      { cancelable: true, onDismiss: () => console.log("Alert dismissed") }
    );
  };

  const handleComplete = (order) => {
    Alert.alert(
      "Bạn có chắc nhận hàng thành công",
      "Hành động này không thể hoàn tác",
      [
        {
          text: "Đồng ý",
          onPress: () => {
            setLoading(true);
            fetch(BE_ENDPOINT + `/order/updateOrder/${order.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "sold" }),
            })
              .then((res) => {
                setLoading(false);
                if (res.ok) {
                  fetchOrder();
                } else {
                  alert("Không tìm thấy đơn hàng", "Có thể đơn hàng đã bị xóa");
                  fetchOrder();

                  // console.error("Error deleting order:", res.statusText);
                }
              })
              .catch((error) => {
                console.error("Error sold order:", error);
              });
          },
        },
        {
          text: "Hủy",
          onPress: () =>
            console.log("Hủy hành động đã nhận thành công đơn hàng"),
          style: "cancel",
        },
      ],
      { cancelable: true, onDismiss: () => console.log("Alert dismissed") }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EFEFEF" }}>
      <StatusBar
        translucent={true}
        backgroundColor="white"
        barStyle="dark-content"
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons
          onPress={() => {
            navigation.goBack();
          }}
          name="chevron-back"
          size={scaleWidth(30)}
          color={COLOR.mainColor}
        />
        <Text style={mainStyles.headerText}>{routes[index].title}</Text>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#A0A0A0" />
        </View>
      ) : (
        <TabView
          lazy
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
        />
      )}
    </View>
  );
};

export default OrderStatus;
