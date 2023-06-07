import { showAlert } from "./showAlert";

const charRegex = /[a-zA-Z]/;
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/;

export const validPhone = (value: string): string => {
  if (charRegex.test(value) || specialCharRegex.test(value)) {
    showAlert("Invalid phone", "danger");
    throw new Error("Invalid field");
  }

  return value;
};

export const validCi = (value: string): number => {
  console.log(value);
  const ciLength = value.toString().length;

  if (ciLength < 6 || ciLength > 8) {
    showAlert("Invalid CI", "danger");
    throw new Error("Invalid field");
  }

  return Number(value);
};

export const validNames = (value: string): string => {
  const numCharRegex = /\d/;

  if (specialCharRegex.test(value) || numCharRegex.test(value)) {
    showAlert("Invalid field", "danger");
    throw new Error("Invalid field");
  }

  return value;
};

export const validPassword = (value: string): string => {
  const regex = /[A-Z]/;

  if (value.length < 8 || !regex.test(value)) {
    showAlert("Clave invalida", "danger");
    throw new Error("Invalid field");
  }

  return value;
};

export const validAddress = (value: string): string => {
  if (value.length < 10) {
    showAlert("Direccion invalida", "danger");
    throw new Error("Invalid field");
  }

  return value;
};
