import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUserData: {
    email: null,
    name: "aj",
  },
};

export const chatSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    setUserData: (state, data) => {
      state.selectedUserData = data.payload;
    },
    removeUserData: (state) => {
      state.selectedUserData = { email: null, name: null };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, removeUserData } = chatSlice.actions;

export default chatSlice.reducer;
