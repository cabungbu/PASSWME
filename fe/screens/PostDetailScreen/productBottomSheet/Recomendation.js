import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import { BE_ENDPOINT_RCM } from "../../../settings/localVars";
import PostCard from "../../../components/postCard";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";

export default function Recomendation({ post }) {
  const [posts, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${BE_ENDPOINT_RCM}/recommendation/?id=${post.id}`
        );
        const data = await response.json();
        setPost(data.Recommendation);
      } catch (error) {
        console.error("Error fetching recomdation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text
        style={{
          marginLeft: scaleWidth(10),
          fontFamily: "medium",
          marginTop: scaleHeight(10),
        }}
      >
        Gợi ý cho bạn
      </Text>
      <View style={{ flex: 1 }}>
        {posts.length > 0 ? (
          <FlatList
            key="relative_post"
            data={posts}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            style={styles.Wrapper}
            keyExtractor={(item) => item.id}
            columnWrapperStyle={{ justifyContent: "space-evenly" }}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.container,
                  posts.length % 2 !== 0 && index === posts.length - 1
                    ? styles.containerLast
                    : null,
                ]}
              >
                <PostCard post={item} />
              </View>
            )}
          />
        ) : (
          <Text style={styles.text}>Chưa có bài đăng nào được tạo</Text>
        )}
      </View>
    </View>
  );
}
