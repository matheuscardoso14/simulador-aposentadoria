import { expect, test } from "vitest";
import { capitalizeFirstLetter, generateId, getFromLocalStorage, saveToLocalStorage } from "./utils";

test("generateId() deve retornar um ID único de 4 caracteres", () => {
  const result: string = generateId();

  expect(result).toMatch(/^.{4}$/);
});

test("capitalizeFirstLetter() deve deixar a primeira letra de cada palavra maiúscula", () => {
  const result: string = capitalizeFirstLetter("the quick brown fox jumps over the lazy dog");
  const expectedResult: string = "The Quick Brown Fox Jumps Over The Lazy Dog";

  expect(result).toEqual(expectedResult);
});

test("saveToLocalStorage() deve salvar um valor na localStorage", () => {
  const key: string = "sentence";
  const value: string = "The quick brown fox jumps over the lazy dog";

  saveToLocalStorage(key, value);

  const result: string | null = localStorage.getItem(key);

  expect(result).toBeDefined();
  expect(result).toEqual(JSON.stringify(value));
});

test("getFromLocalStorage() deve retornar um valor salvo na localStorage", () => {
  const key: string = "sentence";
  const value: string = "The quick brown fox jumps over the lazy dog";

  localStorage.setItem(key, JSON.stringify(value));

  const result: string | null = getFromLocalStorage(key);
  const expectedResult: string = JSON.parse(localStorage.getItem(key) as string);

  expect(result).toBeDefined();
  expect(result).toEqual(expectedResult);
});