import { createSlice } from "@reduxjs/toolkit";
const authSlide = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isFetching: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    loginStart(state) {
      state.isFetching = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isFetching = false;
      state.user = action.payload;
      console.log(action.payload);
      state.error = null;
    },
    loginFailure(state, action) {
      state.isFetching = false;
      state.error = action.payload;
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
      state.error = true;
      state.registerSuccess = false;
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
} = authSlide.actions;
export default authSlide.reducer;
