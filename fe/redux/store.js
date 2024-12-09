import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Đảm bảo đường dẫn đúng
import shopCartSlide from "./shopCartSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    shopCartContainer: shopCartSlide,
    // Thêm các reducer khác tại đây nếu cần
  },
});

export default store;
