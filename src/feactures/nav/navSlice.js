import { createSlice } from "@reduxjs/toolkit";

const valueNadbar = { value: "" };

const NavSlice = createSlice({
  name: "NavSlice",
  initialState: valueNadbar,
  reducers: {
    onChangeMethod: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
  },
});

export const { onChangeMethod } = NavSlice.actions;
export default NavSlice.reducer;
