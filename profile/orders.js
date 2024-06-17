// If user is not available in Session Storage redirecting the page to the Landing Page
const navCartItemCount = document.querySelector("#my-cart");
let orderDiv = document.getElementById("curr-item");
let orderDetailDiv = document.getElementById("curr-detail");
let orderSummeryDiv = document.getElementById("curr-summery");
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => user.email === currUser.email);
let order = JSON.parse(sessionStorage.getItem("order"));
console.log(order);

function updateOrderUi(order) {
  updateDelivaryStatus(order);
  const date = new Date(order.timestamp);
  const localeDate = formatDate(date, 0);
  const localDelivaryDate = formatDate(date, 1);
  let totalPrice = order.orderDetails.reduce(
    (sum, product) => sum + Math.floor(product.price * product.count * 80),
    0
  );

  orderDetailDiv.innerHTML = `
    <h1 class="text-3xl font-semibold mb-6 text-center text-black">Thank you for your order.</h1>
    <div class="space-y-4">
      <div class="border-b border-white pb-4">
        <p class="text-base font-semibold text-black">Order Number : <span class="text-lg text-green-600">${
          order.timestamp
        }</span></p>
      </div>
      <div class="border-b border-white pb-4">
        <p class="text-base font-semibold text-black">Payment Id : <span class="text-lg text-green-600">${
          order.paymentId
        }</span></p>
      </div>
      <div class="border-b border-white pb-4">
        <p class="text-base font-semibold text-black">Order Date : <span class="text-lg">${localeDate}</span></p>
      </div>  
      <div class="border-b border-white pb-4">
        <p class="text-base font-semibold text-black">Order Status : <span class="text-lg ${
          order.status === "canceled" ? `text-red-600` : `text-green-600`
        } capitalize">${order.status}</span></p>
      </div>
      ${
        order.status === "confirmed"
          ? `<div class="border-b border-white pb-4">
        <p class="text-base font-semibold text-black">Order Status : <span class="text-lg capitalize ${
          order.shippingStatus === "pending"
            ? "text-orange-500"
            : "text-green-600"
        }"> ${
              order.shippingStatus === "pending"
                ? `In Transit You will receive the delivery on ${localDelivaryDate}`
                : order.shippingStatus === "success"
                ? `Delivered on ${localDelivaryDate}`
                : ""
            } </span></p>
      </div>`
          : ""
      }
      
    </div>
  `;
  orderDiv.innerHTML = `
   <h1 class="text-xl font-semibold mb-6 text-center text-black">Order Details</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    ${order.orderDetails
      .map(
        (product, index) => `
                <div class="rounded-xl p-2 bg-gray-100 border border-gray-100 flex flex-col sm:flex-row items-center gap-1 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-2">
          <div class="">
            <img src="${product.image}" alt="${
          product.title
        }" class="order-detail-img mix-blend-multiply" />
          </div>
          <div class="grid grid-cols-1 w-full gap-1 sm:gap-8">
            <div class="flex items-center sm:items-start flex-col justify-between">
              <h2 class="font-medium text-base text-center sm:text-start text-black mb-1">
                ${product.title}
              </h2>
              <div class="flex items-center">
                ${
                  product.color
                    ? `<button class="w-6 h-6 border border-gray-800 rounded-full mx-2 mr-2 transition-all duration-300 transform hover:scale-110" style="background-color: ${product.color};" data-val-color="${product.color}"></button>`
                    : ""
                }
                ${
                  product.size
                    ? `<button class="bg-gray-300 text-gray-700 text-base py-1 px-3 rounded-full font-semibold mr-2 mx-2 transition-all duration-300 transform hover:scale-110">${product.size}</button>`
                    : ""
                }
              </div>
            </div>
            <div class="flex items-center justify-evenly sm:justify-between gap-8">
              <h6 class="font-medium bg-gray-200 w-max px-2 text-lg text-green-600 transition-all duration-300 transform hover:scale-110 absolute" style="top:2px; left:5px">&#8377;${Math.round(
                (product.price * 80 + product.price * 80 * 0.1) * product.count
              ).toFixed(2)}</h6>
              <div class="flex items-center justify-end gap-2">
            <p class="w-max px-2 py-1 text-base border border-gray-300 rounded-md transition-all duration-300 transform hover:scale-110"> Qty: ${
              product.count
            } </p>
                </div>
              <button class="rounded-full font-normal flex items-center transition-all duration-300 transform hover:bg-green-700 hover:scale-110" onclick="removeFromCart(${index})">
                <img src="../Assets/confirmed.svg" height="30px" width="30px" title="Order Confirmed" />
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("")}
  </div>
`;

  orderSummeryDiv.innerHTML = `
  <div class="p-4 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200 text-center">
            Order Summary
        </h2>
        <div class="py-2 border-b border-gray-200">
        ${order.orderDetails
          .map(
            (product) =>
              `
            <div class="flex items-center justify-between mb-2">
                <p
                    class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700 text-nowrap overflow-hidden text-ellipsis w-[50%]">
                    ${product.title}
                </p>
                <p class="font-medium text-base text-gray-900"> <span
                        class="text-xs text-gray-400 font-semibold">X</span>${
                          product.count
                        }
                <p class="font-medium text-base text-gray-900">&#8377;${Math.round(
                  (product?.price * 80 + product?.price * 80 * 0.1) *
                    product?.count
                ).toFixed(2)} </p>
            </div>
            `
          )
          .join("")}
            <div class="flex items-center justify-between gap-4 mb-5">
                <p class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Shipping
                </p>
                <p class="font-medium text-base text-gray-600">${
                  totalPrice >= 300 ? "Free" : `&#8377; 51`
                }</p>
            </div>
            <div class="flex items-center justify-between gap-4">
                <p class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700">
                    Coupon Code
                </p>
                <p class="font-medium text-base text-emerald-500">#APPLIED 10% OFF</p>
            </div>
        </div>
        <div class="total flex items-center justify-between pt-1 pb-3">
            <p class="text-xl font-bold text-black">Subtotal</p>
            <h5 class="font-manrope font-bold text-xl text-indigo-600">
                &#8377;${
                  totalPrice >= 300
                    ? `${totalPrice.toFixed(2)}`
                    : `${
                        totalPrice === 0
                          ? "0"
                          : `${(totalPrice + 51).toFixed(2)}`
                      }`
                }
            </h5>
        </div>
          <div class="border-b border-t pt-5 border-gray-500 pb-4">
          <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200 text-center">
            Shipping Address
        </h2>
          <p class="font-semibold text-gray-700 text-lg">${
            order.shippingAdd
          }</p>
        </div>
        ${
          order.shippingStatus === "pending" && order.status !== "canceled"
            ? `
          <div class="mt-4" onclick="cancelOrder(event,${order.timestamp})">
            <button
                class="w-full py-3 bg-red-500 text-white font-manrope font-bold text-lg rounded-lg transition-all duration-500 hover:bg-red-700">
                Cancel Order
            </button>
        </div>
        `
            : ""
        }
      </div>
  `;
}
function cancelOrder(event, orderId) {
  event.preventDefault();
  areYouSureAlert(orderId);
}

updateOrderUi(order);

function formatDate(date, val) {
  const day = String(date.getDate() + val).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
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

function updateDelivaryStatus(order) {
  let currentTime = Date.now();
  const orderTime = order.timestamp;
  const oneDayInMS = 24 * 60 * 60 * 1000;
  const timeDifference = currentTime - orderTime;
  if (timeDifference >= oneDayInMS) {
    order.shippingStatus = "success";
  } else {
    canceled;
    order.shippingStatus = "pending";
  }
  let orderIndex = currUserFound.orders.findIndex(
    (order) => order.timestamp === orderID
  );
  if (orderIndex !== -1) {
    currUserFound.orders[orderIndex].shippingStatus = order.shippingStatus;
  }
  saveInSession("order", order);
  saveUserInLocalStorage(currUserFound);
  saveInSession("currentUser", currUserFound);
  updateOrderUi(order);
}

function cancelAfterConfimation(orderID) {
  let orderIndex = currUserFound.orders.findIndex(
    (order) => order.timestamp === orderID
  );
  if (orderIndex !== -1) {
    let updateOrder = currUserFound.orders[orderIndex];
    updateOrder.status = "canceled";
    currUserFound.orders[orderIndex] = updateOrder;
  }
  order.status = "canceled";
  saveUserInLocalStorage(currUserFound);
  saveInSession("currentUser", currUserFound);
  saveInSession("order", order);
  updateOrderUi(order);
}

function saveUserInLocalStorage(user_data) {
  let index = users.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    users[index] = user_data;
  }
  localStorage.setItem("users", JSON.stringify(users));
}
function saveInSession(storeName, data) {
  sessionStorage.setItem(storeName, JSON.stringify(data));
}

function areYouSureAlert(orderID) {
  swal({
    title: "Think twice",
    text: "These are must-haves!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      cancelAfterConfimation(orderID);
      swal({
        title: "Order successfully bid farewell. 🛍️",
        text: "",
        icon: "success",
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateMyCartNavbarUi(currUser.cart);
});
