import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  Image,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import styles from "./style";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";

import Ionicons from "@expo/vector-icons/Ionicons";

import mainStyles from "../../styles/mainStyles";
import CountdownTimer from "../../components/countDownPayment";
import axios from "axios";
import { BE_ENDPOINT } from "../../settings/localVars";

const PaymentCheckScreen = ({ route }) => {
  const { orderId, postId } = route.params; // Truy cập orderId từ route.params
  const [status, setStatus] = useState("Đang thực hiện giao dịch");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchPaymentStatus();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchPaymentStatus = async () => {
    try {
      const res = await axios.post(BE_ENDPOINT + "/payment/momo/check-status", {
        orderId: orderId,
      });
      setStatus(res.data.message);
      if (res.data.resultCode === 0) {
        const newServicePost = await axios.post(
          BE_ENDPOINT + "/servicePost/add",
          {
            postId: postId,
          }
        );
        if (newServicePost.status === 201) {
          navigation.navigate("HomeScreen");
        } else {
          alert(newServicePost.data.error);
        }
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <View style={mainStyles.headerCenterContainer}>
            <Ionicons
              style={mainStyles.headerIcon}
              name="chevron-back"
              size={scaleWidth(28)}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={[
                mainStyles.headerCenterText,
                { marginRight: scaleWidth(30) },
              ]}
            >
              Kiểm tra giao dịch
            </Text>
          </View>
        </>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <View style={styles.headerIOS}>
            <Ionicons
              style={styles.iconHeaderIOS}
              name="chevron-back"
              size={scaleWidth(28)}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerText}>Kiểm tra giao dịch</Text>
          </View>
        </>
      )}

      <View style={styles.part2}>
        <Text>{status}</Text>
      </View>

      <TouchableOpacity style={styles.buttonCtn} onPress={fetchPaymentStatus}>
        <Text style={styles.ToMomo}>Kiểm tra giao dịch</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentCheckScreen;
