// renderTabBar.js
import React from "react";
import { Text, Pressable } from "react-native";
import { TabBar } from "react-native-tab-view";
import { COLOR } from "../assets/constant/color";
import { scaleHeight } from "../assets/constant/responsive";

const RenderTabBar = (props = {}) => {
  const { fontSize = scaleHeight(15), scroll = true } = props;

  return (tabBarProps) => (
    <TabBar
      {...tabBarProps}
      indicatorStyle={{
        backgroundColor: COLOR.mainColor,
        height: scaleHeight(4),
        bottom: 0,
        borderRadius: 100,
      }}
      scrollEnabled={scroll}
      style={{
        backgroundColor: "#FFFFFF",
        outline: "none",
        padding: 0,
        position: "relative",
      }}
      renderLabel={({ route, focused }) => (
        <Pressable
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: focused ? "black" : "#a0a0a0",
              fontSize: fontSize,
              fontFamily: "semiBold",
            }}
          >
            {route.title}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default RenderTabBar;
