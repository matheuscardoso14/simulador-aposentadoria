import { createSlice } from "@reduxjs/toolkit";

const retirementDateSlice = createSlice({
  name: "retirementDate",
  initialState: "",
  reducers: {
    setRetirementDate: (_state, { payload }: { payload: string }) => {
      return payload;
    },
  }
});

export const { setRetirementDate } = retirementDateSlice.actions;

export default retirementDateSlice.reducer;