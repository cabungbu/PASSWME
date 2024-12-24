import { View, Text } from "react-native";
import { Platform, StatusBar, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import Information_TextInput from "../../components/Information_TextInput";
import mainStyles from "../../styles/mainStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BE_ENDPOINT } from "../../settings/localVars";
import EnterOTP from "./enterOTP";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSendOTP = async () => {
    try {
      console.log(email);
      // Kiểm tra email có đúng đ��nh dạng hay không
      const response = await fetch(BE_ENDPOINT + `/auth/ForgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), // Gửi email trong body request
      });

      if (response.ok) {
        console.log("Gửi OTP thành công.");
        setLoading(true);
        setError(null);
        setData(JSON.stringify(response));
        return;
      } else {
        const errorData = await response.json();
        console.log("Lỗi từ API:", errorData.message);
        setError(errorData.message || "Đã xảy ra lỗi khi gửi email.");
      }
    } catch (error) {
      console.log(JSON.stringify(error.response?.data.message));
    }
  };

  const navigation = useNavigation();
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
                navigation.navigate("Welcome");
              }}
            />
            <Text
              style={[
                mainStyles.headerCenterText,
                { marginRight: scaleWidth(30) },
              ]}
            >
              Đăng nhập
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
              navigation.navigate("Welcome");
            }}
          />
          <Text style={styles.headerText}>Đăng nhập</Text>
        </View>
      )}

      <View style={styles.container}>
        {loading ? (
          <Text style={styles.please}>
            Vui lòng nhập mã OTP đã được gửi đến email của bạn
          </Text>
        ) : (
          <Text style={styles.please}>
            Vui lòng nhập email bạn muốn xác thực
          </Text>
        )}

        {loading ? (
          <EnterOTP data={data} />
        ) : (
          <View style={{ display: "flex", alignItems: "center" }}>
            {error ? <Text style={styles.error}>* {error}</Text> : null}
            <Information_TextInput
              IconComponent={MaterialCommunityIcons}
              iconName="email-outline"
              iconSize={24}
              error={error}
              borderColor={error ? "red" : "#ccc"}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity
              style={styles.login}
              onPress={() => handleSendOTP()}
            >
              <Text style={styles.logintext}>Gửi mã OTP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
