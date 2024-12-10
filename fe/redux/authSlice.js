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
    updateUserSuccess: false,
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

    updateUserStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updateUserFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
    updateUserSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
    },

    updatePasswordStart(state) {
      state.isFetching = true;
      state.error = false;
    },
    updatePasswordFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
    },
    updatePasswordSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      state.error = false;
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
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  updatePasswordStart,
  updatePasswordFailure,
  updatePasswordSuccess
} = authSlide.actions;
export default authSlide.reducer;
