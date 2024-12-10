import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from "@rneui/themed";
import { registerUser } from "../../redux/authService";
import { registerFailure } from "../../redux/authSlice";
import { useNavigation } from "@react-navigation/native";

import styles from "./registerStyle";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import Information_TextInput from "../../components/Information_TextInput";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import FacebookBrandIcon from "../../assets/icons/FacebookBrandIcon";
import GoogleBrandIcon from "../../assets/icons/GoogleBrandIcon";

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
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={styles.header}>
            <Ionicons
              style={styles.headerIcon}
              name="chevron-back"
              size={scaleWidth(28)}
              color="white"
              onPress={() => {navigation.navigate("Welcome")}}
            />
            <Text style={styles.headerText}>Đăng nhập</Text>
          </View>
        </>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerIOS}>
            <Ionicons
              style={styles.iconHeaderIOS}
              name="chevron-back"
              size={scaleWidth(28)}
              color="white"
              onPress={() => {navigation.navigate("Welcome")}}
            />
            <Text style={styles.headerText}>Đăng ký</Text>
          </View>
        </>
      )}

      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: scaleHeight(50),
      }}>
        {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              width: "80%",
              textAlign: "left",
              marginBottom: scaleHeight(10),
              fontFamily: "lightItalic",
              fontSize: "10",
            }}
          >
            *{error}
          </Text>
        )}
        
        <Information_TextInput 
          IconComponent={Feather}
          iconName="user"
          iconSize={scaleWidth(28)}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />

        <Information_TextInput 
          IconComponent={MaterialCommunityIcons}
          iconName="phone"
          iconSize={scaleWidth(28)}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Số điện thoại"
          onChangeText={(text) => setSDT(text)}
        />

        <Information_TextInput 
          IconComponent={MaterialCommunityIcons}
          iconName="email-outline"
          iconSize={scaleWidth(28)}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
        />

        <Information_TextInput 
          IconComponent={Feather}
          iconName="lock"
          iconSize={scaleWidth(28)}
          error={error} 
          borderColor={error ? "red" : "#ccc"}
          placeholder="Mật khẩu"
          Password={true}
          onChangeText={(text) => setPassword(text)}
        />
        
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
          <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
            <Text style={styles.loginSmallText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            flexDirection: "row",
            marginVertical: scaleHeight(25)
          }}
        >
          <View style={styles.greyline} />
          <Text style={styles.or}>Hoặc</Text>
          <View style={styles.greyline} />
        </View>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <GoogleBrandIcon size={scaleWidth(28)}/>
          <Text style={styles.ggfbtext}>Tiếp tục với Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggfbcontainer}>
          <FacebookBrandIcon size={scaleWidth(28)}/>
          <Text style={styles.ggfbtext}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default RegisterPage;
