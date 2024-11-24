import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "./style";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { BE_ENDPOINT } from "../../../settings/localVars";
import PostCard from "../../../components/postCard";

export default function ServicePostSection() {
  const [servicePost, setServicePost] = useState([]);

  useEffect(() => {
    fetch(BE_ENDPOINT + "/servicePost/get")
      .then((res) => res.json())
      .then((data) => {
        setServicePost(data);
      })
      .catch((error) => {
        console.error("Error fetching servicePost:", error);
      });
  }, []);
  return (
    <View>
      <View style={styles.textSection}>
        <Text style={styles.maybeYouLike}>CÓ THỂ BẠN SẼ THÍCH</Text>
        <View style={styles.viewAll}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
          <EvilIcons name="arrow-right" size={24} color="#F24E1E" />
        </View>
      </View>

      {/* <FlatList
        data={servicePost}
        renderItem={({ item }) => <PostCard post={item.post} />}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      /> */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {servicePost.map((item) => (
          <View key={item.id}>
            <PostCard post={item.post} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
