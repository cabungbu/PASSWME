import React from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { COLOR } from "../../assets/constant/color";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

export default function Home() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log(user);
  // let axiosJWT =axios.create();
  // axiosJWT.interceptors.request.use(
  //   async(config) => {

  //   }
  // )
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "light", fontWeight: "300" }}>
        Chào! {user.username}
      </Text>
      <TouchableOpacity
        style={styles.login}
        onPress={() => {
          console.log("Press login");
          navigation.navigate("Login");
        }}
      >
        <Text style={{ color: "#E30414" }}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
