import { showAlert } from "./showAlert";

const charRegex = /[a-zA-Z]/;
const specialCharRegex = /[!@#$%^&*(),.?":{}|<>\s]/;

export const validPhone = (value: string): string => {
  if (charRegex.test(value) || specialCharRegex.test(value)) {
    showAlert("Telefono incorrecta", "danger");
  }

  return value;
};

export const validCi = (value: string): number => {
  const ciLength = value.toString().length;

  if (ciLength < 6 || ciLength > 8) {
    showAlert("Cedula incorrecta", "danger");
  }

  return Number(value);
};

export const validNames = (value: string): string => {
  const numCharRegex = /\d/;

  if (specialCharRegex.test(value) || numCharRegex.test(value)) {
    showAlert("Nombre o apellido incorrecto", "danger");
  }

  return value;
};

export const validPassword = (value: string): string => {
  const regex = /[A-Z]/;

  if (value.length < 8 || !regex.test(value)) {
    showAlert("Clave incorrecta", "danger");
  }

  return value;
};

export const validAddress = (value: string): string => {
  if (value.length < 10) {
    showAlert("Direccion incorrecta", "danger");
  }

  return value;
};

export const validNumber = (value: string): number => {
  if (charRegex.test(value) || specialCharRegex.test(value)) {
    showAlert('No se permiten letras', 'danger');
  }

  return Number(value)
}