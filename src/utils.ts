import { v4 as uuid } from "uuid";

export function generateId() {
  return uuid().slice(0, 4);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}