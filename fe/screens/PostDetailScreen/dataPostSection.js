import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "./style";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../assets/constant/color";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function DataSection({ post }) {
  return (
    <>
      <View style={{ paddingHorizontal: 15, backgroundColor: "white" }}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome6 name="location-dot" size={20} color="#A0A0A0" />
          <Text style={styles.location}>
            {post.owner.address ? post.owner.address : "Chưa xác định"}
          </Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="time-outline" size={20} color="#A0A0A0" />
          <Text style={styles.location}>{post.start}</Text>
        </View>
      </View>
      <View style={styles.phanCachXam} />
      <TouchableOpacity style={styles.ownerContainer}>
        <Image
          style={{ width: 50, height: 50, marginRight: 15, borderRadius: 100 }}
          source={{ uri: post.owner.avatar }}
          onError={(e) =>
            console.error("Avatar load error:", e.nativeEvent.error)
          }
        />
        <View>
          <Text style={styles.ownerName}>{post.owner.username}</Text>
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
          >
            <Text style={styles.follower}>5 người theo dõi</Text>
            <Text style={styles.ownerPost}>
              {post.owner.posts.length} sản phẩm
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.phanCachXam} />
      <View style={styles.dataDescription}>
        <View style={styles.locationContainer}>
          <Text style={styles.tinhTrangSanPham}>Tình trạng sản phẩm: </Text>
          <Text style={styles.condition}>{post.condition}</Text>
        </View>
        <View style={styles.gachChanXam} />

        <Text style={styles.in4SanPham}>Thông tin sản phẩm</Text>
        <Text style={styles.tinhTrangSanPham}>{post.description}</Text>
      </View>
      <View style={styles.phanCachXam} />

      <View style={styles.dataDescription}>
        <Text style={{ fontFamily: "medium", fontSize: 13, color: "#000" }}>
          Đánh giá sản phẩm
        </Text>
        <Text style={{ fontFamily: "medium", fontSize: 13, color: "#000" }}>
          Đánh giá sản phẩm
        </Text>
        <Text style={{ fontFamily: "medium", fontSize: 13, color: "#000" }}>
          Đánh giá sản phẩm
        </Text>
        <Text style={{ fontFamily: "medium", fontSize: 13, color: "#000" }}>
          Đánh giá sản phẩm
        </Text>
        <Text style={{ fontFamily: "medium", fontSize: 13, color: "#000" }}>
          Đánh giá sản phẩm
        </Text>
      </View>
    </>
  );
}
