import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      destroyCookie("", jwt);
      window.location.reload();
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
