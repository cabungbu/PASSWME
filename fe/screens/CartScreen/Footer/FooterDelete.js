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
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

const FooterDelete = React.memo(({ isCheck }) => {
  return (
    <View style={styles.footerDeleteContainer}>
      <View style={[styles.footerContainer, { alignItems: "center" }]}>
        <CheckBox containerStyle={{ marginRight: 10, padding: 0 }} />
        <Text style={styles.allText}>Chọn tất cả</Text>
      </View>
      <TouchableOpacity style={styles.buttonDelete}>
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
});

export default FooterDelete;
