import React, { useEffect } from "react";
import {
  Alert,
  Animated,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
// Import styles
import styles from "./style";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/authSlice";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome To</Text>
      <Image
        source={require("../../assets/logoPasswme1.png")}
        style={{ width: 150, height: 150 }}
      />
      <TouchableOpacity
        style={styles.login}
        onPress={() => {
          console.log("Press login");
          navigation.navigate("Login");
        }}
      >
        <Text style={{ color: "#E30414" }}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.register}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={{ color: "#fff" }}>Đăng ký</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require("../../assets/imgWelcome.png")}
      />
    </View>
  );
};

export default WelcomePage;
