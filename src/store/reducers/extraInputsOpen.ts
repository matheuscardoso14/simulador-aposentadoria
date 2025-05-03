import { createSlice } from "@reduxjs/toolkit";

const extraInputsOpen = createSlice({
  name: "extraInputsOpen",
  initialState: false,
  reducers: {
    setExtraInputsOpen: (_state: boolean, { payload }: { payload: boolean }) => {
      return payload;
    }
  }
})

export const { setExtraInputsOpen } = extraInputsOpen.actions;

export default extraInputsOpen.reducer;