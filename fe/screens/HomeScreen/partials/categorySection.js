import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, Text, TextInput } from "react-native";
import styles from "./style";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function categorySection() {
  return (
    <>
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.coinContainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Feather name="dollar-sign" size={24} color="#F24E1E" />
            <Text style={styles.coin}>500</Text>
          </View>
          <Text>Nhấn để nhận xu mỗi ngày</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
