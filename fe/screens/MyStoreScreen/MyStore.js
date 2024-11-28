import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Pressable, 
  useWindowDimensions 
} from 'react-native';
//import 
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

//tabs
import ActivePosts from "./ActivePosts";
import ClosedPosts from './ClosedPosts';
import SoldItems from './SoldItems';
import PendingOrders from "./PendingOrders";
import DeliveredOrders from "./DeliveredOrders";

//custom
import { COLOR } from "../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";

export default function MyStore() {
  const layout = useWindowDimensions();
  const ActivePostsTab = () => (
    <View style={{ flex: 1 }}>
      <ActivePosts/>
    </View>
  );

  const ClosedPostsTab = () => (
    <View style={{ flex: 1 }}>
      <ClosedPosts />
    </View>
  );

  const SoldItemsTab = () => (
    <View style={{ flex: 1 }}>
      <SoldItems />
    </View>
  );

  const PendingOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <PendingOrders />
    </View>
  );

  const DeliveredOrdersTab = () => (
    <View style={{ flex: 1 }}>
      <DeliveredOrders />
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Đang hiển thị" },
    { key: "closed", title: "Ngừng kinh doanh" },
    { key: "sold", title: "Đơn đã bán" },
    { key: "pendingOrders", title: "Đơn chưa xử lý" },
    { key: "deliveredOrders", title: "Đơn đã giao" },
  ]);


  const renderScene = SceneMap({
    active: ActivePostsTab,
    closed: ClosedPostsTab,
    sold: SoldItemsTab,
    pendingOrders: PendingOrdersTab,
    deliveredOrders: DeliveredOrdersTab
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLOR.mainColor,
        height: scaleHeight(2),
        bottom: 0,
        borderRadius: 100
      }}
      scrollEnabled={true}
      style={{
        backgroundColor: "#FFFFFF",
        outline: "none",
        padding: 0,
        position: "relative"
      }}
      renderLabel={({ route, focused }) => (
        <Pressable 
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 12,//scale(15),
              fontFamily: "bold",
            }}
          >
            {route.title}
          </Text>
        </Pressable>
      )}
    />
  );


  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor= "transparent"
        barStyle="light-content"
      />

      <View style={styles.headerL}>
        <Text style={styles.headerText}>Quản lý cửa hàng</Text>
      </View>
      <TabView
        lazy 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  )
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
  headerL: {
    height: scaleHeight(80),
    alignItems: "center",
    justifyContent: "center",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    flexDirection: "row",
    backgroundColor: COLOR.mainColor
  },
  headerText: {
    color: "#FFFFFF",
    marginTop: scaleHeight(30),
    fontSize: 20,
    fontFamily: "bold",
  },
});