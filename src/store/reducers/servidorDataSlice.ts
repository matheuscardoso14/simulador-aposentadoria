// Importações necessárias do Redux Toolkit e utilitários personalizados
import { createSlice } from "@reduxjs/toolkit";
import { generateId, getFromLocalStorage } from "../../utils";
import Genero from "../../enums/Genero";

// Interface que define a estrutura de um órgão adicional
export interface OrgaoAdicional {
  id: string;
  data_admissao: string;
  data_demissao: string;
}

// Interface que define a estrutura dos dados do servidor
interface ServidorData {
  nome: string;
  data_nascimento: string; 
  genero: Genero | "";
  cargo_ocupado: string;
  data_admissao: string;
  tempo_contribuicao: number | null;
  orgaos_adicionais: OrgaoAdicional[];
}

// Estado inicial
export const initialState: ServidorData = {
  nome: "",
  data_nascimento: "",
  genero: "",
  cargo_ocupado: "",
  data_admissao: "",
  tempo_contribuicao: null,
  orgaos_adicionais: [
    {
      id: generateId(),
      data_admissao: "",
      data_demissao: "",
    }
  ],
} as ServidorData;

const servidorDataSlice = createSlice({
  name: "servidorData", // Nome do slice
  initialState: getFromLocalStorage("servidorData") || initialState, // Estado inicial, com fallback para localStorage
  reducers: {
    // Action para atualizar uma propriedade específica do estado
    setProperty: (state: ServidorData, { payload }: { payload: { property: string, value: string } }) => {
      const { property, value } = payload;
      switch (property) {
        case "nome":
          state.nome = value;
          break;
        case "data_nascimento":
          state.data_nascimento = value;
          break;
        case "genero":
          state.genero = value.toLowerCase() as Genero;
          break;
        case "cargo_ocupado":
          state.cargo_ocupado = value;
          break;
        case "data_admissao":
          state.data_admissao = value;
          break;
      }
    },
    // Action para adicionar um novo órgão adicional
    addOrgaoAdicional: (state: ServidorData, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais.push({
        id,
        data_admissao: "",
        data_demissao: "",
      });
    },
    // Action para atualizar uma propriedade de um órgão adicional específico
    setOrgaoAdicional: (state: ServidorData, { payload }: { payload: { index: number, property: "data_admissao" | "data_demissao", value: string } }) => {
      const { index, property, value } = payload;
      if (property === "data_admissao") {
        state.orgaos_adicionais[index].data_admissao = value;
      } else if (property === "data_demissao") {
        state.orgaos_adicionais[index].data_demissao = value;
      }
    },
    // Action para remover um órgão adicional pelo ID
    removeOrgaoAdicional: (state: ServidorData, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais = state.orgaos_adicionais.filter((orgao) => orgao.id !== id);
    },
    // Action para definir o tempo total de contribuição
    setTempoContribuicao: (state: ServidorData, { payload }: { payload: number }) => {
      state.tempo_contribuicao = payload;
    },
    // Action para limpar os dados do servidor, resetando para o estado inicial
    clearServidorData: () => initialState,
  }
});

export const { setProperty, addOrgaoAdicional, setOrgaoAdicional, removeOrgaoAdicional, setTempoContribuicao, clearServidorData } = servidorDataSlice.actions;

export default servidorDataSlice.reducer;