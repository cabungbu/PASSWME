import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImageSection from "./imageSection";
import { BE_ENDPOINT } from "../../settings/localVars";
import { ActivityIndicator } from "react-native";
import styles from "./style";
import DataSection from "./dataPostSection";
import BottomTabSection from "./BottomTabSection/bottomTabSection";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import ShoppingCartIcon from "../../components/shoppingCartIcon";
export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
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
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>

        <View style={styles.cartIconContainer}>
          <ShoppingCartIcon cartColor={"black"} size={20} />

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
