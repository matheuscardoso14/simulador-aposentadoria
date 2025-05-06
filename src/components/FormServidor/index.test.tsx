import { beforeEach, expect, test } from "vitest";
import store from "../../store";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import FormServidor from ".";
import { setExtraInputsOpen } from "../../store/reducers/extraInputsOpenSlice";
import { act } from "react";
import { setProperty } from "../../store/reducers/servidorDataSlice";

beforeEach(() => {
  render(
    <Provider store={store}>
      <FormServidor />
    </Provider>
  );
});

test("deve mudar um valor do estado dos dados do servidor toda vez que o valor de um input mudar", () => {
  const inputNome: HTMLInputElement = screen.getByText("Nome do servidor").nextElementSibling as HTMLInputElement;

  fireEvent.change(inputNome, { target: { value: "João Gabriel" } });

  expect(inputNome.value).toEqual("João Gabriel");
});

test("deve mudar um valor do estado de órgãos adicionais toda vez que o valor de um input mudar", () => {
  store.dispatch(setExtraInputsOpen(true));

  const inputDataAdmissao: HTMLInputElement = screen.getByText("Data de admissão").nextElementSibling as HTMLInputElement;

  fireEvent.change(inputDataAdmissao, { target: { value: "2020-01-01" } });

  expect(inputDataAdmissao.value).toEqual("2020-01-01");
});

test("deve calcular a data de aposentadoria ao submeter o formulário", () => {
  const dispatch = store.dispatch;

  act(() => {
    dispatch(setProperty({ property: "nome", value: "João Gabriel" }));
    dispatch(setProperty({ property: "data_nascimento", value: "1990-01-01" }));
    dispatch(setProperty({ property: "genero", value: "masculino" }));
    dispatch(setProperty({ property: "cargo_ocupado", value: "Analista" }));
    dispatch(setProperty({ property: "data_admissao", value: "2010-01-01" }));
    dispatch(setExtraInputsOpen(true));
  });

  const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;

  act(() => fireEvent.submit(form));

  const dataAposentadoria = store.getState().retirementDate;

  expect(dataAposentadoria).toBeDefined();
  expect(dataAposentadoria).toEqual("2050-01-01T00:00:00.000Z");
});