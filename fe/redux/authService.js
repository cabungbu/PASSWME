import axios from "axios";
import {
  registerStart,
  registerFailure,
  registerSuccess,
  loginStart,
  loginSuccess,
  loginFailure,
} from "./authSlice";
export const loginUser = async (user, dispatch, navigation) => {
  try {
    dispatch(loginStart());

    const res = await axios.post("http://localhost:3000/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigation.navigate("BottomBar");
  } catch (e) {
    console.error("Login error:", e);
    dispatch(loginFailure());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("http://localhost:3000/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("BottomBar");
  } catch (e) {
    dispatch(registerFailure());
  }
};
