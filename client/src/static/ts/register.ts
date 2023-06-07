import type { IRegister } from "../../models";

import { registerService } from "../../services";
import { showAlert } from "./showAlert";
import {
  validCi,
  validNames,
  validPassword,
  validPhone,
  validAddress,
} from "./validateInputs";

import { $ } from "./conf";

const formRegister = $("formRegister");

const userName = $("name") as HTMLInputElement;
const lastName = $("lastName") as HTMLInputElement;
const ci = $("ci") as HTMLInputElement;
const phone = $("phone") as HTMLInputElement;
const address = $("address") as HTMLInputElement;
const password = $("pwd") as HTMLInputElement;
const confirmPassword = $("cpwd") as HTMLInputElement;
const date = $("date") as HTMLInputElement;
const email = $("email") as HTMLInputElement;
const registerBtn = $("registerBtn") as HTMLInputElement;

export const clearRegisterInputs = () => {
  userName.value = ""
  lastName.value = ""
  ci.value = ""
  phone.value = ""
  address.value = ""
  confirmPassword.value = " "
  email.value = " "
}

export function handleSubmitRegister() {
  formRegister?.addEventListener("submit", (e) => {
    e.preventDefault();

    registerBtn.disabled = true;

    const data: IRegister = {
      name: validNames(userName.value),
      lastName: validNames(lastName.value),
      ci: validCi(ci.value),
      birthdate: new Date(date.value),
      phone: validPhone(phone.value),
      email: email.value,
      address: validAddress(address.value),
      password: validPassword(password.value),
    };

    if (password.value !== confirmPassword.value) {
      registerBtn.disabled = false;
      showAlert("Las claves no coinciden!", "warning");
      throw new Error("Password does not match");
    }

    registerService(data)
      .then((res) => {
        if (Number(res.code) === 500) {
          registerBtn.disabled = false;
          showAlert(res.message, "danger");
        } else if (Number(res.code) === 400) {
          registerBtn.disabled = false;
          showAlert(res.message, "warning");
        } else if (Number(res.code) === 201) {
          registerBtn.disabled = true;
          showAlert("Register successfully!", "success");
          setTimeout(() => {
            window.location.replace("login");
          }, 5000);
        }
      })
      .catch((err: any) => {
        registerBtn.disabled = false;
        console.log(err);
      });
  });
}
