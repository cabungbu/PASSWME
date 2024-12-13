import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CheckBox, Icon } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const ShopName = ({ item }) => {
  return (
    <TouchableOpacity style={styles.shopNameContainer}>
      <CheckBox containerStyle={{ marginRight: 10, padding: 0 }} />
      <Ionicons name="storefront-outline" size={20} color="#707070" />
      <Text style={styles.shopNameText}>{item.user}</Text>
      <MaterialIcons name="navigate-next" size={20} color="#ccc" />
    </TouchableOpacity>
  );
};
export default ShopName;
