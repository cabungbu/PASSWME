import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { COLOR } from "../assets/constant/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserShopcart } from "../redux/shopCartService";
import { useDispatch, useSelector } from "react-redux";
import { setShopCart } from "../redux/shopCartSlice";
import { checkIfShopcartUpdate } from "../redux/shopCartService";
const ShoppingCartIcon = ({ cartColor, size }) => {
  if (cartColor === undefined) {
    cartColor = "white";
  }
  if (size === undefined) {
    size = 24;
  }
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user);
  const shopCart = useSelector((state) => state.shopCartContainer?.shopCart);
  const handleCartScreen = async () => {
    navigation.navigate("CartScreen");
    await checkIfShopcartUpdate(shopCart, user.id, dispatch);
  };
  return (
    <TouchableOpacity
      style={{ flexDirection: "row" }}
      onPress={() => handleCartScreen()}
    >
      <Feather name="shopping-cart" size={size} color={cartColor} />
      <View style={styles.numberOfNoti}>
        <Text style={{ fontFamily: "medium", fontSize: 10, color: "white" }}>
          5
        </Text>
      </View>
    </TouchableOpacity>
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
