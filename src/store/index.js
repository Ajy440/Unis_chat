import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
