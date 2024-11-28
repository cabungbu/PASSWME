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
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR } from "../../../assets/constant/color";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function BottomTabSection() {
  return (
    <View style={{ width: "100%", position: "relative", bottom: 0 }}>
      <Text>Mua ngay</Text>
    </View>
  );
}
