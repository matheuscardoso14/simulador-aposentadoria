import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { expect, test } from "vitest";
import store from "../../store";
import Result from ".";
import { initialState } from "../../store/reducers/servidorDataSlice";

test("deve limpar todos os estados relacionados ao servidor", () => {
  render(
    <Provider store={store}>
      <Result />
    </Provider>
  );
  const state = store.getState();

  const button: HTMLButtonElement = screen.getByRole("button") as HTMLButtonElement;

  fireEvent.click(button);

  expect(state.servidorData).toEqual(initialState);
  expect(state.retirementDate).toEqual("");
  expect(localStorage.getItem("servidorData")).toBeNull();
  expect(localStorage.getItem("retirementDate")).toBeNull();
});