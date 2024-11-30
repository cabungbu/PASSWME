import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { logoutUser as logoutUserService } from "../../redux/authService"; 

//icons
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DeliveryIcon from "../../assets/icons/DeliveryIcon";
import ShoppingBagPlusIcon from "../../assets/icons/ShoppingBagPlusIcon";
import ComplainIcon from "../../assets/icons/ComplainIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import PWMCoinIcon from "../../assets/icons/PWMCoinIcon"
import SupportPersonIcon from "../../assets/icons/SupportPersonIcon"

//custom
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";
import CustomButton from "../../components/customButton";
import UtilityIconTextPair from "../../components/utilityIconTextPair";

//style
import styles from "./style";
import DeliveryTruckClockIcon from "../../assets/icons/DeliveryTruckClockIcon";
import ListStarLightIcon from "../../assets/icons/ListStarLightIcon";
import ShoppingCartIcon from "../../components/shoppingCartIcon";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const id = { id: user.id };
    navigation.navigate("Welcome");
    logoutUserService(id, dispatch, navigation);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={COLOR.gradientColor}
        start={[0, 0]}
        end={[1, 1]}
        location={[0.96, 0.99, 1]}
        style={{
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
          overflow: "hidden",
        }}
      >

        <View style={styles.header}>
          <View style={styles.buttonContainer} >
            <TouchableOpacity onPress={() => {navigation.navigate("SettingScreen")}}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="white"
                style={{ marginRight: scaleWidth(15) }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate("CartScreen")}}>
              <ShoppingCartIcon cartColor="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignContent: "flex-end" }}>
            <View style={{ flexDirection: "row", position: "relative" }}>
              {user ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{
                    width: scaleHeight(70),
                    height: scaleHeight(70),
                    borderRadius: 100,
                    resizeMode: "contain",
                  }}
                />
              ) : (
                <ActivityIndicator />
              )}
              <MaterialIcons
                name="edit"
                size={18}
                color="black"
                style={{
                  position: "absolute",
                  backgroundColor: COLOR.disableWhiteColor,
                  borderRadius: 100,
                  padding: 2,
                  bottom: -5,
                  right: -5,
                }}
              />
            </View>
            <View style={{ marginLeft: scaleWidth(20) }}>
              {user ? (
                <Text style={styles.headerText}>{user.username}</Text>
              ) : (
                <Text></Text>
              )}
              <Text>Information</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.order}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.subtitleText}>Đơn mua</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text color="#a0a0a0" fontFamily="regular">
              Xem lịch sử mua hàng
            </Text>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color="#a0a0a0"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.iconTextPair}>
            <MaterialCommunityIcons name="cart-check" size={30} color="black" />
            <Text style={styles.orderText}>Chờ xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTextPair}>
            <DeliveryTruckClockIcon size={30} color="black"/>
            <Text style={styles.orderText}>Chờ giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconTextPair}>
            <DeliveryIcon size={30} color="black" />
            <Text style={styles.orderText}>Chờ lấy hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("MyRatingsScreen")}}
                            style={styles.iconTextPair}>
            <ListStarLightIcon size={30} color="black" />
            <Text style={styles.orderText}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.otherUtilitiesContainer}>
        <Text style={styles.subtitleText}>Các tiện ích khác</Text>
        <View style={styles.utilityItem}>
          <UtilityIconTextPair 
            width={'49%'}
            height={scaleHeight(80)}
            title="PWM Xu"
            IconComponent={PWMCoinIcon}
            iconSize={25}
          />
          <UtilityIconTextPair 
            width={'49%'}
            height={scaleHeight(80)}
            title="Khiếu nại"
            IconComponent={ComplainIcon}
            iconSize={30}
          />
          <UtilityIconTextPair 
            width={'49%'}
            height={scaleHeight(80)}
            title="Mua lại"
            IconComponent={ShoppingBagPlusIcon}
            iconSize={30}
          />
          <UtilityIconTextPair 
            width={'49%'}
            height={scaleHeight(80)}
            title="Đã xem gần đây"
            IconComponent={ClockIcon}
            iconSize={25}
          />
        </View>
      </View>
      <View style={styles.otherUtilitiesContainer}>
        <Text style={styles.subtitleText}>Hỗ trợ</Text>
        <TouchableOpacity style={[styles.supportIconTextPair, {borderBottomWidth: 1,}]}>
          <Feather name="help-circle" size={24} color="black" />
          <Text style={styles.supportText}>Điều khoản, điều kiện</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color="#a0a0a0"
            style={{}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportIconTextPair} >
          <SupportPersonIcon size={24} color="black" />
          <Text style={styles.supportText}>Trung tâm trợ giúp</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color="#a0a0a0"
            style={{}}
          />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: scaleHeight(10), alignItems:"center", padding:scaleHeight(20), backgroundColor: "white"}}>
        <CustomButton
          width={"100%"}
          height={50}
          borderRadius={10}
          backgroundColor="white"
          color="#E30414"
          borderColor="#E30414"
          borderWidth={1.8}
          title="Đăng xuất"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}
