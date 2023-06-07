import { $ } from "./conf";
import { findItem, removeItem } from "./localStorage";

const loginAncle = $("loginAncle");
const logoutAncle = $("logoutAncle");

export function showSession() {
  const isExistToken = findItem();

  if (isExistToken) {
    loginAncle!.style.display = 'none';
    logoutAncle!.style.display = 'block';
  } else {
    loginAncle!.style.display = 'block';
    logoutAncle!.style.display = 'none';
  }
}

export const closeSession = () => {
    logoutAncle?.addEventListener("click", (e) => {
    removeItem();
  });
};
