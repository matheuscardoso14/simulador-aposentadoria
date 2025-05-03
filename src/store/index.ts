import { configureStore } from "@reduxjs/toolkit";
import extraInputsOpen from "./reducers/extraInputsOpen.js";

const store = configureStore({
  reducer: {
    extraInputsOpen
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;