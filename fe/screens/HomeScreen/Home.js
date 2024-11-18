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
import BannerSection from "./partials/bannerSection";
import CategorySection from "./partials/categorySection";

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
      <BannerSection />

      <CategorySection />
    </View>
  );
}
