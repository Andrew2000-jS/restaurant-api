import { $ } from "./conf";
import { findItem, removeItem } from "./localStorage";

const loginAncle = $("loginAncle");
const logoutAncle = $("logoutAncle");
const myAccount = $('myAccount');
const menuBtn = $('menuBtn');
const resNav = $('resNav')

const isExistToken = findItem('token');

if (isExistToken) {
  loginAncle!.style.display = "none";
  logoutAncle!.style.display = "block";
  myAccount!.style.display = 'block';
} else {
  loginAncle!.style.display = "block";
  logoutAncle!.style.display = "none";
  myAccount!.style.display = 'none';

}

logoutAncle?.addEventListener("click", (e) => {
  removeItem('token');
  removeItem('user');
});

menuBtn?.addEventListener('click', (e) => {
  resNav?.classList.toggle('show')
})