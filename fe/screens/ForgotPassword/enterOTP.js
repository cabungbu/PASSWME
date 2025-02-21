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
export default function EnterOTP({ data }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    // const response = await fetch(BE_ENDPOINT + `/user/ForgotPassword`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email: email }), // Gửi email trong body request
    // });
    // if (response.ok) {
    //   setError("Tài khoản không tồn tại.");
    //   return;
    // }
  };

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Text>data.message</Text>
    </View>
  );
}
