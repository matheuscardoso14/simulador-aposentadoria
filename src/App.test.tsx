import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { setProperty } from "./store/reducers/servidorDataSlice";
import { setExtraInputsOpen } from "./store/reducers/extraInputsOpenSlice";
import { act } from "react";

test("deve renderizar o componente Result após o envio do formulário", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
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

  const resultComponent = screen.getByText("Senhor(a) João Gabriel, Analista, você se aposentará no dia:");
  expect(resultComponent).toBeInTheDocument();
});