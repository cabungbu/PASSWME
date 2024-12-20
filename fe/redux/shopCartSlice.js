import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: {
    shopCart: [],
    totalSum: 0,
    isFetching: false,
    error: null,
    isCheckingAll: false,
  },
  reducers: {
    getShopCartStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    getShopCartSuccess(state, action) {
      state.isFetching = false;
      // Transform the complex objects into a more renderable format
      state.shopCart = action.payload.map((item) => ({
        id: item.id,
        user: item.user,
        phone: item.phone,
        address: item.address,
        items: item.listItem.map((listItem) => ({
          postId: listItem.postId,
          title: listItem.title,
          images: listItem.images,
          product: {
            ...listItem.product,
            // Add any additional transformations needed
          },
        })),
        updatedAt: item.updatedAt,
      }));
      state.error = null;
    },
    getShopCartFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
    setShopCart(state, action) {
      // Similar transformation for setShopCart
      state.shopCart = Array.isArray(action.payload)
        ? action.payload.map((item) => ({
            id: item.id,
            user: item.user,
            items: item.listItem.map((listItem) => ({
              postId: listItem.postId,
              title: listItem.title,
              images: listItem.images,
              product: {
                ...listItem.product,
              },
            })),
            updatedAt: item.updatedAt,
          }))
        : [action.payload];
    },
    updateShopCart(state, action) {
      // Create a new copy of the shopCart array
      const updatedShopCart = [...state.shopCart];
      updatedShopCart[action.payload.index] = {
        id: action.payload.item.id,
        user: action.payload.item.user,
        items: action.payload.item.listItem.map((listItem) => ({
          postId: listItem.postId,
          title: listItem.title,
          images: listItem.images,
          product: {
            ...listItem.product,
          },
        })),
        updatedAt: action.payload.item.updatedAt,
      };
      state.isFetching = false;
      // Update the state with the new array
      state.shopCart = updatedShopCart;
      state.error = null;
    },
    setShopCartAllTrue(state, action) {
      state.isCheckingAll = true;

      state.shopCart.forEach((item) => {
        item.items.forEach((listItem) => {
          listItem.product.isCheck = true;
        });
      });
    },
    setShopCartAllFalse(state, action) {
      state.isCheckingAll = false;
      state.shopCart.forEach((item) => {
        item.items.forEach((listItem) => {
          listItem.product.isCheck = false;
        });
      });
    },
    deleteProductShopCart(state, action) {
      const updatedShopCart = action.payload.shopcart;

      // Find the index of the shopcart entry
      const indexOfShopcart = updatedShopCart.findIndex(
        (item) => item.id === action.payload.product.sellerId
      );

      if (indexOfShopcart === -1) {
        console.error("Shopcart not found for the given sellerId");
        return; // Exit the function if the cart is not found
      }

      // Filter out the item to remove
      const itemsAfter = updatedShopCart[indexOfShopcart].items.filter(
        (item) => item.product.productId !== action.payload.product.productId
      );

      // Debug logs to check the values

      if (itemsAfter.length > 0) {
        const updatedCartItem = {
          ...updatedShopCart[indexOfShopcart],
          items: itemsAfter,
        };
        const newUpdatedShopCart = [
          ...updatedShopCart.slice(0, indexOfShopcart),
          updatedCartItem,
          ...updatedShopCart.slice(indexOfShopcart + 1),
        ];
        return {
          ...state,
          shopCart: newUpdatedShopCart,
          isFetching: false,
          error: null,
        };
      } else {
        const newUpdatedShopCart = [
          ...updatedShopCart.slice(0, indexOfShopcart),
          ...updatedShopCart.slice(indexOfShopcart + 1),
        ];
        return {
          ...state,
          shopCart: newUpdatedShopCart,
          isFetching: false,
          error: null,
        };
      }
    },

    deleteCheckedItem(state, action) {
      const updatedShopCart = state.shopCart.map((element) => {
        const updatedItems = element.items.filter(
          (item) => item.product.isCheck !== true
        );
        return {
          ...element,
          items: updatedItems,
        };
      });

      state.shopCart = updatedShopCart.filter((item) => item.items.length > 0);
    },
    increaseQuantity(state, action) {
      const product = action.payload.product;
      const updatedShopCart = state.shopCart.map((element) => {
        if (element.id === product.sellerId) {
          const updatedItems = element.items.map((item) => {
            if (
              item.product.productId === product.productId &&
              item.postId === product.postId
            ) {
              return {
                ...item,
                product: {
                  ...item.product,
                  quantityInShopcart:
                    Number(item.product.quantityInShopcart) + 1, // Cập nhật thuộc tính quantityInShopcart trong product
                },
              };
            }
            return item;
          });

          return {
            ...element,
            items: updatedItems,
          };
        }
        return element;
      });

      // Cập nhật lại state với giỏ hàng đã được thay đổi
      state.shopCart = updatedShopCart;
    },

    decreaseQuantity(state, action) {
      const product = action.payload.product;
      const updatedShopCart = state.shopCart.map((element) => {
        if (element.id === product.sellerId) {
          const updatedItems = element.items.map((item) => {
            if (
              item.product.productId === product.productId &&
              item.postId === product.postId
            ) {
              return {
                ...item,
                product: {
                  ...item.product,
                  quantityInShopcart:
                    Number(item.product.quantityInShopcart) - 1, // Cập nhật thuộc tính quantityInShopcart trong product
                },
              };
            }
            return item;
          });

          return {
            ...element,
            items: updatedItems,
          };
        }
        return element;
      });

      // Cập nhật lại state với giỏ hàng đã được thay đổi
      state.shopCart = updatedShopCart;
    },
    getSum(state, action) {
      const totalSum = state.shopCart.reduce((accumulator, currentValue) => {
        return (
          accumulator +
          currentValue.items.reduce((acc, item) => {
            // Kiểm tra nếu isCheck là true trước khi tính tổng
            if (item.product.isCheck) {
              return (
                acc +
                Number(item.product.price) *
                  Number(item.product.quantityInShopcart)
              );
            }
            return acc;
          }, 0)
        );
      }, 0);

      state.totalSum = totalSum;
    },
    clickItem(state, action) {
      const product = action.payload.product;
      const updatedShopCart = state.shopCart.map((element) => {
        if (element.id === product.sellerId) {
          const updatedItems = element.items.map((item) => {
            if (
              item.product.productId === product.productId &&
              item.postId === product.postId
            ) {
              return {
                ...item,
                product: {
                  ...item.product,
                  isCheck: true,
                },
              };
            }
            return item;
          });

          return {
            ...element,
            items: updatedItems,
          };
        }
        return element;
      });

      // Cập nhật lại state với giỏ hàng đã được thay đổi
      state.shopCart = updatedShopCart;
    },
    unClickItem(state, action) {
      const product = action.payload.product;
      const updatedShopCart = state.shopCart.map((element) => {
        if (element.id === product.sellerId) {
          const updatedItems = element.items.map((item) => {
            if (
              item.product.productId === product.productId &&
              item.postId === product.postId
            ) {
              return {
                ...item,
                product: {
                  ...item.product,
                  isCheck: false,
                },
              };
            }
            return item;
          });

          return {
            ...element,
            items: updatedItems,
          };
        }
        return element;
      });

      // Cập nhật lại state với giỏ hàng đã được thay đổi
      state.shopCart = updatedShopCart;
    },
  },
});

export const {
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
} = shopCartSlice.actions;

export default shopCartSlice.reducer;
