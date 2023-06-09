import { $, $A } from "./conf";
import { reservationService } from "../../services";
import type { IReservation } from "../../models";
import { validNumber } from "./validateInputs";
import { showAlert } from "./showAlert";
import { findItem } from "./localStorage";

const cardBtn = $A("#reserveBtn");
const modalContainer = $("modalContainer");
const modalSuccess = $("modalSuccess");

const reserDate = $("reserDate") as HTMLInputElement;
const reserCount = $("reserCount") as HTMLInputElement;
const reserHour = $("reserHour") as HTMLInputElement;

const userId = JSON.parse(localStorage.getItem("user")!);

cardBtn?.forEach((vals) => {
  vals.addEventListener("click", (e) => {
    modalContainer!.style.display = "flex";
  });
});

modalSuccess?.addEventListener("click", (e) => {
  const isExistToken = findItem("token");

  if (!isExistToken) {
    showAlert("Debe iniciar sesion primero", "warning");
  } else {
    const data: IReservation = {
      date: new Date(reserDate.value),
      hour: reserHour.value,
      count: validNumber(reserCount.value),
      status: true,
      user: Number(userId.id),
    };

    reservationService(data)
      .then((res) => {
        if (Number(res.code) === 201) {
          showAlert("Reservacion creada!", "success");
          setTimeout(() => {
            window.location.replace("/");
          }, 4000);
        } else {
          showAlert("Algo ha salido mal", "danger");
        }
      })
      .catch((err) => console.log(err));
  }
});
