import axios from "axios";
import {
  registerStart,
  registerFailure,
  registerSuccess,
  loginStart,
  loginSuccess,
  loginFailure,
  setAccessToken,
  setRefreshToken,
  logout,
} from "./authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loginUser = async (user, dispatch, navigation) => {
  try {
    dispatch(loginStart());
    const res = await axios.post("http://localhost:3000/auth/login", user);
    const userData = res.data.user; // Lấy thông tin người dùng
    dispatch(loginSuccess(userData)); // Gọi action với thông tin người dùng
    dispatch(setAccessToken(res.data.accessToken));
    dispatch(setRefreshToken(res.data.refreshToken));
    // Lưu chỉ thông tin người dùng vào AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    navigation.navigate("BottomBar");
  } catch (e) {
    console.error("Login error:", e);
    dispatch(loginFailure(e.response?.data?.message || "Đăng nhập thất bại"));
  }
};

// authService.js
export const registerUser = async (user, dispatch, navigation) => {
  try {
    dispatch(registerStart());

    // Validate data before sending
    if (!user.email || !user.password || !user.phone || !user.username) {
      dispatch(registerFailure("Vui lòng nhập đầy đủ thông tin."));
      return;
    }

    const res = await axios.post("http://localhost:3000/auth/register", user);

    if (res.data) {
      dispatch(registerSuccess(res.data.user));
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setRefreshToken(res.data.refreshToken));
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      navigation.navigate("BottomBar");
    }
  } catch (error) {
    // Log full error for debugging
    console.error("Register error:", error);

    // Handle different types of errors
    let errorMessage = "Đăng ký thất bại";

    if (error.response) {
      // Server returned error response
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      // Request was made but no response
      errorMessage = "Không thể kết nối đến server";
    } else {
      // Error in request setup
      errorMessage = error.message || errorMessage;
    }

    dispatch(registerFailure(errorMessage));
  }
};

export const logoutUser = async (user, dispatch, navigation) => {
  try {
    const res = await axios.post(
      `http://localhost:3000/auth/logout/${user.id}` // Dùng backticks
    );

    dispatch(logout());
  } catch (e) {
    console.error("Logout error:", e);
  }
};
