import { createSlice } from "@reduxjs/toolkit";
const authSlide = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    error: null,
    registerSuccess: false,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    loginStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      state.error = null;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload;
    },
    loginFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
      console.log(state.error);
    },
    logout(state) {
      state.user = null;
      state.error = false;
    },
    registerStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
      state.registerSuccess = true;
    },
    registerFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
      state.registerSuccess = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerFailure,
  registerSuccess,
  setUser,
  setAccessToken,
  setRefreshToken,
} = authSlide.actions;
export default authSlide.reducer;
