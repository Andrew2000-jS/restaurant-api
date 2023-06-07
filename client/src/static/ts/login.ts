import type { ApiResponse, ILogin } from "../../models";
import { loginService } from "../../services/auth/login.service";
import { $ } from "./conf";
import { addItem } from "./localStorage";
import { showAlert } from "./showAlert";
import { validPassword, validCi } from "./validateInputs";

const formLogin = $("formLogin");

const ci = $("logCi") as HTMLInputElement;
const password = $("logPwd") as HTMLInputElement;

const logBtn = $("logBtn") as HTMLInputElement;

export const clearLoginValues = () => {
    ci.value = "";
    password.value = "";
}


export function handleSubmitLogin() {
  formLogin?.addEventListener("submit", (e) => {
    e.preventDefault();

    logBtn.disabled = true;

    const data: ILogin = {
      ci: validCi(ci.value),
      password: validPassword(password.value),
    };

    loginService(data)
      .then((res) => {
        addItem(res)
        if (Number(res.code) === 200) {
          showAlert("Seras redirigido!", "success");
          setTimeout(() => {
            window.location.replace("/");
          }, 5000);
        } else if (Number(res.code) === 404) {
          showAlert("Usuario no encontrado!", "warning");
          logBtn.disabled = false;
        } else if (Number(res.code) === 500) {
          showAlert("Algo ha salido mal!", "success");
          logBtn.disabled = false;
        }
      })
      .catch((err: any) => {
        logBtn.disabled = false;
        console.log(err);
      });
  });
}
