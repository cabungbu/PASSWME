import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  StatusBar,
  View,
  Text,
  Modal,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//icons
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import DeliveryIcon from "../../assets/icons/DeliveryIcon";
import ShoppingBagPlusIcon from "../../assets/icons/ShoppingBagPlusIcon";
import ComplainIcon from "../../assets/icons/ComplainIcon";
import ClockIcon from "../../assets/icons/ClockIcon";
import PWMCoinIcon from "../../assets/icons/PWMCoinIcon";
import SupportPersonIcon from "../../assets/icons/SupportPersonIcon";

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
import { storage } from "../../firebase_config";
import { updateAvatar } from "../../redux/authSlice";
import { changeAvatar } from "../../redux/authService";
import { BE_ENDPOINT } from "../../settings/localVars";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const refreshTokenRedux = useSelector((state) => state.auth.refreshToken);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");

  const handleLogout = () => {
    // const id = { id: user.id };
    navigation.navigate("Welcome");
    // logoutUserService(id, dispatch, navigation);
  };
  const sendReport = async () => {
    const res = await fetch(BE_ENDPOINT + "/user/sendReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        name: user.username,
        content: content,
      }),
    });

    const data = await res.json();
    alert(data.message);
    setModalVisible(false);
    setContent("");
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [5, 5],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri);

        const filename = `avatar_${user.id}_${Date.now()}.jpg`;
        const storageRef = ref(storage, `avatars/${filename}`);

        const response = await fetch(imageUri);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);

        const avatarData = {
          avatar: await getDownloadURL(storageRef),
        };

        await changeAvatar(
          avatarData,
          dispatch,
          user,
          refreshTokenRedux,
          accessToken
        );
      }
    } catch (error) {
      console.error("Error picking/uploading image:", error);
      Alert.alert("Lỗi", "Không thể tải ảnh lên. Vui lòng thử lại.");
    }
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SettingScreen");
              }}
            >
              <Ionicons
                name="settings-outline"
                size={24}
                color="white"
                style={{ marginRight: scaleWidth(15) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CartScreen");
              }}
            >
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
                onPress={pickImage}
              />
            </View>
            <View style={{ marginLeft: scaleWidth(20) }}>
              {user ? (
                <Text style={styles.headerText}>{user.username}</Text>
              ) : (
                <Text></Text>
              )}
              <Text style={styles.followsText}>
                {user?.followers?.length} Người theo dõi {"     "}
                <Text>{user?.following?.length} Người theo dõi</Text>
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.order}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.subtitleText}>Đơn mua</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
          >
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderStatusScreen");
            }}
            style={styles.iconTextPair}
          >
            <MaterialCommunityIcons name="cart-check" size={30} color="black" />
            <Text style={styles.orderText}>Chờ xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderStatusScreen", { tab: 1 });
            }}
            style={styles.iconTextPair}
          >
            <DeliveryTruckClockIcon size={30} color="black" />
            <Text style={styles.orderText}>Chờ giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderStatusScreen", { tab: 2 });
            }}
            style={styles.iconTextPair}
          >
            <DeliveryIcon size={30} color="black" />
            <Text style={styles.orderText}>Chờ nhận hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyRatingsScreen");
            }}
            style={styles.iconTextPair}
          >
            <ListStarLightIcon size={30} color="black" />
            <Text style={styles.orderText}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.otherUtilitiesContainer}>
        <Text style={styles.subtitleText}>Các tiện ích khác</Text>
        <View style={styles.utilityItem}>
          {/* <UtilityIconTextPair
            width={"49%"}
            height={scaleHeight(70)}
            title="PWM Xu"
            IconComponent={PWMCoinIcon}
            iconSize={25}
          /> */}
          <TouchableOpacity
            style={{ width: "49%" }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <UtilityIconTextPair
              width={"100%"}
              height={scaleHeight(70)}
              title="Khiếu nại"
              IconComponent={ComplainIcon}
              iconSize={30}
            />
          </TouchableOpacity>

          {/* <UtilityIconTextPair
            width={"49%"}
            height={scaleHeight(70)}
            title="Mua lại"
            IconComponent={ShoppingBagPlusIcon}
            iconSize={30}
          /> */}
          <TouchableOpacity
            style={{ width: "49%" }}
            onPress={() => {
              navigation.navigate("RecentlyViewed");
            }}
          >
            <UtilityIconTextPair
              width={"100%"}
              height={scaleHeight(70)}
              title="Đã xem gần đây"
              IconComponent={ClockIcon}
              iconSize={25}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Gửi khiếu nại cho Passwme</Text>
            <TextInput
              style={styles.inputne}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.closeButton2}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => sendReport()}
              >
                <Text style={styles.closeButtonText}> Gửi khiếu nại</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.otherUtilitiesContainer}>
        <Text style={styles.subtitleText}>Hỗ trợ</Text>
        <TouchableOpacity
          style={[styles.supportIconTextPair, { borderBottomWidth: 1 }]}
          onPress={() => navigation.navigate("TermAndConditionScreen")}
        >
          <Feather name="help-circle" size={24} color="black" />
          <Text style={styles.supportText}>Điều khoản, điều kiện</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={18}
            color="#a0a0a0"
            style={{}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportIconTextPair}>
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
      <View
        style={{
          marginTop: scaleHeight(10),
          alignItems: "center",
          padding: scaleHeight(20),
          backgroundColor: "white",
        }}
      >
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
