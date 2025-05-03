import { createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../utils";


export interface OrgaosAdicionais {
  id: string;
  nome: string;
  tempo_contribuicao: string;
}

interface ServidorDataPayload {
  nome: string;
  data_nascimento: string;
  genero: string;
  cargo_ocupado: string;
  data_admissao: string;
  orgaos_adicionais: OrgaosAdicionais[];
}

const initialState: ServidorDataPayload = {
  nome: "",
  data_nascimento: "",
  genero: "",
  cargo_ocupado: "",
  data_admissao: "",
  tempo_contribuicao: 0,
  orgaos_adicionais: [
    {
      id: generateId(),
      nome: "",
      tempo_contribuicao: "",
    }
  ],
} as ServidorDataPayload;

const servidorDataSlice = createSlice({
  name: "servidorData",
  initialState,
  reducers: {
    setProperty: (state, { payload }: { payload: { property: string, value: string } }) => {
      const { property, value } = payload;
      switch (property) {
        case "nome":
          state.nome = value;
          break;
        case "data_nascimento":
          state.data_nascimento = value;
          break;
        case "genero":
          state.genero = value;
          break;
        case "cargo_ocupado":
          state.cargo_ocupado = value;
          break;
        case "data_admissao":
          state.data_admissao = value;
          break;
      }
    },
    addOrgaoAdicional: (state, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais.push({
        id,
        nome: "",
        tempo_contribuicao: "",
      });
    },
    setOrgaoAdicional: (state, { payload }: { payload: { index: number, property: "nome" | "tempo_contribuicao", value: string } }) => {
      const { index, property, value } = payload;
      if (property === "nome") {
        state.orgaos_adicionais[index].nome = value;
      } else if (property === "tempo_contribuicao") {
        state.orgaos_adicionais[index].tempo_contribuicao = value;
      }
    },
    removeOrgaoAdicional: (state, { payload }: { payload: string }) => {
      const id = payload;
      state.orgaos_adicionais = state.orgaos_adicionais.filter((orgao) => orgao.id !== id);
    },
    clearServidorData: () => initialState,
  }
});

export const { setProperty, addOrgaoAdicional, setOrgaoAdicional, removeOrgaoAdicional, clearServidorData } = servidorDataSlice.actions;

export default servidorDataSlice.reducer;