// getting Dom elements

const navCartItemCount = document.querySelector("#my-cart");
const orderSummery = document.querySelector("#order-summery");
const orderProduct = document.querySelector("#order-product");
const shippingInfoBtn = document.getElementById("shipping-info-btn");
const orderSumBtn = document.getElementById("order-sum-btn");
const addressDiv = document.getElementById("address-div");
const orderDetails = document.getElementById("Order-details");

// Checking User
let allusers = JSON.parse(localStorage.getItem("users"));
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
// If user is not available in Session Storage redirecting the page to the Landing Page
if (currUser === null) window.location.href = "../index.html";
let currUserFound = allusers.find((user) => user.email === currUser.email);
// taking product from session storage if  user directly using "buy now btn"
let productToPay = JSON.parse(sessionStorage.getItem("productForPayment"));
// Updating Orders in the UI
function orderDetailsUi(products) {
  // console.log(products);

  if (products.length === 0) {
    // Hide the order summary section or display a message if there are no products
    orderSummery.innerHTML = `
      <div class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">
          Order Summary
        </h2>
        <img src="../Assets/empty.svg" />
      </div>
    `;
    orderProduct.innerHTML = "";
    return;
  }

  let totalPrice = products.reduce(
    (sum, product) => sum + Math.floor(product.price * product.count * 80),
    0
  );
  console.log(totalPrice);
  orderSummery.innerHTML = `
      <div class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">
            Order Summary
        </h2>
        <div class="py-2 border-b border-gray-200">
        ${products
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
        <div class="total flex items-center justify-between pt-1">
            <p class="font-normal text-lg text-black">Subtotal</p>
            <h5 class="font-manrope font-bold text-base text-indigo-600">
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
        <div class="mt-4" onclick="proceedToPay(event,${totalPrice})">
            <button
                class="w-full py-3 bg-indigo-600 text-white font-manrope font-bold text-lg rounded-lg transition-all duration-500 hover:bg-indigo-700">
                Proceed To Pay
            </button>
        </div>
        <div class="mt-6 p-4 border border-gray-200 rounded-xl w-full transition-all duration-500">
            <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">Shipping Details</h2>
            <div id="address-display" class="hidden">
                <p id="address-text" class="p-2 border border-gray-300 rounded-md mt-2"></p>
                <div class="flex justify-end mt-2">
                    <button id="edit-address"
                        class="py-2 px-4 bg-yellow-500 text-white font-bold rounded-lg transition-all duration-500 hover:bg-yellow-600">Edit</button>
                </div>
            </div>
            <textarea id="address" class="w-full p-2 border border-gray-300 rounded-md mt-2 hidden" rows="4"
                placeholder="Enter your shipping address"></textarea>
            <div id="save-cancel-buttons" class="flex justify-end mt-2 hidden">
                <button id="cancel"
                    class="py-2 px-4 text-base bg-gray-500 text-white font-semibold rounded-lg transition-all duration-500 hover:bg-gray-600">Cancel</button>
                <button id="save-address"
                    class="ml-2 py-2 px-4 text-base bg-green-600 text-white font-semibold rounded-lg transition-all duration-500 hover:bg-green-700">Save</button>
            </div>
      </div>
    `;
  orderProduct.innerHTML = `
       <div class="grid grid-cols-1 lg:grid-cols-1 gap-2 mx-2">
        ${products
          .map(
            (product, index) =>
              `
        <div class="rounded-xl p-2 bg-gray-100 border border-gray-400 flex flex-col sm:flex-row items-center gap-1 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-2">
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
            <div class="flex items-center justify-evenly sm:justify-end gap-8">
            <div class="flex items-center justify-end gap-2">
            <button class="bg-red-300 rounded-full font-bold px-2 py-1 transition-all duration-300 transform hover:scale-110" onclick="updateProductCount(${index}, -1)"><img src="../Assets/minus_png.png" height="25px" width="25px" /></button>
            <p class="w-max px-2 py-1 text-base border border-gray-300 rounded-md transition-all duration-300 transform hover:scale-110"> Qty: ${
              product.count
            } </p>
                <button class="bg-green-300 rounded-full px-2 py-1 font-bold transition-all duration-300 transform hover:scale-110" onclick="updateProductCount(${index}, 1)"><img src="../Assets/plus_svg.svg" height="25px" width="25px"/></button>
                </div>
                <h6 class="font-medium rounded-md bg-white w-max px-2 text-xl text-green-600 transition-all duration-300 transform hover:scale-110 absolute" style="top:2px; right:10px">&#8377;${Math.round(
                  (product.price * 80 + product.price * 80 * 0.1) *
                    product.count
                ).toFixed(2)}</h6>
              
            </div>
          </div>
        </div>
      `
          )
          .join("")}
  </div>
    `;

  loadAddress();
  document
    .getElementById("save-address")
    .addEventListener("click", saveAddress);
  document
    .getElementById("edit-address")
    .addEventListener("click", editAddress);
  document.getElementById("cancel").addEventListener("click", cancelAction);
}

// Load previous payment address
function loadAddress() {
  let defaultAddress = currUserFound.address;
  if (defaultAddress.length !== "" || defaultAddress !== undefined) {
    const formattedAddress = formatAddress(defaultAddress);
    document.getElementById("address-text").textContent = formattedAddress;
    document.getElementById("address-display").classList.remove("hidden");
    document.getElementById("address").classList.add("hidden");
  } else {
    document.getElementById("address-display").classList.add("hidden");
    document.getElementById("address").classList.remove("hidden");
    document.getElementById("save-cancel-buttons").classList.remove("hidden");
  }
}

// save the current address in localStorage
function saveAddress() {
  const addressInput = document.getElementById("address").value.trim();
  const addressRegex = /^(.+),\s(.+),\s(.+),\sPIN-(\d{6}),\sMobile-(\d{10})$/;
  if (!addressRegex.test(addressInput)) {
    showAlert(
      "Please enter the address in the correct format",
      '"Full Name, Address Line(Separated by space), State, PIN-123456, Mobile-1234567890"',
      "error"
    );
    return;
  }
  const [, fullName, address, state, zip, mobile] =
    addressInput.match(addressRegex);
  const inputAddress = `${fullName.trim()}, ${address.trim()}, ${state.trim()}, PIN-${zip.trim()}, Mobile-${mobile.trim()}`;
  const formattedAddress = formatAddress(inputAddress);

  // console.log(typeof formattedAddress);
  currUserFound.address = inputAddress;
  // console.log(currUserFound);
  saveUserInLocalStorage(currUserFound);
  document.getElementById("address-text").textContent = formattedAddress;
  document.getElementById("address-display").classList.remove("hidden");
  document.getElementById("address").classList.add("hidden");
  document.getElementById("save-cancel-buttons").classList.add("hidden");
}
// edit the address
function editAddress() {
  const address = currUserFound.address;
  document.getElementById("address").value = address;
  document.getElementById("address").classList.remove("hidden");
  document.getElementById("save-cancel-buttons").classList.remove("hidden");
  document.getElementById("address-display").classList.add("hidden");
}

// cancel editing the address
function cancelAction() {
  document.getElementById("save-cancel-buttons").classList.add("hidden");
  loadAddress();
}
// updating the product count
function updateProductCount(index, quantity) {
  let product = productToPay[index];
  product.count += quantity;
  if (product.count === 0) {
    areYouSureAlert(index);
  } else {
    productToPay[index] = product;
    saveInSession("productForPayment", productToPay);
    orderDetailsUi(productToPay);
  }
}
function remove(index) {
  productToPay = productToPay.filter((item, idx) => idx !== index);

  saveInSession("productForPayment", productToPay);
  orderDetailsUi(productToPay);
}
function areYouSureAlert(index) {
  swal({
    title: "Think twice",
    text: "These are must-haves!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      remove(index);
      swal({
        title: "Item successfully bid farewell. 🛍️",
        text: "",
        icon: "success",
      });
    }
  });
}
// saving curr user in the users and saving in local storage
function saveUserInLocalStorage(user_data) {
  let index = allusers.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    allusers[index] = user_data;
  }
  localStorage.setItem("users", JSON.stringify(allusers));
}
function saveInSession(storeName, data) {
  sessionStorage.setItem(storeName, JSON.stringify(data));
}
// formating the address showing it in better way in the ui
function formatAddress(addressInput) {
  const addressRegex = /^(.+),\s(.+),\s(.+),\sPIN-(\d{6}),\sMobile-(\d{10})$/;
  const matchResult = addressInput.match(addressRegex);
  if (!matchResult) {
    return "";
  }
  const [, fullName, address, state, zip, mobile] = matchResult;
  const formattedAddress = `Full Name: ${fullName.trim()}, Address: ${address.trim()}, State: ${state.trim()}, PIN: ${zip.trim()}, Mobile: ${mobile.trim()}`;
  return formattedAddress;
}

// Razor pay function for proceed to pay
function proceedToPay(event, price) {
  if (currUserFound.address !== "") {
    console.log("here");
    if (price < 50) {
      price = price + 20;
    }
    let options = {
      key: "rzp_test_PV1oQ0oMtgXOsq",
      amount: price * 100,
      currency: "INR",
      name: "MyShop",
      description: "This is your order",
      image: "https://cdn-icons-png.flaticon.com/128/14654/14654310.png",
      config: {
        display: {
          blocks: {
            banks: {
              name: "All payment methods",
              instruments: [
                {
                  method: "upi",
                },
                {
                  method: "card",
                },
                {
                  method: "wallet",
                },
                {
                  method: "netbanking",
                },
              ],
            },
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: function (response) {
        paymentSuccess(response.razorpay_payment_id);
      },

      theme: {
        color: "#0000FF",
      },
    };
    let rzpy = new Razorpay(options);
    rzpy.open();
  } else {
    showAlert(
      "Error",
      "Please fill the Shipping Information before payment!",
      "error"
    );
  }
}
function paymentSuccess(paymentId) {
  let isFromCart = sessionStorage.getItem("fromCart");
  console.log(isFromCart);
  let delAddress = formatAddress(currUserFound.address);
  let order = {
    paymentId: paymentId,
    shippingAdd: delAddress,
    orderDetails: productToPay,
    timestamp: Date.now(),
  };
  console.log(productToPay);
  if (!currUserFound.orders) {
    currUserFound.orders = [];
  }
  if (isFromCart) {
    removeFromCartAfterPayment(productToPay, currUserFound.cart);
  }
  productToPay = [];
  currUserFound.orders.push(order);
  saveInSession("productForPayment", productToPay);
  saveInSession("order", order);
  saveInSession("currentUser", currUserFound);
  saveUserInLocalStorage(currUserFound);
  thanqPageUI(order);
}

function removeFromCartAfterPayment(order, cart) {
  let updatedCart = cart.filter((cartItem) => {
    let keepItem = true;

    order.forEach((orderItem) => {
      const isClothing =
        cartItem.category === "men's clothing" ||
        cartItem.category === "women's clothing";

      const isSameItem = isClothing
        ? cartItem.id === orderItem.id &&
          cartItem.title === orderItem.title &&
          cartItem.color === orderItem.color &&
          cartItem.size === orderItem.size
        : cartItem.id === orderItem.id;

      if (isSameItem) {
        if (cartItem.count > orderItem.count) {
          cartItem.count -= orderItem.count;
        } else {
          keepItem = false;
        }
      }
    });

    return keepItem;
  });

  currUserFound.cart = updatedCart;
  updateMyCartNavbarUi(currUserFound.cart);
}

function thanqPageUI(order) {
  const thnqSection = document.getElementById("thankyou-page");
  const mainSec = document.querySelector("main");
  mainSec.classList.add("hidden");
  thnqSection.innerHTML = `
    <div class="bg-transparent h-screen">
      <div class="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div class="text-center">
            <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
            <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
            <p>Your Order Id is ${order.timestamp}</p>
            <p> Have a great day!  </p>
            <div class="py-10 text-center flex items-center justify-center">
                <p class="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 mx-3 cursor-pointer" onclick="pageAfterPayControl(this)">
                    GO BACK 
               </p>
               <p class="px-12 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 mx-3 cursor-pointer" onclick="pageAfterPayControl(this)">
                    VIEW ORDER
               </p>
            </div>
        </div>
    </div>
  </div>
  `;
}

function pageAfterPayControl(elem) {
  let innerText = elem.innerText;
  console.log(innerText);
  if (innerText === "GO BACK") window.location.href = "../shop/index.html";
  if (innerText === "VIEW ORDER") {
    window.location.href = "../profile/orders.html";
  }
}

// showing alert
function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
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

// calling required functions after dom content loaded
document.addEventListener("DOMContentLoaded", () => {
  orderDetailsUi(productToPay);
  updateMyCartNavbarUi(currUserFound.cart);
});
