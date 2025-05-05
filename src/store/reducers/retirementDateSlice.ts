import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils";

const retirementDateSlice = createSlice({
  name: "retirementDate",
  initialState: getFromLocalStorage("retirementDate") || "",
  reducers: {
    setRetirementDate: (_state: string, { payload }: { payload: string }) => {
      return payload;
    },
    clearRetirementDate: () => "",
  }
});

export const { setRetirementDate, clearRetirementDate } = retirementDateSlice.actions;

export default retirementDateSlice.reducer;