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
import { useNavigation } from "@react-navigation/native";

import styles from "./style";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";

import Ionicons from "@expo/vector-icons/Ionicons";

import mainStyles from "../../styles/mainStyles";
import CountdownTimer from "../../components/countDownPayment";
import axios from "axios";
import { BE_ENDPOINT } from "../../settings/localVars";
import PaymentCheckScreen from "./CheckPaymentStatus";

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { postId } = route.params;
  const orderId = "MOMO" + new Date().getTime();
  useEffect(() => {
    const createPayment = async () => {
      console.log(postId);
      const res = await axios.post(BE_ENDPOINT + "/payment/momo/add");
      const paymentUrl = res.data.payUrl;
      if (paymentUrl) {
        await Linking.openURL(paymentUrl);
      }
      navigation.navigate("PaymentCheckScreen", {
        orderId: res.data.orderId,
        postId: postId,
      });
    };
    createPayment();
  }, []);

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
              Đăng ký
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
            <Text style={styles.headerText}>Đẩy tin gợi ý</Text>
          </View>
        </>
      )}

      <View style={styles.part1}>
        <Text style={styles.boldText}>Thông tin dịch vụ</Text>
        <View style={styles.onerow}>
          <Text style={styles.lightText}>Nhà cung cấp</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.lightText}>Momo payment</Text>
            <Image
              source={require("./../../assets/logoMomo.jpg")}
              style={{
                width: 30,
                height: 30,
                resizeMode: "cover",
                marginLeft: 10,
              }}
            />
          </View>
        </View>
        <View style={styles.onerow}>
          <Text style={styles.lightText}>Mã đơn hàng</Text>
          <Text style={styles.lightText}>Orrderid</Text>
        </View>
        <View style={styles.onerow}>
          <Text style={styles.lightText}>Mô tả</Text>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.lightText}>dịch vụ đẩy tin</Text>
            <Text style={styles.lightText}>gợi ý Passwme 48h</Text>
          </View>
        </View>
        <View style={styles.onerow}>
          <Text style={styles.lightText}>Số tiền</Text>
          <Text style={styles.price}>5.000 VND</Text>
        </View>
      </View>

      <View style={styles.part2}>
        <Text style={styles.time}>Đơn hàng sẽ hết hạn sau</Text>
        <CountdownTimer initialTime={1800} />
      </View>

      <TouchableOpacity style={styles.buttonCtn}>
        <Text style={styles.ToMomo}>ĐẾN MOMO ĐỂ THANH TOÁN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;
