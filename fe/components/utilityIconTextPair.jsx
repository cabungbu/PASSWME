import React from "react";
import { onPress, StyleSheet, Text, TouchableOpacity } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { scaleWidth } from "../assets/constant/responsive";

const UtilityIconTextPair = ({
  width = "100%",
  height = 50,
  marginVertical = 5,
  title = "Button",
  iconSize = 30,
  IconComponent,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.utilityIconTextPair,
        {
          width,
          height,
          marginVertical,
        },
      ]}
      onPress={onPress}
    >
      {IconComponent && <IconComponent size={iconSize} />}
      <Text style={[styles.buttonText]}>{title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color="#a0a0a0"
        style={{}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  utilityIconTextPair: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a0a0a0",
    borderRadius: 5,
    paddingHorizontal: scaleWidth(10),
  },
  buttonText: {
    color: "black",
    fontSize: scaleWidth(13),
    fontFamily: "medium",
    flex: 1,
    marginLeft: scaleWidth(10),
  },
});

export default UtilityIconTextPair;
