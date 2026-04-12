import { createSlice } from "@reduxjs/toolkit";
const detailsSlice = createSlice({
  name: "details",
  initialState: {
    email: "",
    phoneNumber: "",
    successDeepLinkUrl: "",
    failureDeepLinkUrl: "",
    metaData: {
      device_id: "",
      ip_address: "",
      device_mac: "",
      appVersion: "",
    },
  },
  reducers: {
    addDetails: (state, { payload }) => {
      return payload;
    },
    clearDetails: () => {
      return {
        email: "",
        phoneNumber: "",
        successDeepLinkUrl: "",
        failureDeepLinkUrl: "",
        metaData: {
          device_id: "",
          ip_address: "",
          device_mac: "",
          appVersion: "",
        },
      };
    },
  },
});

const { reducer, actions } = detailsSlice;
export const { addDetails, clearDetails } = actions;
export default reducer;
