import { createSlice } from "@reduxjs/toolkit";

const extraInputsOpenSlice = createSlice({
  name: "extraInputsOpen",
  initialState: false,
  reducers: {
    setExtraInputsOpen: (_state: boolean, { payload }: { payload: boolean }) => {
      return payload;
    }
  }
});

export const { setExtraInputsOpen } = extraInputsOpenSlice.actions;

export default extraInputsOpenSlice.reducer;