import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    term: "slice",
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

export const { setTerm } = navbarSlice.actions;
export default navbarSlice.reducer;
