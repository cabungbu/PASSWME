import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Header from "../headerSection/Header";
import GridView from "../gridViewSection/GridView";
import CustomRightDrawer from "../../../components/CustomRightDrawer";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";

export default function PostsDisplay({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "relative", title: "Liên quan" },
    { key: "lastest", title: "Mới nhất" },
    { key: "increase", title: "Giá tăng dần" },
    { key: "decrease", title: "Giá giảm dần" },
  ]);

  const relativePostTab = () => (
    <View style={{ flex: 1 }}>
      <Text>Liên quan</Text>
    </View>
  );
  const lastestPostTab = () => (
    <View style={{ flex: 1 }}>
      <Text>lastest</Text>
    </View>
  );

  const increasePostTab = () => (
    <View style={{ flex: 1 }}>
      <Text>increase</Text>
    </View>
  );

  const decreasePostTab = () => (
    <View style={{ flex: 1 }}>
      <Text>decrease</Text>
    </View>
  );

  const renderScene = SceneMap({
    relative: relativePostTab,
    lastest: lastestPostTab,
    increase: increasePostTab,
    decrease: decreasePostTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLOR.mainColor,
        height: scaleHeight(2),
        bottom: 0,
        borderRadius: 100,
      }}
      scrollEnabled={false}
      style={{
        backgroundColor: "#FFFFFF",
        outline: "none",
        padding: 0,
        position: "relative",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
      renderLabel={({ route, focused }) => (
        <TouchableOpacity style={{ alignItems: "center", padding: 0 }}>
          <Text
            style={{
              color: "black",
              fontSize: scaleWidth(12), //scale(15),
              fontFamily: "bold",
            }}
          >
            {route.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <>
      <Header />
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
      <GridView />
    </>
  );
}

const styles = StyleSheet.create({});
