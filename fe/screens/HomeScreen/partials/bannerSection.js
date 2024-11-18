import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import styles from "./style";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function BannerSection() {
  return (
    <View style={styles.bannerSection}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/007/001/730/non_2x/hello-summer-banner-background-free-vector.jpg",
        }}
        style={styles.banner}
        resizeMode="contain"
      />
      <View style={styles.seachBarAndIcon}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="search1"
            size={20}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm"
            placeholderTextColor="#CCCCCC"
          />
        </View>
        <TouchableOpacity style={styles.containerBadge}>
          <Feather name="shopping-cart" size={24} color="black" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
