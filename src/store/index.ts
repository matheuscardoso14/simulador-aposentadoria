import { configureStore } from "@reduxjs/toolkit";
import extraInputsOpenSlice from "./reducers/extraInputsOpenSlice.js";
import servidorDataSlice from "./reducers/servidorDataSlice.js";
import retirementDateSlice from "./reducers/retirementDateSlice.js";
import listeners from "./listeners/index.js";


const store = configureStore({
  reducer: {
    extraInputsOpen: extraInputsOpenSlice,
    servidorData: servidorDataSlice,
    retirementDate: retirementDateSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(...listeners.map((listener) => listener.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;