import React, { useMemo, useRef, useState } from "react";
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

export default function BottomTabSection() {
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

        <TouchableOpacity style={styles.chatContainer}>
          <MaterialIcons
            name="add-shopping-cart"
            size={26}
            color={COLOR.mainColor}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buyNowContainer}>
        <Text style={styles.buyNowText}>Mua ngay</Text>
      </TouchableOpacity>
    </View>
  );
}
