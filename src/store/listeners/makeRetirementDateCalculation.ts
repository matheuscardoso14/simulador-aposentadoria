import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { setRetirementDate } from "../reducers/retirementDate";
import { calculateDataAposentadoria, getIdadeMinima, getPrimeiraAdmissao, getTempoContribuicaoMinimo } from "./helpers/retirementDateCalculations";
import { RootState } from "..";
import { saveToLocalStorage } from "../../utils";

export const makeRetirementDateCalculation = createAction("servidorData/makeRetirementDateCalculation");

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: makeRetirementDateCalculation,
  effect: (_action, { dispatch, getState }) => {
    const state: RootState = getState() as RootState;

    const dataNascimento: Date = new Date(state.servidorData.data_nascimento);
    const genero: string = state.servidorData.genero;
    const primeiraAdmissao: Date = getPrimeiraAdmissao(state);

    const idadeMinima: Date = getIdadeMinima(dataNascimento, genero);
    const tempoContribuicaoMinimo: Date = getTempoContribuicaoMinimo(primeiraAdmissao, genero);
      
    const dataAposentadoria: string = calculateDataAposentadoria(idadeMinima, tempoContribuicaoMinimo).toISOString();
    dispatch(setRetirementDate(dataAposentadoria));

    saveToLocalStorage("retirementDate", dataAposentadoria);
  }
});