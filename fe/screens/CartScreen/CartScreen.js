import React, { useEffect, useState, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  checkIfShopcartUpdate,
  getUserShopcart,
} from "../../redux/shopCartService";
import RenderContent from "./renderContent/RenderContent";
import FooterBuy from "./Footer/FooterBuy";
import FooterDelete from "./Footer/FooterDelete";
import { useNavigation } from "@react-navigation/native";
import { isEqual } from "lodash";
import styles from "./style";

const CartScreen = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSua, setIsSua] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  const shopCart = useSelector(
    (state) => state.shopCartContainer?.shopCart,
    (prevShopCart, nextShopCart) => isEqual(prevShopCart, nextShopCart)
  );

  useEffect(() => {
    const checkShopCartStatus = async () => {
      setIsLoading(true);
      console.log("Starting to check shop cart status...");

      try {
        await getUserShopcart(user.id, dispatch);
        // await checkIfShopcartUpdate(shopCart, user?.id, dispatch);
        console.log("Shop cart updated successfully.");
      } catch (error) {
        console.error("Error loading shop cart data:", error);
      } finally {
        console.log("Check complete.");
        setIsLoading(false);
      }
    };

    if (user?.id) {
      checkShopCartStatus();
    }
  }, [user?.id, shopCart]); // Only run again if these change

  console.log("hehe");
  const Render = useCallback(() => {
    return isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <RenderContent shopCart={shopCart} />
    );
  }, [isLoading, shopCart]);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={true}
      />
      <View
        style={
          Platform.OS === "android" ? styles.headerAndroid : styles.headerIOS
        }
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={Platform.OS === "android" ? "white" : "#E30414"}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={
            Platform.OS === "android" ? styles.headerText : styles.headerTextIOS
          }
        >
          Giỏ hàng
        </Text>
        <TouchableOpacity onPress={() => setIsSua(!isSua)}>
          <Text style={styles.sua}>{isSua ? "Xong" : "Sửa"}</Text>
        </TouchableOpacity>
      </View>

      <Render />
      {isSua ? <FooterDelete /> : <FooterBuy />}
    </View>
  );
});

export default CartScreen;
