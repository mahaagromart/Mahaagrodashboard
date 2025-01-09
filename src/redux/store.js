import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/AuthSlice";
import loadingReducer from "./Features/LoadingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
});

export default store;
