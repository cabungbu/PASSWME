import React from "react";
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

const WelcomePage = () => {
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
        source={require("../../assets/imageWelcome.png")}
      />
    </View>
  );
};

export default WelcomePage;
