import { v4 as uuid } from "uuid";

export function generateId() {
  return uuid().slice(0, 4);
}

export function capitalizeFirstLetter(string: string) {
  return string
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
}

export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}