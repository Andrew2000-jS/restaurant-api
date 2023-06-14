import { $ } from "./conf";
import { findItem, removeItem } from "./localStorage";

const loginAncle = $("loginAncle");
const logoutAncle = $("logoutAncle");
const myAccount = $("myAccount");
const menuBtn = $("menuBtn");
const resNav = $("resNav");
const myAccountRes = $("myAccountRes");
const loginAncleRes = $("loginAncleRes");
const logoutAncleRes = $("logoutAncleRes");

const isExistToken = findItem("token");

let flag = false;

if (isExistToken) {
  loginAncleRes!.style.display = "none";
  loginAncle!.style.display = "none";
  logoutAncle!.style.display = "block";
  logoutAncleRes!.style.display = "block";
  myAccount!.style.display = "block";
  myAccountRes!.style.display = "block";
} else {
  loginAncle!.style.display = "block";
  loginAncleRes!.style.display = "block";
  logoutAncle!.style.display = "none";
  myAccount!.style.display = "none";
  myAccountRes!.style.display = "none";
  logoutAncleRes!.style.display = "none";
}

logoutAncle?.addEventListener("click", removeItems);
logoutAncleRes?.addEventListener("click", removeItems);

menuBtn?.addEventListener("click", (e) => {
  flag = !flag;

  if (flag) {
    resNav?.classList.toggle("show");
    resNav?.classList.remove("animate__fadeOutUp");
    resNav?.classList.add("animate__fadeIn");
  } else {
    resNav?.classList.remove("animate__fadeIn");
    resNav?.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      resNav?.classList.toggle("show");
    }, 1000);
  }
});

if (window.innerWidth < 820) {
  myAccount!.style.display = "none";
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth < 820) {
    myAccount!.style.display = "none";
  }
});

function removeItems(e: MouseEvent) {
  removeItem("token");
  removeItem("user");
  removeItem("order");
}
