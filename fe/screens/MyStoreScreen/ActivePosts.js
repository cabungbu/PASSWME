// ActiveListings.js
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import ActiveListingCard from "../../components/ActivePostCard";
import { BE_ENDPOINT } from "../../settings/localVars";
import { useSelector } from "react-redux";
import { scaleHeight } from "../../assets/constant/responsive";

export default function ActiveListings() {
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUserPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          BE_ENDPOINT + `/user/getUserById/${user.id}`
        );
        const postsData = res.data.posts || [];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error.response?.data?.message);
        Alert.alert("Lỗi", "Không thể tải bài đăng");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUserPosts();
  }, [user?.id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#369C33"
        style={{ margin: scaleHeight(20) }}
      />
    );
  }

  if (posts.length === 0) {
    return <Text>Không có bài đăng</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ActiveListingCard key={item.id?.toString()} post={item} />
        )}
        keyExtractor={(item) => item.id?.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.flatListContent}
        onEndReachedThreshold={0.5}
        bounces={true}
        ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  flatListContent: {
    paddingBottom: 90,
  },
});
