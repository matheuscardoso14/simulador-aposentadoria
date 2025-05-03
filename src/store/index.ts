import { configureStore } from "@reduxjs/toolkit";
import extraInputsOpenSlice from "./reducers/extraInputsOpen.js";
import extraInputsSlice from "./reducers/extraInputs.js";

const store = configureStore({
  reducer: {
    extraInputsOpen: extraInputsOpenSlice,
    extraInputs: extraInputsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;