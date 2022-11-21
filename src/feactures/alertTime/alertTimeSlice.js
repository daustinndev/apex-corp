import { createSlice } from "@reduxjs/toolkit";

const value = { value: ""};

const NavSlice = createSlice({
  name: "NavSlice",
  initialState: value,
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