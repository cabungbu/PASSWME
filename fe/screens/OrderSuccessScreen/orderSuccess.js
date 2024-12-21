import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { scaleWidth } from "../../assets/constant/responsive";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import { COLOR } from "../../assets/constant/color";

export default function OrderSuccess() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Ionicons
          name="chevron-back"
          size={24}
          color={"#E30414"}
          style={{ marginLeft: scaleWidth(15) }}
        />
        <ScrollView>
          <View style={styles.container}>
            <Ionicons name="checkmark-circle" size={60} color="#3CDA86" />
            <Text style={styles.tks}>Cảm ơn bạn đã đặt hàng!</Text>
            <Text style={styles.Gui}>
              Đơn hàng đã được gửi đến cho người bán.
            </Text>
            <Text style={styles.Gui}>
              Bạn sẽ nhận được thông tin cập nhật trong Đơn mua.
            </Text>
          </View>

          <View style={styles.namngang}>
            <TouchableOpacity style={styles.buttonContainer}>
              <Entypo name="home" size={24} color={COLOR.mainColor} />
              <Text style={styles.TextBtn}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Ionicons name="bag-handle" size={24} color={COLOR.mainColor} />
              <Text style={styles.TextBtn}>Đơn mua</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleWidth(50),
    paddingHorizontal: scaleWidth(30),
  },
  tks: {
    fontSize: 14,
    fontFamily: "bold",
    marginVertical: scaleWidth(30),
  },
  Gui: {
    fontSize: 14,
    fontFamily: "medium",
    marginBottom: scaleWidth(2),
    textAlign: "center",
  },
  namngang: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleWidth(10),
    paddingHorizontal: scaleWidth(30),
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(30),
    alignItems: "center",
    borderColor: COLOR.mainColor,
    borderWidth: 1,
    borderRadius: scaleWidth(20),
    paddingVertical: scaleWidth(10),
    marginTop: scaleWidth(20),
  },
  TextBtn: {
    fontSize: 14,
    fontFamily: "semiBold",
    marginLeft: scaleWidth(5),
    textAlign: "center",
  },
});
