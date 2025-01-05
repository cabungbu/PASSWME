import { View, Text, Modal, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "./style";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "./Footer";
import Address from "./Address";
import OrderDataNoShopCart from "./OrderDataNoShopCart";
import { BE_ENDPOINT } from "../../settings/localVars";
import { getUserShopcart } from "../../redux/shopCartService";
import { useDispatch, useSelector } from "react-redux";
import { deleteCheckedItemFunction } from "../../redux/checkShopCart";
import { setCoin } from "../../redux/authSlice";
import { StatusBar } from "react-native";
import { scaleWidth } from "../../assets/constant/responsive";
import mainStyles from "../../styles/mainStyles";
export default function CheckOut2({ route }) {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [loading, setLoading] = useState(false); // To show loading indicator
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(null);
  const user = useSelector((state) => state.auth?.user);
  const [orderData, setOrderData] = useState(null);

  const orderDataRef = useRef(null); // Create a ref to access OrderData
  const dispatch = useDispatch();
  const handleDataFromOrderData = async (data) => {
    setLoading(true); // Show loading indicator when the data is being sent
    setError(null); // Clear any previous error

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
        navigation.navigate("OrderSuccess");
        dispatch(setCoin(user.coin - data.coin));
        // deleteCheckedItemFunction(data.buyerId, dispatch);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Đã xảy ra lỗi khi thêm đơn hàng.");
      }
    } catch (error) {
      setError("Lỗi khi thêm đơn hàng: " + error.message);
    } finally {
      setLoading(false); // Hide loading indicator after the request is finished
    }
  };

  useEffect(() => {
    if (route.params?.newUser) {
      const updatedUser = route.params.newUser;
      setNewUser(updatedUser); // Cập nhật dữ liệu mới vào state newUser
    }
    if (route.params?.post) {
      const updatedPost = route.params.post;
      setPostData(updatedPost); // Cập nhật dữ liệu mới vào state postData
    }
  }, [route.params?.newUser]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={mainStyles.headerContainer}>
        <StatusBar
          translucent={true}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Ionicons
          name="chevron-back"
          size={scaleWidth(30)}
          color={"#E30414"}
          onPress={handleGoBack}
          style={mainStyles.headerIcon}
        />
        <Text style={[mainStyles.headerCenterText, { color: "black" }]}>
          Tổng quan đơn hàng
        </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Address newUser={newUser} isOne={true} />
        <OrderDataNoShopCart post={orderData} ref={orderDataRef} />
      </ScrollView>
      <Footer
        onSendData={() =>
          handleDataFromOrderData(orderDataRef.current.getOrderData())
        }
      />

      <Modal
        visible={loading}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLoading(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#A0A0A0" />
            <Text style={styles.modalText}>Đang xử lý...</Text>
          </View>
        </View>
      </Modal>

      {error && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setError(null)}
        >
          <View style={styles.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{error}</Text>
              <Text onPress={() => setError(null)} style={styles.Dong}>
                Đóng
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}
