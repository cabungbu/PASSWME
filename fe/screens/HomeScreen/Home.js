import React, { useState, useEffect } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { COLOR } from "../../assets/constant/color";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  // let axiosJWT =axios.create();
  // axiosJWT.interceptors.request.use(
  //   async(config) => {

  //   }
  // )
  return (
    <View style={styles.container}>
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

      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.coinContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather name="dollar-sign" size={24} color="#F24E1E" />
            <Text style={styles.coin}>500</Text>
          </View>
          <Text>Nhấn để nhận xu mỗi ngày</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
