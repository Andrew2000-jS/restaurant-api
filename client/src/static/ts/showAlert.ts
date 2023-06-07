import { $ } from "./conf";

const alertMessage = $("alertMessage") as HTMLInputElement;
const alertContainer = $("alertContainer") as HTMLInputElement;

export const showAlert = (message: string, type: string) => {
  if (type === 'warning') {
    alertContainer.style.border = '1px solid #FFE569';
    alertContainer.style.background = '#FFE569'
    alertMessage.style.color = '#fff';
  }

  if (type === 'danger') {
    alertContainer.style.border = '1px solid #ea906c';
    alertContainer.style.background = '#ea906c';
    alertMessage.style.color = '#fff';
  }

  if (type === 'success') {
    alertContainer.style.border = '1px solid #54B435';
    alertContainer.style.background = '#54B435';
    alertMessage.style.color = '#fff';
  }

  alertMessage.style.display = "block";
  alertContainer.style.display = "block";
  alertMessage.textContent = message;

  setTimeout(() => {
    alertContainer.style.display = "none";
    alertMessage.style.display = "none";
  }, 5000);
};