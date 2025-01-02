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
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../redux/authService";
import { useSelector } from "react-redux";

import styles from "./style";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import Information_TextInput from "../../components/Information_TextInput";
import mainStyles from "../../styles/mainStyles";
import { BE_ENDPOINT } from "../../settings/localVars";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const handelFotgotPassword = async () => {
    // setIsLoad(true);
    console.log("vao");
    try {
      setIsLoad(true);
      const res = await fetch(BE_ENDPOINT + "/auth/forgotPassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await res.json();
      alert(data.message);
      setIsLoad(false);
      return await res.json();
    } catch (e) {
      console.log("Loi o quen mat khau" + e.message);
    }
  };
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
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={mainStyles.headerCenterContainer}>
            <Ionicons
              style={mainStyles.headerIcon}
              name="chevron-back"
              size={scaleWidth(30)}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={[
                mainStyles.headerCenterText,
                { marginRight: scaleWidth(30) },
              ]}
            >
              Quên mật khẩu
            </Text>
          </View>
        </>
      ) : (
        <View style={styles.headerIOS}>
          <Ionicons
            style={styles.iconHeaderIOS}
            name="chevron-back"
            size={24}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headerText}>Quên mật khẩu</Text>
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
          style={{
            width: scaleHeight(150),
            height: scaleHeight(150),
            marginBottom: scaleHeight(30),
            marginTop: scaleHeight(50),
          }}
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
              fontSize: 10,
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
          placeholder="Nhập email quên mật khẩu"
          onChangeText={(text) => setEmail(text)}
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.forgot}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>

        {isLoad ? (
          <TouchableOpacity style={styles.login}>
            <ActivityIndicator />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.login}
            onPress={() => handelFotgotPassword()}
          >
            <Text style={styles.logintext}>Xác nhận</Text>
          </TouchableOpacity>
        )}

        {/* <TouchableOpacity style={styles.ggfbcontainer}>
          <GoogleBrandIcon size={24} />
          <Text style={styles.ggfbtext}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <FacebookBrandIcon size={24} />
          <Text style={styles.ggfbtext}>Tiếp tục với Facebook</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ForgotPassword;
