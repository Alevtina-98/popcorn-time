import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Login/modalSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export default store;
