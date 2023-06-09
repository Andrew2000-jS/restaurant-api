import { $, $A } from "./conf";
import { addItem, findItem } from "./localStorage";
import { orderNewService } from "../../services";
import { showAlert } from "./showAlert";

interface IOrder {
  id: number;
  title: string;
  body?: string;
}

const addOrderBtn = $A("#addOrderBtn") as NodeListOf<HTMLElement>;
const orderList = $("orderList");
const orderBtn = $("orderBtn");

const arr: IOrder[] = [];
const userId = JSON.parse(localStorage.getItem("user")!);

addOrderBtn.forEach((vals) => {
  vals.addEventListener("click", (e) => {
    const container = vals.closest(".link-card");
    const dataId = container?.getAttribute("data-id");
    const title = container!.querySelector("h2")!.innerText;
    const body = container?.querySelector("p")?.innerText;

    let dataOrder: IOrder = {
      id: Number(dataId),
      title,
      body,
    };

    arr.push(dataOrder);
    addHtml(dataOrder);
    addItem(arr, "order");
  });
});

orderBtn?.addEventListener("click", (e) => {
  const isExistOrders = findItem("order");
  if (!isExistOrders) {
    console.log("Empty");
  }

  const isExistToken = findItem("token");

  if (!isExistToken) {
    showAlert("Debe iniciar sesion primero", "warning");
  } else {
    const orders = localStorage.getItem("order");
    const data = {
      total: 10,
      date: new Date(),
      idUsers: Number(userId.id),
      expired: false,
      orders,
    };

    orderNewService(data)
      .then((res) => {
        if (Number(res.code) === 201) {
          showAlert("Compra existosa", "success");
          setTimeout(() => {
            window.location.replace("/");
          }, 4000);
        } else {
          showAlert("Algo ha salido mal", "danger");
          console.log(res);
        }
      })
      .catch((err) => console.error(err));
  }
});

function addHtml({ id, title, body }: IOrder): void {
  let html = `
        <section class="o-card" id="${id}">
            <header>
                <h4>${title}</h4>
            </header>
            <div>
                ${body}
            </div>
        </section>
    `;

  orderList!.innerHTML += html;
}
