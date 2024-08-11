import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    term: "",
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload.toLowerCase();
    },
  },
});

export const { setTerm } = navbarSlice.actions;
export default navbarSlice.reducer;
