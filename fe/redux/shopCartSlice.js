import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState: {
    shopCart: [],
    isFetching: false,
    error: null,
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
  },
});

export const {
  getShopCartStart,
  getShopCartFailure,
  getShopCartSuccess,
  setShopCart,
} = shopCartSlice.actions;

export default shopCartSlice.reducer;
