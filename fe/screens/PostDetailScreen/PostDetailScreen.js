import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import ImageSection from "./imageSection";
import { BE_ENDPOINT } from "../../settings/localVars";
import { ActivityIndicator } from "react-native";
import styles from "./style";
import DataSection from "./dataPostSection";
import BottomTabSection from "./BottomTabSection/bottomTabSection";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${BE_ENDPOINT}/post/getPostById/${postId}/`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No post found.</Text>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#E30414"
            translucent={true}
          />
        </>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <View
            style={{ height: 44, width: "100%", backgroundColor: "#E30414" }}
          />
        </>
      )}
      <View style={styles.topBar}>
        <View style={styles.backIcon}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </View>

        <View style={styles.cartIconContainer}>
          <View style={{ flexDirection: "row" }}>
            <Feather name="shopping-cart" size={20} color="black" />
            <View style={styles.numberOfNoti}>
              <Text
                style={{
                  fontFamily: "regular",
                  fontSize: "10",
                  color: "white",
                }}
              >
                5
              </Text>
            </View>
          </View>

          <Feather name="more-vertical" size={20} color="black" />
        </View>
      </View>

      <ScrollView>
        <ImageSection images={post.images} post={post} />
        <DataSection post={post} />
      </ScrollView>
      <BottomTabSection />
    </View>
  );
}
