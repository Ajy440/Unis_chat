import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
