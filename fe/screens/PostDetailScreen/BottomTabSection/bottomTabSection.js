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
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from "./style";

export default function BottomTabSection() {
  return (
    <View style={{ width: "100%", position: "relative", bottom: 0 }}>
      <View style = {{flex: 1}}>
      <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
      <Text>|</Text>
      <MaterialIcons name="add-shopping-cart" size={24} color="black" />
      </View>
      <View style = {{flex: 1}}>
          Mua ngay
      </View>
    </View>
  );
}
