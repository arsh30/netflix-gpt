import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
const appStore = configureStore({
  reducer: {
    // this reducer will have different reducer from different slices
    user: userReducer,
  },
});

export default appStore;
