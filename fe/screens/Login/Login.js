import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
  Animated,
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { loginUser } from "../../redux/authService";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const handleLogin = () => {
    console.log("Login");
    const newUser = {
      email: username,
      password: password,
    };

    console.log("Sending login request with data:", newUser);
    loginUser(newUser, dispatch, navigation);
  };
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#E30414"
            translucent={true}
          />
          <View style={styles.header}>
            <Text style={styles.headerText}>Đăng nhập</Text>
            <Ionicons
              name="chevron-back-circle-outline"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
        </>
      ) : (
        <View style={styles.headerIOS}>
          <Ionicons
            style={styles.iconHeaderIOS}
            name="chevron-back-circle-outline"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>Đăng nhập</Text>
        </View>
      )}

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/logoPasswme1.png")}
          style={{ width: 150, height: 150, marginVertical: 50 }}
        />
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="#777777"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CCCCCC"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Feather
            name="lock"
            size={24}
            color="#777777"
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#CCCCCC"
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "80%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity>
            <Text style={styles.register}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
          <Text style={styles.logintext}>Đăng nhập</Text>
        </TouchableOpacity>

        {error && (
          <Text style={{ color: "red", textAlign: "center" }}>
            Đăng nhập thất bại
          </Text>
        )}
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            flexDirection: "row",
          }}
        >
          <View style={styles.greyline} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.greyline} />
        </View>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <Image style={styles.image} source={require("../../assets/gg.png")} />
          <Text style={styles.ggfbtext}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <Image
            style={styles.image}
            source={require("../../assets/facebook.png")}
          />
          <Text style={styles.ggfbtext}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
