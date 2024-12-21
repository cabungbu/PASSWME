import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "./style";
import { COLOR } from "../../../assets/constant/color";
import { useNavigation } from "@react-navigation/native";

export default function BottomTabSection({ onAddPress, onBuyNow }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.chatAndAddContainer}>
        <TouchableOpacity style={styles.chatContainer}>
          <MaterialCommunityIcons
            name="chat-processing-outline"
            size={26}
            color={COLOR.mainColor}
          />
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity style={styles.chatContainer} onPress={onAddPress}>
          <MaterialIcons
            name="add-shopping-cart"
            size={26}
            color={COLOR.mainColor}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buyNowContainer} onPress={onBuyNow}>
        <Text style={styles.buyNowText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
}
