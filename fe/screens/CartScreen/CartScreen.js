import React, { useEffect, useState, useMemo } from "react";
import {
  TouchableOpacity,
  View,
  Text,
// import '../../styles/mainStyles'
// import styles from '../../styles/mainStyles';
// import './CartScreen'

StatusBar,
Platform,
} from "react-native";
import { COLOR } from '../../assets/constant/color';
import { scaleWidth } from '../../assets/constant/responsive';
import styles from "./style";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserShopcart } from "../../redux/shopCartService";
import { setShopCart } from "../../redux/shopCartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderContent from "./renderContent/RenderContent";
import FooterBuy from "./Footer/FooterBuy";
import FooterDelete from "./Footer/FooterDelete";


export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSua, setIsSua] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  // Use useMemo to memoize the shopCart selector
  const shopCart = useSelector(
    (state) => state.shopCartContainer?.shopCart,
    (prev, next) => {
      // Custom comparison to prevent unnecessary re-renders
      return JSON.stringify(prev) === JSON.stringify(next);
    }
  );

  // Memoize the effect to run only when necessary
  useEffect(() => {
    const checkShopCartStatus = async () => {
      try {
        const storedShopCart = await AsyncStorage.getItem("shopCart");
        if (storedShopCart) {
          const parsedShopCart = JSON.parse(storedShopCart);
          // Only dispatch if the stored cart is different from current cart
          if (JSON.stringify(parsedShopCart) !== JSON.stringify(shopCart)) {
            dispatch(setShopCart(parsedShopCart));
          }
        } else if (user?.id) {
          await getUserShopcart(user.id, dispatch);
        }
      } catch (error) {
        console.error("Error loading shop cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkShopCartStatus();
  }, [user?.id, dispatch, shopCart]);
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === "android" ? (
        <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
            translucent={true}
          />
          <View style={styles.headerAndroid}>
            <Ionicons
              name="chevron-back"
              size={24}
              color="white"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerText}>Giỏ hàng</Text>
            <TouchableOpacity onPress={() => setIsSua(!isSua)}>
              {isSua ? (
                <Text style={styles.sua}>Xong</Text>
              ) : (
                <Text style={styles.sua}>Sửa</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
            translucent={true}
          />
          <View style={styles.headerIOS}>
            <Ionicons
              style={styles.iconHeaderIOS}
              name="chevron-back"
              size={24}
              color="#E30414"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.headerTextIOS}>Giỏ hàng</Text>
            <TouchableOpacity onPress={() => setIsSua(!isSua)}>
              {isSua ? (
                <Text style={styles.sua}>Xong</Text>
              ) : (
                <Text style={styles.sua}>Sửa</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}

      <RenderContent shopCart={shopCart} navigation={navigation} />
      {isSua ? <FooterDelete></FooterDelete> : <FooterBuy></FooterBuy>}
    </View>
  );
}
