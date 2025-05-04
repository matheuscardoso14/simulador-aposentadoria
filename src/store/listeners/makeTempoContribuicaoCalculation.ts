import { createAction, createListenerMiddleware, Dispatch } from "@reduxjs/toolkit";
import { OrgaoAdicional, setTempoContribuicao } from "../reducers/servidorDataSlice";

interface Payload {
  data_admissao_principal: string;
  orgaos_adicionais: OrgaoAdicional[];
}

export const calculateTempoContribuicao = createAction<Payload>("servidorData/calculateTempoContribuicao");

export const listener = createListenerMiddleware();


listener.startListening({
  actionCreator: calculateTempoContribuicao,
  effect: ({ payload }: { payload: Payload }, { dispatch }: { dispatch: Dispatch }) => {
    const { data_admissao_principal, orgaos_adicionais } = payload;
    const tempoContribuicao: number = new Date().getTime() - new Date(data_admissao_principal).getTime();
    console.log("Tempo de contribuição principal:", tempoContribuicao);

    const totalTempoContribuicaoOrgaosAdicionais: number = orgaos_adicionais
      .reduce((acc, orgao_adicional: OrgaoAdicional) => acc + (new Date(orgao_adicional.data_demissao).getTime() - new Date(orgao_adicional.data_admissao).getTime()), 0) || 0;
    console.log("Tempo de contribuição dos órgãos adicionais:", totalTempoContribuicaoOrgaosAdicionais);

    const totalTempoContribuicao = new Date(tempoContribuicao + totalTempoContribuicaoOrgaosAdicionais);
    console.log("Tempo de contribuição total:", totalTempoContribuicao.getTime());
    dispatch(setTempoContribuicao(totalTempoContribuicao.getTime()));
  }
});