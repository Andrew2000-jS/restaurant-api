import { $ } from "./conf";

const modalClose = $("modalClose");
const modalContainer = $("modalContainer") as HTMLElement;
const modalWrapper = $("modalWrapper") as HTMLElement;

modalClose?.addEventListener("click", closeModal);

modalContainer.addEventListener("click", closeModal);

modalWrapper.addEventListener("click", (e) => e.stopPropagation());

function closeModal(e: MouseEvent) {
  modalWrapper.classList.add("animate__fadeOutUp");

  setTimeout(() => {
    modalContainer!.style.display = "none";
    modalWrapper.classList.remove("animate__fadeOutUp");
  }, 500);
}
