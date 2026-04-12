import { createSlice } from "@reduxjs/toolkit";
const sessionIdSlice = createSlice({
  name: "sessionId",
  initialState: "",
  reducers: {
    addSessionId: (state, { payload }) => {
      return payload;
    },
    clearSessionId: () => {
      return "";
    },
  },
});

const { reducer, actions } = sessionIdSlice;
export const { addSessionId, clearSessionId } = actions;
export default reducer;
