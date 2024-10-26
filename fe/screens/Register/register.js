import React, { useEffect, useState } from "react";
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
import styles from "./styleRegister";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { CheckBox } from "@rneui/themed";
import { registerUser } from "../../redux/authService";
import { useDispatch, useSelector } from "react-redux";
import { registerFailure } from "../../redux/authSlice";

const RegisterPage = () => {
  const navigation = useNavigation();
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSDT] = useState("");
  const handleRegister = () => {
    if (!checked) {
      dispatch(registerFailure("Vui lòng đồng ý với điều khoản sử dụng"));
      return;
    }
    const newUser = {
      email: email,
      password: password,
      phone: sdt,
      username: username,
    };

    registerUser(newUser, dispatch, navigation);
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
        <>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerIOS}>
            <Ionicons
              style={styles.iconHeaderIOS}
              name="chevron-back-circle-outline"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Đăng ký</Text>
          </View>
        </>
      )}

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
        }}
      >
        {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              width: "80%",
              textAlign: "left",
              marginBottom: 10,
              fontFamily: "lightItalic",
              fontSize: "10px",
            }}
          >
            *{error}
          </Text>
        )}
        <View style={[styles.inputContainer, error && { borderColor: "red" }]}>
          <Feather
            name="user"
            size={24}
            color="#777777"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#CCCCCC"
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={[styles.inputContainer, error && { borderColor: "red" }]}>
          <MaterialCommunityIcons
            name="phone"
            size={24}
            color="#777777"
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            placeholderTextColor="#CCCCCC"
            onChangeText={(text) => setSDT(text)}
          />
        </View>

        <View style={[styles.inputContainer, error && { borderColor: "red" }]}>
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
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={[styles.inputContainer, error && { borderColor: "red" }]}>
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
            width: "80%",
            flexDirection: "row",
          }}
        >
          <CheckBox
            checked={checked}
            onPress={toggleCheckbox}
            // Use ThemeProvider to make change for all checkbox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#E30414"
            containerStyle={{
              padding: 0,
              marginLeft: 0,
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
          />
          <Text style={styles.CheckBoxText}>
            Bằng việc đăng ký, bạn đã đọc và chấp nhận với Điều khoản sử dụng và
            chính sách bảo mật của Passwme
          </Text>
        </View>
        <TouchableOpacity style={styles.login} onPress={() => handleRegister()}>
          <Text style={styles.logintext}>Đăng ký</Text>
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.DacoTK}>Đã có tài khoản? </Text>
          <Text style={styles.loginSmallText}>Đăng nhập</Text>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            flexDirection: "row",
            marginTop: 20,
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

export default RegisterPage;
