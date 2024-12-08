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
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../redux/authService";
import { useSelector } from "react-redux";

import styles from "./style";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import FacebookBrandIcon from "../../assets/icons/FacebookBrandIcon";
import GoogleBrandIcon from "../../assets/icons/GoogleBrandIcon";
import { scaleHeight } from "../../assets/constant/responsive";
import Information_TextInput from "../../components/Information_TextInput";

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const handleLogin = () => {
    const newUser = {
      email: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigation);
  };
  const moveToRegister = () => {
    navigation.navigate("Register");
  };
  
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#E30414"
            translucent={true}
          />
          <View style={styles.header}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="white"
              onPress={() => {navigation.navigate("Welcome")}}
            />
            <Text style={styles.headerText}>Đăng nhập</Text>
          </View>
        </>
      ) : (
        <View style={styles.headerIOS}>
          <Ionicons
            style={styles.iconHeaderIOS}
            name="chevron-back"
            size={24}
            color="white"
            onPress={() => {navigation.navigate("Welcome")}}
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
          style={{ width: scaleHeight(150), height: scaleHeight(150), marginBottom: scaleHeight(30), marginTop: scaleHeight(50)}}
        />
        {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              width: "80%",
              textAlign: "left",
              marginBottom: 10,
              fontFamily: "lightItalic",
              fontSize: "10",
            }}
          >
            *{error}
          </Text>
        )}

        <Information_TextInput 
          IconComponent={MaterialCommunityIcons}
          iconName="email-outline"
          iconSize={24}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Email"
          onChangeText={(text) => setUsername(text)}
        />
        <Information_TextInput 
          IconComponent={Feather}
          iconName="lock"
          iconSize={24}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Mật khẩu"
          Password={true}
          onChangeText={(text) => setPassword(text)}
        />

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            width: "80%",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={moveToRegister}>
            <Text style={styles.register}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.login} onPress={() => handleLogin()}>
          <Text style={styles.logintext}>Đăng nhập</Text>
        </TouchableOpacity>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <View style={styles.greyline} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.greyline} />
        </View>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <GoogleBrandIcon size={24}/>
          <Text style={styles.ggfbtext}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <FacebookBrandIcon size={24}/>
          <Text style={styles.ggfbtext}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
