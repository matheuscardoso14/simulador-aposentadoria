import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../utils";


export interface OrgaoAdicional {
  id: string;
  data_admissao: string;
  data_demissao: string;
}

interface ServidorData {
  nome: string;
  data_nascimento: string;
  genero: string;
  cargo_ocupado: string;
  data_admissao: string;
  tempo_contribuicao: number | null;
  orgaos_adicionais: OrgaoAdicional[];
}

const initialState: ServidorData = {
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
  name: "servidorData",
  initialState,
  reducers: {
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
          state.genero = value.toLowerCase();
          break;
        case "cargo_ocupado":
          state.cargo_ocupado = value;
          break;
        case "data_admissao":
          state.data_admissao = value;
          break;
      }
    },
    addOrgaoAdicional: (state: ServidorData, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais.push({
        id,
        data_admissao: "",
        data_demissao: "",
      });
    },
    setOrgaoAdicional: (state: ServidorData, { payload }: { payload: { index: number, property: "data_admissao" | "data_demissao", value: string } }) => {
      const { index, property, value } = payload;
      if (property === "data_admissao") {
        state.orgaos_adicionais[index].data_admissao = value;
      } else if (property === "data_demissao") {
        state.orgaos_adicionais[index].data_demissao = value;
      }
    },
    removeOrgaoAdicional: (state: ServidorData, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais = state.orgaos_adicionais.filter((orgao) => orgao.id !== id);
    },
    setTempoContribuicao: (state: ServidorData, { payload }: { payload: number }) => {
      state.tempo_contribuicao = payload;
    },
    clearServidorData: () => initialState,
  }
});

export const { setProperty, addOrgaoAdicional, setOrgaoAdicional, removeOrgaoAdicional, setTempoContribuicao, clearServidorData } = servidorDataSlice.actions;

export default servidorDataSlice.reducer;