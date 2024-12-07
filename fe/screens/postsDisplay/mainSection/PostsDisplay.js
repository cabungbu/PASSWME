import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../headerSection/Header";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { BE_ENDPOINT } from "../../../settings/localVars";
import RelativePost from "../relativePost/RelativePost";

export default function PostsDisplay({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const routes = useMemo(
    () => [
      { key: "relative", title: "Liên quan" },
      { key: "lastest", title: "Mới nhất" },
      { key: "increase", title: "Giá tăng dần" },
      { key: "decrease", title: "Giá giảm dần" },
    ],
    []
  );

  const relativePostTab = () => <RelativePost posts={posts} />;
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

  const renderTabBar = (props) => {
    const { key, ...restProps } = props;
    return (
      <TabBar
        {...restProps}
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
        renderLabel={({ route, focused }) => {
          return (
            <TouchableOpacity style={{ alignItems: "center", padding: 0 }}>
              <Text
                style={{
                  color: COLOR.mainColor,
                  fontSize: scaleWidth(12),
                  fontFamily: "bold",
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  useEffect(() => {
    fetch(BE_ENDPOINT + `/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching posts in postsDisplay:", error);
      });
  }, []);

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
    </>
  );
}

const styles = StyleSheet.create({});
