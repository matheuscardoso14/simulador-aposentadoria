import { expect, test } from "vitest";
import reducer, { initialState, setProperty, addOrgaoAdicional, setOrgaoAdicional, removeOrgaoAdicional, setTempoContribuicao, clearServidorData } from "./servidorDataSlice";

test("setProperty() deve alterar o valor de uma propriedade", () => {
  const newState = reducer(initialState, setProperty({ property: "nome", value: "João" }));

  expect(newState.nome).toEqual("João");
});

test("addOrgaoAdicional() deve adicionar um novo órgão adicional", () => {
  const newState = reducer(initialState, addOrgaoAdicional("1"));
  const orgaoAdicionado = newState.orgaos_adicionais[newState.orgaos_adicionais.length - 1];

  expect(orgaoAdicionado).toEqual({ id: "1", data_admissao: "", data_demissao: "" });
});

test("setOrgaoAdicional() deve alterar o valor de uma propriedade de um órgão adicional", () => {
  const newState = reducer(initialState, setOrgaoAdicional({ index: 0, property: "data_admissao", value: "2023-01-01" }));
  const orgaoAlterado = newState.orgaos_adicionais[0];

  expect(orgaoAlterado.data_admissao).toEqual("2023-01-01");
});

test("removeOrgaoAdicional() deve remover um órgão adicional", () => {
  const stateWithOrgao = {
    ...initialState,
    orgaos_adicionais: [{ id: "1", data_admissao: "", data_demissao: "" }],
  };

  const newState = reducer(stateWithOrgao, removeOrgaoAdicional("1"));

  expect(newState.orgaos_adicionais).toHaveLength(0);
});

test("setTempoContribuicao() deve alterar o tempo de contribuição", () => {
  const newState = reducer(initialState, setTempoContribuicao(10));

  expect(newState.tempo_contribuicao).toEqual(10);
});

test("clearServidorData() deve retornar o estado inicial", () => {
  const stateWithData = {
    ...initialState,
    nome: "João",
    tempo_contribuicao: 10,
    orgaos_adicionais: [{ id: "1", data_admissao: "", data_demissao: "" }],
  };

  const newState = reducer(stateWithData, clearServidorData());

  expect(newState).toEqual(initialState);
});