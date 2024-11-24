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
import ServicePostSection from "./partials/servicePostSection";
import CategorySection from "./partials/categorySection";
import { BE_ENDPOINT } from "../../settings/localVars";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  setRefreshToken,
  setAccessToken,
} from "../../redux/authSlice";

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const refreshTokenRedux = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  // const refreshToken = async () => {
  //   try {
  //     const res = await fetch(BE_ENDPOINT + "/auth/refresh", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         refreshToken: refreshTokenRedux,
  //       }),
  //     });
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // let axiosJWT = axios.create();
  // axiosJWT.interceptors.request.use(async (config) => {
  //   let date = new Date();
  //   const decodedToken = jwt_decode(user?.accessToken);
  //   if (decodedToken.exp < date.getTime() / 1000) {
  //     const data = await refreshToken();
  //     const refreshUser = {
  //       ...user,
  //       accessToken: data.accessToken,
  //       refreshToken: data.refreshToken,
  //     };
  //     dispatch(loginSuccess(refreshUser));
  //     dispatch(setAccessToken(data.accessToken));
  //     dispatch(setRefreshToken(data.refreshToken));
  //     config.headers["token"] = "Bearer " + data.accessToken;
  //   }
  //   return config;
  // }, (err) =>{ return Promise.reject(err)});
  return (
    <View style={styles.container}>
      <BannerSection />
      <CategorySection />
      <ServicePostSection />
    </View>
  );
}
