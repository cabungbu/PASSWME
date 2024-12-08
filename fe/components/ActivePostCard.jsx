import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { scaleHeight, scaleWidth } from "../assets/constant/responsive";
import CustomButton from "./customButton";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ActiveListingCard({ post }) {
  const handleClick = () => {};

  const formatDate = (timestamp) => {
    if (timestamp && typeof timestamp === "object") {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleString(); 
    }
    return timestamp; 
  };

  return (
    <View style={styles.container_card}>
      <View style={styles.horizontalSpacerContainer}>
        <View style={{ flexDirection: "row" }}>
          {post.images ? (
            <Image source={{ uri: post.images[0] }} style={styles.image} />
          ) : (
            <Text>No image available</Text>
          )}
          <View style={styles.information}>
            <Text>{post.title}</Text>
            <Text>Giá hehe</Text>
            <Text>Ngày đăng: {formatDate(post.start)}</Text>
          </View>
        </View>
        <Feather name="more-vertical" size={24} color="black" style={{}} />
      </View>
      <View style={[styles.horizontalSpacerContainer, {}]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="information-circle-outline" size={24} color="grey" />
          <Text>Thông tin</Text>
        </View>
        <CustomButton
          width={scaleWidth(160)}
          height={scaleHeight(40)}
          borderRadius={8}
          backgroundColor="transparent"
          borderColor="#CFCFCF"
          borderWidth={0.5}
          fontSize={13}
          fontFamily="medium"
          color="black"
          title="Đẩy tin đề xuất"
          onPress={handleClick}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_card: {
    width: "100%",
    height: scaleHeight(170),
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15)
  },
  horizontalSpacerContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: scaleWidth(90),
    height: scaleWidth(90),
    marginRight: scaleWidth(20),
    resizeMode: "cover",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black"
  },
  information: {
    fontSize: 13,
    fontFamily: "medium",
    color: "black"
  },
});
