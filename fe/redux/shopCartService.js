import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BE_ENDPOINT } from "../settings/localVars";
import {
  getShopCartStart,
  getShopCartFailure,
  getShopCartSuccess,
  setShopCart,
} from "./shopCartSlice";
export const getUserShopcart = async (userId, dispatch) => {
  try {
    console.log(userId);
    dispatch(getShopCartStart());
    const res = await axios.get(
      BE_ENDPOINT + `/user/getUserShopCart/${userId}`
    );
    const shopCartData = res.data;
    console.log(shopCartData);
    dispatch(getShopCartSuccess(shopCartData));
    await AsyncStorage.setItem("shopCart", JSON.stringify(shopCartData));
  } catch (error) {
    console.error(error);
    dispatch(getShopCartFailure(error));
  }
};
