import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";
import AntDesign from "@expo/vector-icons/AntDesign";
import ShoppingCartIcon from "../../../components/shoppingCartIcon";

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
          <ShoppingCartIcon cartColor="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
