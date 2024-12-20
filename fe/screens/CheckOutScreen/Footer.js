import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";

const Footer = ({ onSendData }) => {
  const handleOrder = () => {
    // Tạo dữ liệu orderData ở đây (ví dụ)
    const orderData = {
      buyerId: "123",
      totalPrice: 500,
    };

    onPlaceOrder(orderData); // Gọi hàm truyền từ cha
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý tuân theo điều khoản
        Passwme.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => onSendData()}>
        <Text style={styles.textButton}>Đặt hàng</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Footer;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(15),
    alignItems: "center",
  },
  button: {
    backgroundColor: COLOR.mainColor,
    paddingVertical: scaleWidth(15),
    paddingHorizontal: scaleWidth(15),
    borderRadius: scaleWidth(15),
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: scaleWidth(15),
    fontFamily: "semiBold",
  },
  text: {
    fontSize: scaleWidth(13),
    color: "#A0A0A0",
    flex: 1,
    fontFamily: "regular",
  },
});
