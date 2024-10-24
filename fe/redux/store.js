import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Đảm bảo đường dẫn đúng

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Thêm các reducer khác tại đây nếu cần
  },
});

export default store;
