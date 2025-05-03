import { configureStore } from "@reduxjs/toolkit";
import extraInputsOpenSlice from "./reducers/extraInputsOpenSlice.js";
import servidorDataSlice from "./reducers/servidorDataSlice.js";


const store = configureStore({
  reducer: {
    extraInputsOpen: extraInputsOpenSlice,
    servidorData: servidorDataSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;