import { createSlice } from "@reduxjs/toolkit";
const detailsSlice = createSlice({
  name: "details",
  initialState: "",
  reducers: {
    addDetails: (state, { payload }) => {
      return payload;
    },
    clearDetails: () => {
      return "";
    },
  },
});

const { reducer, actions } = detailsSlice;
export const { addDetails, clearDetails } = actions;
export default reducer;
