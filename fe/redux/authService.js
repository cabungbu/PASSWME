import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BE_ENDPOINT } from "../settings/localVars";
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
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  updatePasswordStart,
  updatePasswordSuccess,
  updatePasswordFailure,
} from "./authSlice";
import { getUserShopcart } from "./shopCartService";

export const loginUser = async (user, dispatch, navigation) => {
  try {
    dispatch(loginStart());
    if (!user.email || !user.password) {
      dispatch(loginFailure("Vui lòng nhập đầy đủ thông tin."));
      return;
    }

    const res = await axios.post(BE_ENDPOINT + "/auth/login", user);
    const userData = res.data.user;
    dispatch(loginSuccess(userData));
    dispatch(setAccessToken(res.data.accessToken));
    dispatch(setRefreshToken(res.data.refreshToken));
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    await getUserShopcart(userData.id, dispatch);
    navigation.navigate("BottomBar");
  } catch (e) {
    console.error("Login error:", e);
    dispatch(loginFailure(e.response?.data?.message || "Đăng nhập thất bại"));
  }
};

export const registerUser = async (user, dispatch, navigation) => {
  try {
    dispatch(registerStart());

    // Validation checks (same as before)
    if (!user.email || !user.password || !user.phone || !user.username) {
      dispatch(registerFailure("Vui lòng nhập đầy đủ thông tin"));
      return;
    }

    if (user.username.length <= 8) {
      dispatch(registerFailure("Tên người dùng phải có hơn 8 ký tự"));
      return;
    }

    const phonePattern = /^\d{9,12}$/;
    if (!phonePattern.test(user.phone)) {
      dispatch(registerFailure("Số điện thoại phải gồm 9-12 số"));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      dispatch(registerFailure("Email này không hợp lệ"));
      return;
    }

    if (user.password.length < 6) {
      dispatch(registerFailure("Mật khẩu phải có ít nhất 6 ký tự"));
      return;
    }

    const res = await axios.post(BE_ENDPOINT + "/auth/register", user);

    if (res.data) {
      dispatch(registerSuccess(res.data.user));
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setRefreshToken(res.data.refreshToken));
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      navigation.navigate("BottomBar");
    }
  } catch (error) {
    console.error("Register error:", error);

    let errorMessage = "Đăng ký thất bại";

    if (error.response) {
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server";
    } else {
      errorMessage = error.message || errorMessage;
    }

    dispatch(registerFailure(errorMessage));
  }
};

export const logoutUser = async (user, dispatch, navigation) => {
  try {
    await axios.post(BE_ENDPOINT + `/auth/logout/${user.id}`);
    dispatch(logout());
  } catch (e) {
    console.error("Logout error:", e);
  }
};

// Create a separate utility for token refresh and axios interceptor
export const createAxiosJWT = (
  accessToken,
  refreshTokenRedux,
  user,
  dispatch
) => {
  const axiosJWT = axios.create();

  const refreshToken = async () => {
    try {
      const res = await fetch(BE_ENDPOINT + "/auth/refresh", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshTokenRedux,
        }),
      });
      return await res.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        try {
          let date = new Date();
          const decodedToken = jwtDecode(accessToken);

          if (decodedToken.exp < date.getTime() / 1000) {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
            dispatch(loginSuccess(refreshUser));
            dispatch(setAccessToken(data.accessToken));
            dispatch(setRefreshToken(data.refreshToken));

            config.headers["token"] = "Bearer " + data.accessToken;
          }
        } catch (decodeError) {
          console.error("Token decode error:", decodeError);
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  return axiosJWT;
};

export const updateUserInformation = async (
  userData,
  dispatch,
  user,
  refreshTokenRedux,
  accessToken
) => {
  console.log("Đã chạy cập nhật");
  try {
    console.log("Đã thử chạy cập nhật");
    dispatch(updateUserStart());

    // Validation checks
    if (!userData.email && !userData.phone && !userData.username) {
      dispatch(updateUserFailure("Vui lòng nhập thông tin"));
      return;
    }

    if (userData.username && userData.username.length <= 6) {
      dispatch(updateUserFailure("Tên người dùng phải có hơn 8 ký tự"));
      return;
    }

    const phonePattern = /^\d{9,12}$/;
    if (userData.phone && !phonePattern.test(userData.phone)) {
      dispatch(updateUserFailure("Số điện thoại phải gồm 9-12 số"));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userData.email && !emailPattern.test(userData.email)) {
      dispatch(updateUserFailure("Email này không hợp lệ"));
      return;
    }

    const axiosJWT = createAxiosJWT(
      accessToken,
      refreshTokenRedux,
      user,
      dispatch
    );
    const res = await axiosJWT.patch(
      `${BE_ENDPOINT}/user/updateUser/${user?.id}`,
      userData,
      {
        headers: {
          token: "Bearer " + accessToken,
        },
      }
    );

    if (res.data) {
      dispatch(updateUserSuccess(res.data.user));
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
    }
  } catch (error) {
    console.error("Update user error:", error);

    let errorMessage = "Cập nhật thông tin người dùng thất bại";

    if (error.response) {
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server";
    } else {
      errorMessage = error.message || errorMessage;
    }

    dispatch(updateUserFailure(errorMessage));
  }
};

export const changePassword = async (
  password,
  dispatch,
  user,
  refreshTokenRedux,
  accessToken 
) => {
  try {
    if (!user || !user.id) {
      dispatch(loginFailure("Không tìm thấy thông tin người dùng"));
      return;
    }

    const axiosJWT = createAxiosJWT(
      accessToken,
      refreshTokenRedux,
      user,
      dispatch
    );

    const res = await axiosJWT.patch(
      `${BE_ENDPOINT}/auth/resetPassword/${user.id}`, 
      password,
      {
        headers: {
          token: "Bearer " + accessToken,
        },
      }
    );

    if (res.data && res.data.user) {
      // Dispatch action update user với thông tin mới
      dispatch(updatePasswordSuccess(res.data.user));
    }
  } catch (error) {
    console.error("Change password error:", error);

    let errorMessage = "Đổi mật khẩu thất bại";
    if (error.response) {
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      errorMessage = "Không thể kết nối đến server";
    } else {
      errorMessage = error.message || errorMessage;
    }

    dispatch(updatePasswordFailure(errorMessage));
  }
};