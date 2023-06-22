import { $ } from "./conf";
import { findItem } from "./localStorage";
import { getOrdersService, getReservationService } from "../../services";

interface Orders {
  date: Date;
  total: number;
  orderlist: string;
}

interface Reservation {
    id: number;
    date: string;
    hour: string;
    count: number;
    status: boolean;
    idusers: number;
  }

const userName = $("userName");
const user = JSON.parse(localStorage.getItem("user")!);
const userOrderList = $("userOrderList");
const userReservationList = $('userReservationList')

const isExistToken = findItem("token");

if (!isExistToken) {
  window.location.replace("/");
}

userName!.textContent = `${user.name} ${user.lastname}`;

const renderOrders = (orders: Orders[]) => {
  userOrderList!.innerHTML = "";

  orders.forEach((order) => {
    const orderItem = document.createElement("div");
    const formattedDate = new Date(order.date).toLocaleDateString();
    const orderParser = JSON.parse(order.orderlist);
    const orderList = orderParser.map((x: any) => x.title);

    let html = `
      <div class="card">
      <div class="card-header">
        <h5>Fecha: ${formattedDate}</h5>
      </div>
      <div class="card-body">
        <h6>Total: ${order.total}</h6>
        <p>Lista de pedidos: ${orderList.join(", ")}</p>
      </div>
    </div>
      `;
      
    orderItem.classList.add('order-item')
    userOrderList!.innerHTML += html;
  });
};

const renderReservations = (reservations: Reservation[]) => {
    userReservationList!.innerHTML = "";
  
    reservations.forEach((re) => {
      const reservation = document.createElement("div");
      const formattedDate = new Date(re.date).toLocaleDateString();
  
      let html = `
        <div class="card">
        <div class="card-header">
          <h5>Fecha y hora: ${formattedDate} - ${re.hour}</h5>
        </div>
        <div class="card-body">
          <h6>Estado: ${re.status}</h6>
        </div>
      </div>
    `;
        
      reservation.classList.add('order-item')
      userReservationList!.innerHTML += html;
    });
  };

getOrdersService().then((res) => {
  const userOrders = res.filter(
    (o: any) => Number(o.idusers) === Number(user.id)
  );
  renderOrders(userOrders);
});


getReservationService().then((res) => {
    renderReservations(res);
  });