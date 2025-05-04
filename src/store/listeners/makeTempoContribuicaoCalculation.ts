import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { OrgaoAdicional, setTempoContribuicao } from "../reducers/servidorDataSlice";
import { RootState } from "..";
import { calculateTempoContribuicaoAdicional, calculateTempoContribuicaoPrincipal } from "./helpers/tempoContribuicaoCalculations";

export const calculateTempoContribuicao = createAction("servidorData/calculateTempoContribuicao");

export const listener = createListenerMiddleware();


listener.startListening({
  actionCreator: calculateTempoContribuicao,
  effect: (_action, { dispatch, getState }) => {
    const state: RootState = getState() as RootState;

    const dataAdmissaoPrincipal: Date = new Date(state.servidorData.data_admissao);
    const orgaosAdicionais: OrgaoAdicional[] = state.servidorData.orgaos_adicionais;
    
    const tempoContribuicaoPrincipal: Date = calculateTempoContribuicaoPrincipal(dataAdmissaoPrincipal);
    const tempoContribuicaoAdicional: Date = calculateTempoContribuicaoAdicional(orgaosAdicionais);

    const totalTempoContribuicao: Date = new Date(tempoContribuicaoPrincipal.getTime() + tempoContribuicaoAdicional.getTime());
    dispatch(setTempoContribuicao(totalTempoContribuicao.getTime()));
  }
});