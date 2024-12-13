import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";

const QuantitySlider = ({ post }) => {
  return (
    <View style={styles.updateQuantity}>
      <TouchableOpacity style={styles.plus}>
        <Text style={styles.text}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{post.product.quantityInShopcart}</Text>
      <TouchableOpacity style={styles.plus}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
export default QuantitySlider;
