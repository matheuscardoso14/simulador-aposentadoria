import { v4 as uuid } from "uuid";

/**
 * Gera um ID de 4 caracteres.
 * 
 * @returns Uma string com 4 caracteres representando o ID.
 */
export function generateId() {
  return uuid().slice(0, 4);
}

/**
 * Deixa a primeira letra de cada palavra em uma string maiúscula.
 * 
 * @param string - A string de entrada.
 * @returns Uma nova string com a primeira letra de cada palavra em maiúscula.
 */
export function capitalizeFirstLetter(string: string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Salva um valor na localStorage
 * 
 * @param key - A chave associada ao valor.
 * @param value - O valor a ser salvo, que será convertido para JSON.
 */
export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Recupera um valor da localStorage.
 * 
 * @param key - A chave associada ao valor.
 * @returns O valor recuperado e convertido de JSON, ou null caso a chave não exista.
 */
export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}