// If user is not available in Session Storage redirecting the page to the Landing Page
const navCartItemCount = document.querySelector("#my-cart");
let orderDiv = document.getElementById("curr-item");
let orderDetailDiv = document.getElementById("curr-detail");

let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";

let order = JSON.parse(sessionStorage.getItem("order"));
console.log(order);

function updateOrderUi(order) {
  const date = new Date(order.timestamp);
  const localeDate = formatDate(date);
  orderDetailDiv.innerHTML = `
    <h1 class="text-3xl font-bold mb-6 text-center text-white">Thank you for your order</h1>
    <div class="space-y-4">
      <div class="border-b border-white pb-4">
        <p class="text-lg font-semibold text-white">Order Number</p>
        <p class="text-lg text-white">${order.timestamp}</p>
      </div>
      <div class="border-b border-white pb-4">
        <p class="text-lg font-semibold text-white">Payment Id</p>
        <p class="text-lg text-white">${order.paymentId}</p>
      </div>
      <div class="border-b border-white pb-4">
        <p class="text-lg font-semibold text-white">Order Date</p>
        <p class="text-lg text-white">${localeDate}</p>
      </div>
      <div class="pb-4">
        <p class="text-lg font-semibold text-white">Shipping Address</p>
        <p class="text-lg text-white">${order.shippingAdd}</p>
      </div>
    </div>
  `;
  orderDiv.innerHTML = `
    ${order.orderDetails
      .map((item) => {
        `

        `;
      })
      .join("")}
  `;
}

updateOrderUi(order);

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
function updateMyCartNavbarUi(cart) {
  let count = 0;
  cart.map((item) => {
    count += item.count;
  });
  if (count === 0) navCartItemCount.classList.add("hidden");
  else {
    navCartItemCount.classList.remove("hidden");
    navCartItemCount.innerText = count;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateMyCartNavbarUi(currUser.cart);
});
