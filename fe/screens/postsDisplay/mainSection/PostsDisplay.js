import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../headerSection/Header";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLOR } from "../../../assets/constant/color";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
import { BE_ENDPOINT } from "../../../settings/localVars";
import RenderTabBar from "../../../components/RenderTabBar";

import { ActivityIndicator } from "react-native";
import _ from "lodash";

import RelativePost from "../relativePost/RelativePost";
import LastestPost from "../relativePost/LastestPost";
import IncreasePost from "../relativePost/IncreasePost";
import DecreasePost from "../relativePost/DecreasePost";

export default function PostsDisplay() {
  const route = useRoute();
  const { categoryId } = route.params;
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const routes = useMemo(
    () => [
      { key: "relative", title: "Liên quan" },
      { key: "lastest", title: "Mới nhất" },
      { key: "increase", title: "Giá tăng dần" },
      { key: "decrease", title: "Giá giảm dần" },
    ],
    []
  );

  const RelativeScene = useCallback(() => {
    return <RelativePost posts={posts} />;
  }, [posts]);

  const LastestScene = useCallback(() => {
    return <LastestPost posts={posts} />;
  }, [posts]);

  const IncreaseScene = useCallback(() => {
    return <IncreasePost posts={posts} />;
  }, [posts]);

  const DecreaseScene = useCallback(() => {
    return <DecreasePost posts={posts} />;
  }, [posts]);

  const renderScene = useMemo(
    () =>
      SceneMap({
        relative: RelativeScene,
        lastest: LastestScene,
        increase: IncreaseScene,
        decrease: DecreaseScene,
      }),
    [RelativeScene, LastestScene]
  );

  const renderTabBar = RenderTabBar({scroll: false, fontSize: 12, padding: 5, autoWidth: true});


  const fetchPosts = () => {
    setLoading(true);
    fetch(BE_ENDPOINT + `/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("call fetchPosts");
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts in postsDisplay:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <View style={styles.containerIndicator}>
          <ActivityIndicator size="large" color="#737373" />
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
});
