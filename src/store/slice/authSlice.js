import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const navSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    openNav: (state) => {
      state.value = true;
    },
    closeNav: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openNav, closeNav } = navSlice.actions;

export default navSlice.reducer;
