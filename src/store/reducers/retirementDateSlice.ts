import { createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage } from "../../utils";

const retirementDateSlice = createSlice({
  name: "retirementDate",
  // O estado inicial é obtido da localStorage, se disponível
  initialState: getFromLocalStorage("retirementDate") || "",
  reducers: {
    // Action para alterar o estado da data de aposentadoria
    setRetirementDate: (_state: string, { payload }: { payload: string }) => {
      return payload;
    },
    // Action para limpar o estado da data de aposentadoria
    clearRetirementDate: () => "",
  }
});

export const { setRetirementDate, clearRetirementDate } = retirementDateSlice.actions;

export default retirementDateSlice.reducer;