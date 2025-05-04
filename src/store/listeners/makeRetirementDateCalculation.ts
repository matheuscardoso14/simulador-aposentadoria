import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { setRetirementDate } from "../reducers/retirementDate";
import { RootState } from "..";

interface Payload {
  data_nascimento: string;
  data_admissao: string;
  genero: string;
}

export const makeRetirementDateCalculation = createAction<Payload>("servidorData/makeRetirementDateCalculation");

export const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: makeRetirementDateCalculation,
  effect: ({ payload }: { payload: Payload }, { dispatch, getState }) => {
    const { data_nascimento, data_admissao, genero } = payload;

    const orgaosAdicionais = (getState() as RootState).servidorData.orgaos_adicionais;
    const primeiraAdmissao = new Date(orgaosAdicionais
      .sort((a, b) => new Date(a.data_admissao).getTime() - new Date(b.data_admissao).getTime())[0].data_admissao)!;

    const dataNascimento: Date = new Date(data_nascimento);

    if (genero === "masculino") {
      const idadeMinima = new Date(dataNascimento);
      idadeMinima.setFullYear(idadeMinima.getFullYear() + 60);

      const tempoContribuicaoMinimo = new Date(!isNaN(primeiraAdmissao.getTime()) ? primeiraAdmissao : data_admissao);
      tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 35);
      console.log("Tempo de contribuição mínimo:", tempoContribuicaoMinimo);

      const dataAposentadoria = new Date(Math.max(idadeMinima.getTime(), tempoContribuicaoMinimo.getTime())).toISOString();
      console.log("Data de aposentadoria calculada:", dataAposentadoria);
      dispatch(setRetirementDate(dataAposentadoria.toString()));
    }
    else if (genero === "feminino") {
      const idadeMinima = new Date(dataNascimento);
      idadeMinima.setFullYear(idadeMinima.getFullYear() + 55);

      const tempoContribuicaoMinimo = new Date(!isNaN(primeiraAdmissao.getTime()) ? primeiraAdmissao : data_admissao);
      tempoContribuicaoMinimo.setFullYear(tempoContribuicaoMinimo.getFullYear() + 30);
      console.log("Tempo de contribuição mínimo:", tempoContribuicaoMinimo);

      const dataAposentadoria = new Date(Math.max(idadeMinima.getTime(), tempoContribuicaoMinimo.getTime())).toISOString();
      console.log("Data de aposentadoria calculada:", dataAposentadoria);
      dispatch(setRetirementDate(dataAposentadoria.toString()));
    }
  }
});