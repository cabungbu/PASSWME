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

//import các tab trong screen
import ActiveListings from './ActivePosts';
import HiddenListings from './ClosedPosts';
import SoldItems from './SoldItems';

//hehe
import { COLOR } from "../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";

export default function MyStore() {
  const layout = useWindowDimensions();
  const ActiveListingsTab = () => (
    <View style={{ flex: 1 }}>
      <ActiveListings />
    </View>
  );

  const HiddenListingsTab = () => (
    <View style={{ flex: 1 }}>
      <HiddenListings />
    </View>
  );

  const SoldItemsTab = () => (
    <View style={{ flex: 1 }}>
      <SoldItems />
    </View>
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "active", title: "Đang hiển thị" },
    { key: "hidden", title: "Đã ẩn" },
    { key: "sold", title: "Đã bán" },
  ]);


  const renderScene = SceneMap({
    active: ActiveListingsTab,
    hidden: HiddenListingsTab,
    sold: SoldItemsTab,
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