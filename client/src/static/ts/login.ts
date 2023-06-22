import type { ILogin } from "../../models";
import { findUserByCiService } from "../../services";
import { loginService } from "../../services/auth/login.service";
import { $ } from "./conf";
import { addItem } from "./localStorage";
import { showAlert } from "./showAlert";
import { validPassword, validCi } from "./validateInputs";

const formLogin = $("formLogin");

const ci = $("logCi") as HTMLInputElement;
const password = $("logPwd") as HTMLInputElement;

const logBtn = $("logBtn") as HTMLButtonElement;

ci.value = "";
password.value = "";

formLogin?.addEventListener("submit", (e) => {
  e.preventDefault();

  const data: ILogin = {
    ci: validCi(ci.value),
    password: validPassword(password.value),
  };

  loginService(data)
    .then((res) => {
      addItem(res.token, 'token');
      if (Number(res.code) === 200) {
        logBtn.disabled = true;
        showAlert("Seras redirigido!", "success");
        findUserByCiService(data.ci.toString()).then(res => addItem(res, 'user')).catch(err => console.log(err))
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
