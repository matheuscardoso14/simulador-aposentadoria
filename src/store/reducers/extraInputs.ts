import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

function generateId() {
  return uuid().slice(0, 4);
}

const extraInputsSlice = createSlice({
  name: "extraInputsAmount",
  initialState: [generateId()],
  reducers: {
    addExtraInput: (state) => {
      state.push(generateId());
    },
    removeExtraInput: (state) => {
      state.pop();
    }
  }
})

export const { addExtraInput, removeExtraInput } = extraInputsSlice.actions;

export default extraInputsSlice.reducer;