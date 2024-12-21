import React, { useCallback, useState, useEffect } from "react";
import { StatusBar, Text, View, ActivityIndicator } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import mainStyles from "../../../styles/mainStyles";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../../assets/constant/color";
import { scaleWidth } from "../../../assets/constant/responsive";
import RenderTabBar from "../../../components/RenderTabBar";
import { useNavigation } from "@react-navigation/native";
import PendingOrder from "./PendingOrder";
import { BE_ENDPOINT } from "../../../settings/localVars";
import { isLoading } from "expo-font";
const OrderStatus = ({ route }) => {
  const { tab = 0 } = route.params || {};
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const pendingOrdersTab = useCallback(() => {
    return <PendingOrder orders={orders} />;
  }, [orders]);

  const shippingOrdersTab = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <Text>Chờ chuẩn bị hàng</Text>
      </View>
    );
  }, [orders]);

  const deliveryOrdersTab = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <Text>Chờ nhận hàng</Text>
      </View>
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
    shipping: shippingOrdersTab,
    delivery: deliveryOrdersTab,
  });

  const fetchOrder = () => {
    setLoading(true);
    fetch(BE_ENDPOINT + `/order/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("call fetchPosts : " + data);
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

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
