import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filtering",
  initialState: "",
  reducers: {
    setSearchWord(state, action) {
      return action.payload;
    },
  },
});

export const { setSearchWord } = filterSlice.actions;
export default filterSlice.reducer;
