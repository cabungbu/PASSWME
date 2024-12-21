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
  deleteProductShopCart,
  deleteCheckedItem,
  increaseQuantity,
  decreaseQuantity,
  getSum,
  clickItem,
  unClickItem,
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
    dispatch(clickItem({ product }));
    dispatch(getSum());
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
      getUserShopcart(userId, dispatch);
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
    dispatch(unClickItem({ product }));
    dispatch(getSum());
    const res = await axios.put(
      `${BE_ENDPOINT}/user/setProductNotCheck/${userId}`,
      {
        sellerId: product.sellerId,
        productId: product.productId,
      }
    );
    if (res.status === 200) {
      getUserShopcart(userId, dispatch);
    }
  } catch (error) {
    console.error("Loi ở UnClickCheckProduct: " + error);
    dispatch(getShopCartFailure(error.message));
  }
};

export const checkAllBoxTrue = async (shopcart, userId, dispatch) => {
  try {
    dispatch(setShopCartAllTrue());
    dispatch(getSum());
    console.log("CheckAllBoxTrue");
    const res = await axios.patch(
      `${BE_ENDPOINT}/user/checkAllBoxTrue/${userId}`
    );
    if (res.status === 200) {
      getUserShopcart(userId, dispatch);
    }
  } catch (error) {}
};

export const checkAllBoxFalse = async (shopcart, userId, dispatch) => {
  try {
    dispatch(setShopCartAllFalse());
    dispatch(getSum());
    console.log("CheckAllBoxFalse");
    const res = await axios.patch(
      `${BE_ENDPOINT}/user/checkAllBoxFalse/${userId}`
    );
    if (res.status === 200) {
      getUserShopcart(userId, dispatch);
    }
  } catch (error) {}
};

export const deleteProduct = async (shopcart, userId, product, dispatch) => {
  try {
    console.log("deleteProduct");

    const requestData = {
      sellerId: product.sellerId,
      postId: product.postId,
      productId: product.productId,
    };

    // Send DELETE request using fetch
    const res = await fetch(
      `${BE_ENDPOINT}/user/removeProductFromCart/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    // Check if the response is successful
    if (res.ok) {
      dispatch(getSum());
      console.log("xoa thanh cong");
    }
  } catch (error) {
    console.error("Loi ở delete: " + err.response?.data);
    dispatch(getShopCartFailure(err.response?.data.message));
  }
};

export const deleteCheckedItemFunction = async (userId, dispatch) => {
  try {
    console.log("deleteCheckedItem");

    const res = await fetch(
      `${BE_ENDPOINT}/user/deleteCheckedItems/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);

    // Check if the response is successful
    if (res.status === 200) {
      dispatch(deleteCheckedItem());
      dispatch(getSum());
    }
  } catch (error) {
    console.error("Loi ở deleteCheckedItem: " + err.response?.data.message);
    dispatch(getShopCartFailure(err.response?.data.message));
  }
};

export const increaseQuantityFunction = async (userId, product, dispatch) => {
  try {
    console.log("increaseQuantity");
    dispatch(increaseQuantity({ product }));
    const res = await fetch(`${BE_ENDPOINT}/user/updateQuantity/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      console.log("Cập nhật số lượng thành công trên server.");
      dispatch(getSum());
      return null;
    } else {
      const errorData = await res.json();
      console.log(errorData.error);
      const errorMessage = errorData.error;
      dispatch(getShopCartFailure(errorData.error));
      dispatch(decreaseQuantity({ product }));
      return errorData;
    }
  } catch (err) {
    console.log("Lỗi ở increase" + err.message);
    const errorMessage = err.error || "Có lỗi xảy ra, vui lòng thử lại.";
    dispatch(getShopCartFailure(errorMessage));
    return errorMessage;
  }
};

export const decreaseQuantityFunction = async (userId, product, dispatch) => {
  try {
    console.log("hehe");
    dispatch(decreaseQuantity({ product }));
    const res = await fetch(`${BE_ENDPOINT}/user/updateQuantity/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      console.log("Cập nhật số lượng thành công trên server.");
      dispatch(getSum());
      return null;
    } else {
      const errorData = await res.json();
      console.log(errorData.error);
      const errorMessage = errorData.error;
      dispatch(getShopCartFailure(errorData.error));
      dispatch(increaseQuantity({ product }));
      return errorData;
    }
  } catch (err) {
    console.log("Lỗi ở increase" + err.message);
    const errorMessage = err.error || "Có lỗi xảy ra, vui lòng thử lại.";
    dispatch(getShopCartFailure(errorMessage));
    return errorMessage;
  }
};
