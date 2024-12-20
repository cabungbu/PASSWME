import { View, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "./Footer";
import Address from "./Address";
import OrderData from "./OrderData";
import { BE_ENDPOINT } from "../../settings/localVars";
export default function CheckOut({ route }) {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [newUser, setNewUser] = useState(null);
  const [orderData, setOrderData] = useState(null); // Store data sent from OrderData.js

  const orderDataRef = useRef(null); // Create a ref to access OrderData

  const handleDataFromOrderData = async (data) => {
    setOrderData(data);
    try {
      const res = await fetch(`${BE_ENDPOINT}/order/addOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        console.log("Thêm đơn hàng thành công trên server.");
        // navigation.navigate("OrderSuccess"); // Chuyển đến màn hình thành công
      }
    } catch (error) {
      console.error("Lỗi khi thêm đơn hàng: " + error.message);
    }
  };

  useEffect(() => {
    // Kiểm tra nếu có dữ liệu mới từ màn hình 2
    if (route.params?.newUser) {
      console.log("jhehe");
      const updatedUser = route.params.newUser;
      setNewUser(updatedUser); // Cập nhật dữ liệu mới vào state newUser
    }
  }, [route.params?.newUser]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={"#E30414"}
          onPress={handleGoBack}
        />
        <Text>Tổng quan đơn hàng</Text>
        <Ionicons
          name="chevron-back"
          size={24}
          color={"white"}
          onPress={handleGoBack}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Address newUser={newUser} />
        <OrderData ref={orderDataRef} />
      </ScrollView>
      <Footer
        onSendData={() =>
          handleDataFromOrderData(orderDataRef.current.getOrderData())
        }
      />
    </SafeAreaView>
  );
}
