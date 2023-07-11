import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editData: {},
};

const postDataSlice = createSlice({
  name: "postData",
  initialState,
  reducers: {
    editData(state, action) {
      state.editData = action.payload;
    },
  },
});

export const { editData } = postDataSlice.actions;

export default postDataSlice.reducer;
