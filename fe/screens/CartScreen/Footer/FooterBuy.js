import React, { useState, useMemo } from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import { CheckBox } from "react-native-elements";
import { scaleHeight, scaleWidth } from "../../../assets/constant/responsive";
const FooterBuy = React.memo(({ isCheck }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.allContainer}>
        <Text style={styles.allText}>Chọn tất cả</Text>
        <CheckBox containerStyle={{ marginRight: 10, padding: 0 }} />
      </View>
      <View
        style={{
          height: "80%",
          width: scaleWidth(2),
        }}
      />
      <View style={styles.payContainer}>
        <Text style={styles.payText} numberOfLines={1}>
          Tổng thanh toán:
        </Text>
        <Text style={styles.payMoney}>money</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buyNowText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
});

export default FooterBuy;
