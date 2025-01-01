import React, { useEffect, useState, useCallback } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
//import
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useSelector } from "react-redux";
import { BE_ENDPOINT } from "../../settings/localVars";

//tabs
import ActivePosts from "./ActivePosts";
import ClosedPosts from "./ClosedPosts";
import SoldItems from "./SoldItems";
import PendingOrders from "./PendingOrders";
import DeliveringOrders from "./DeliveringOrders";
import PreparingOrders from "./PreparingOrders";

//custom
import { COLOR } from "../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import RenderTabBar from "../../components/RenderTabBar";

const statusBarHeight = (StatusBar.currentHeight || 30) - 15;

export default function MyStore() {
  const layout = useWindowDimensions();
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrder = () => {
    fetch(BE_ENDPOINT + `/order/getUserOrderReceived/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);
  const ActivePostsTab = () => (
    <View style={{ flex: 1 }}>
      <ActivePosts />
    </View>
  );

  const ClosedPostsTab = () => (
    <View style={{ flex: 1 }}>
      <ClosedPosts />
    </View>
  );

  const SoldItemsTab = () => (
    <View style={{ flex: 1 }}>
      <SoldItems orders={orders} />
    </View>
  );

  const PendingOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <PendingOrders
        orders={orders}
        onOrderDelete={(order) => handleOrderDelete(order)}
        onAccept={(order) => handleOrderAccept(order)}
      />
    </View>
  );

  const PreparingOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <PreparingOrders
        orders={orders}
        onDelivering={(order) => handleDelivering(order)}
      />
    </View>
  );

  const DeliveringOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <DeliveringOrders
        orders={orders}
        onComple={(order) => handleComplete(order)}
      />
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Đang hiển thị" },
    { key: "closed", title: "Ngừng\nkinh doanh" },
    { key: "pending", title: "Đơn chưa\nxác nhận" },
    { key: "preparing", title: "Đơn chưa giao" },
    { key: "delivering", title: "Đơn đã giao" },
    { key: "sold", title: "Đơn đã bán" },
  ]);

  const renderScene = SceneMap({
    active: ActivePostsTab,
    closed: ClosedPostsTab,
    pending: PendingOrdersTab,
    preparing: PreparingOrdersTab,
    delivering: DeliveringOrdersTab,
    sold: SoldItemsTab,
  });

  const renderTabBar = RenderTabBar();

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

  const handleOrderAccept = (order) => {
    Alert.alert(
      "Bạn có chắc muốn nhận đơn hàng",
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
              body: JSON.stringify({ status: "preparing" }),
            })
              .then((res) => {
                setLoading(false);
                if (res.ok) {
                  setIndex(3);
                  fetchOrder();
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

  const handleDelivering = (order) => {
    Alert.alert(
      "Bạn có chắc đã giao đơn hàng cho đơn vị vận chuyển",
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
              body: JSON.stringify({ status: "delivering" }),
            })
              .then((res) => {
                setLoading(false);
                if (res.ok) {
                  setIndex(4);
                  fetchOrder();
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
          onPress: () => console.log("Hủy hành động đã vận chuyển đơn hàng"),
          style: "cancel",
        },
      ],
      { cancelable: true, onDismiss: () => console.log("Alert dismissed") }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.myStore_headerContainer}>
        <Text style={styles.myStore_headerText}>Quản lý cửa hàng</Text>
      </View>

      {loading ? (
        <View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#EFEFEF",
  },
  scrollView: {
    flex: 1,
  },
  myStore_headerContainer: {
    height: scaleHeight(80) + statusBarHeight,
    paddingTop: statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    backgroundColor: COLOR.mainColor,
  },
  myStore_headerText: {
    color: "#FFFFFF",
    marginTop: statusBarHeight,
    fontSize: 20,
    fontFamily: "bold",
  },
});
