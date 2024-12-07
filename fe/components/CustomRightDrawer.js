import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function CustomRightDrawer() {
  return (
    <View style={styles.container}>
      {/* Nội dung drawer của bạn */}
      <TouchableOpacity>
        <Text>Đóng Drawer</Text>
      </TouchableOpacity>
      {/* Các mục menu khác */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
  },
});
