import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BE_ENDPOINT } from "../settings/localVars";
import {
  getShopCartStart,
  getShopCartFailure,
  getShopCartSuccess,
  setShopCart,
  updateShopCart,
} from "./shopCartSlice";

export const getUserShopcart = async (userId, dispatch) => {
  try {
    dispatch(getShopCartStart());
    const res = await axios.get(
      BE_ENDPOINT + `/user/getUserShopCart/${userId}`
    );
    const shopCartData = res.data;
    dispatch(getShopCartSuccess(shopCartData));
    await AsyncStorage.setItem("shopCart", JSON.stringify(shopCartData));
  } catch (error) {
    console.error(error);
    dispatch(getShopCartFailure(JSON.stringify(error.response?.data.message)));
  }
};
export function deepEqual(obj1, obj2) {
  // Kiểm tra nếu cả hai đều là null hoặc không phải là đối tượng
  if (obj1 === obj2) {
    return true;
  }

  // Kiểm tra kiểu dữ liệu
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // Lấy danh sách các thuộc tính của hai đối tượng
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Kiểm tra số lượng thuộc tính
  if (keys1.length !== keys2.length) {
    return false;
  }

  // So sánh từng thuộc tính
  for (let key of keys1) {
    if (!keys2.includes(key)) {
      // console.log(`Khóa "${key}" không tồn tại trong obj2`);
      return false; // Hoặc return 3 nếu bạn muốn giữ lại giá trị đó
    }
    if (!deepEqual(obj1[key], obj2[key])) {
      // console.log(
      //   `Giá trị của khóa "${key}" không giống nhau:`,
      //   obj1[key],
      //   obj2[key]
      // );
      return false; // Hoặc return 3 nếu bạn muốn giữ lại giá trị đó
    }
  }

  return true;
}
export const checkIfShopcartUpdate = async (
  currentShopcart,
  userId,
  dispatch
) => {
  try {
    dispatch(getShopCartStart());
    const res = await axios.get(
      `${BE_ENDPOINT}/user/getUserShopCart/${userId}`
    );
    const shopCartData = res.data;

    if (currentShopcart.length < shopCartData.length) {
      console.log(currentShopcart.length);
      getUserShopcart(userId, dispatch);
      return;
    } else {
      for (const [index, item] of shopCartData.entries()) {
        const jsonItem = JSON.stringify(item.listItem);
        if (
          currentShopcart[index].user !== item.user ||
          currentShopcart[index].id !== item.id ||
          deepEqual(currentShopcart[index].items, item.listItem) === false
        ) {
          console.log("Cập nhật giỏ hàng");
          dispatch(updateShopCart({ index, item }));
        }
      }
    }

    await AsyncStorage.setItem("shopCart", JSON.stringify(shopCartData));
  } catch (error) {
    console.error("Lỗi ở checkIfShopcartUpdate: " + error);
    dispatch(getShopCartFailure(JSON.stringify(error.response?.data.message)));
  }
};

export const addProductToCart = async (dispatch, product, userId) => {
  try {
    if (product.sellerId === userId) {
      dispatch(getShopCartFailure("Bạn không thể thêm sản phẩm của mình"));
    }
    dispatch(getShopCartStart());
    const res = await axios.post(
      `${BE_ENDPOINT}/user/addToShopCart/${userId}`,
      {
        sellerId: product.sellerId,
        postId: product.postId,
        productId: product.productId,
        quantity: product.quantity,
      }
    );
    if (res.status === 200) {
      console.log("200 ok");
      getUserShopcart(userId, dispatch);
      return null;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
    dispatch(getShopCartFailure(errorMessage));
    return errorMessage;
  }
};

export const updateUserShopCart = async (
  currentShopcart,
  dispatch,
  product,
  userId
) => {
  try {
    if (product.sellerId === userId) {
      dispatch(getShopCartFailure("Bạn không thể thêm sản phẩm của mình"));
    }
    dispatch(getShopCartStart());
    // console.log(userId);
    const res = await axios.patch(
      `${BE_ENDPOINT}/user/updateShopCart/${userId}`,
      {
        sellerId: product.sellerId,
        postId: product.postId,
        productIdBefore: product.productIdBefore,
        productIdAfter: product.productIdAfter,
        quantity: product.quantity,
      }
    );
    if (res.status === 200) {
      getUserShopcart(userId, dispatch);
      return null;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
    dispatch(getShopCartFailure(errorMessage));
    return errorMessage;
  }
};
