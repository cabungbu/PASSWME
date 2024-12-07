import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { COLOR } from "../assets/constant/color";

const ShoppingCartIcon = ({ cartColor, size }) => {
  if (cartColor === undefined) {
    cartColor = "white";
  }
  if (size === undefined) {
    size = 24;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <Feather name="shopping-cart" size={size} color={cartColor} />
      <View style={styles.numberOfNoti}>
        <Text style={{ fontFamily: "medium", fontSize: 10, color: "white" }}>
          5
        </Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  numberOfNoti: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: COLOR.mainColor,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center",
    marginLeft: -7,
    marginTop: -7,
  },
});

export default ShoppingCartIcon;
