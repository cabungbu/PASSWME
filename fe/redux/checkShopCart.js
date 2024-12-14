import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BE_ENDPOINT } from "../settings/localVars";
import {
  getShopCartStart,
  getShopCartFailure,
  getShopCartSuccess,
  setShopCart,
  updateShopCart,
  setShopCartAllTrue,
  setShopCartAllFalse,
} from "./shopCartSlice";
import { getUserShopcart, checkIfShopcartUpdate } from "./shopCartService";

export const clickCheckProduct = async (
  shopcart,
  userId,
  product,
  dispatch
) => {
  try {
    dispatch(getShopCartStart());
    const res = await axios.put(
      `${BE_ENDPOINT}/user/checkboxProduct/${userId}`,
      {
        sellerId: product.sellerId,
        postId: product.postId,
        productId: product.productId,
        currentPrice: product.currentPrice,
        quantity: product.quantity,
      }
    );
    if (res.status === 200) {
      console.log(JSON.stringify(res.data));
      checkIfShopcartUpdate(shopcart, userId, dispatch);
    }
  } catch (error) {
    console.error("Loi ở clickCheckProduct: " + error);
    dispatch(getShopCartFailure(error.message));
  }
};

export const UnClickCheckProduct = async (
  shopcart,
  userId,
  product,
  dispatch
) => {
  try {
    dispatch(getShopCartStart());
    const res = await axios.put(
      `${BE_ENDPOINT}/user/setProductNotCheck/${userId}`,
      {
        sellerId: product.sellerId,
        productId: product.productId,
      }
    );
    if (res.status === 200) {
      checkIfShopcartUpdate(shopcart, userId, dispatch);
    }
  } catch (error) {
    console.error("Loi ở UnClickCheckProduct: " + error);
    dispatch(getShopCartFailure(error.message));
  }
};

export const checkAllBoxTrue = async (shopcart, userId, dispatch) => {
  try {
    dispatch(setShopCartAllTrue());
    console.log("CheckAllBoxTrue");
    const res = await axios.patch(
      `${BE_ENDPOINT}/user/checkAllBoxTrue/${userId}`
    );
    if (res.status === 200) {
      checkIfShopcartUpdate(shopcart, userId, dispatch);
    }
  } catch (error) {}
};

export const checkAllBoxFalse = async (shopcart, userId, dispatch) => {
  try {
    dispatch(setShopCartAllFalse());
    console.log("CheckAllBoxFalse");
    const res = await axios.patch(
      `${BE_ENDPOINT}/user/checkAllBoxFalse/${userId}`
    );
    if (res.status === 200) {
      checkIfShopcartUpdate(shopcart, userId, dispatch);
    }
  } catch (error) {}
};
