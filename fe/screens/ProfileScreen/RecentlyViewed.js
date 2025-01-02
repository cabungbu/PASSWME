import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../assets/constant/color";
import mainStyles from "../../styles/mainStyles";
import { scaleWidth } from "../../assets/constant/responsive";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BE_ENDPOINT } from "../../settings/localVars";
import { useSelector } from "react-redux";
import RelativePost from "../postsDisplay/relativePost/RelativePost";

const RecentlyViewed = ({}) => {
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);

  console.log(BE_ENDPOINT + `/user/getUserById/${user?.id}`);
  const navigation = useNavigation();
  const [RecentlyViewedPostsData, setRecentlyViewedPostsData] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchAllUserPosts = async () => {
      try {
        setIsLoading(true);
        console.log("check");
        const res = await axios.get(
          BE_ENDPOINT + `/user/getUserById/${user?.id}`
        );
        const data = res.data.RecentlyViewed || [];
        console.log(res.data);
        console.log(res.data.RecentlyViewed);
        setRecentlyViewedPostsData(data);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data?.message);
        Alert.alert("Lỗi", "Không thể tải bài đăng");
      } finally {
        setIsLoading(false); // Đánh dấu đã load xong
      }
    };

    fetchAllUserPosts();
  }, [user?.id]);

  if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

  return (
    <View style={{ flex: 1 }}>
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
        <Text style={mainStyles.headerText}>Các tin đăng đã xem gần đây</Text>
      </View>
      <View style={{ flex: 1 }}>
        <RelativePost posts={RecentlyViewedPostsData} />
      </View>
    </View>
  );
};

export default RecentlyViewed;
