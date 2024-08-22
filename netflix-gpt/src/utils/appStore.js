import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./GptSlice";
import configReducer from "./configSlice";
const appStore = configureStore({
  reducer: {
    // this reducer will have different reducer from different slices
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
