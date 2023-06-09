import { $ } from "./conf";

const modalClose = $("modalClose");
const modalContainer = $("modalContainer") as HTMLElement;
const modalWrapper = $("modalWrapper") as HTMLElement;

modalClose?.addEventListener("click", (e) => {
  modalContainer!.style.display = "none";
});

modalContainer.addEventListener("click", (e) => {
  modalContainer!.style.display = "none";
});

modalWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
});
