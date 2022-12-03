import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slice/authSlice";
import chatReducer from "./slice/chatSlice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    chat: chatReducer,
  },
});
