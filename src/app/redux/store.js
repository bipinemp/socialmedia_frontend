import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { postSlice } from "./features/posts/postSlice";
import authReducer from "../redux/features/api/authSlice";
import postDataReducer from "../redux/features/posts/postDataSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    auth: authReducer,
    postData: postDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(postSlice.middleware),
  devTools: true,
});
