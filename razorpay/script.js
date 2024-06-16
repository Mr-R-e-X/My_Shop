// getting Dom elements
const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");
const navCartItemCount = document.querySelector("#my-cart");
const navLogout = document.querySelector("#nav-logout");
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
  const filteredProducts = products.filter((product) => product.count > 0);

  if (filteredProducts.length === 0) {
    // Hide the order summary section or display a message if there are no products
    orderSummery.innerHTML = `
      <div class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">
          Order Summary
        </h2>
        <p class="font-normal text-base text-gray-400">No products in the order.</p>
      </div>
    `;
    orderProduct.innerHTML = `
      <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">
        Order Details
      </h2>
      <p class="font-normal text-base text-gray-400">No products to display.</p>
    `;
    return;
  }

  let totalPrice = filteredProducts.reduce(
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
        ${filteredProducts
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
       <div class="grid grid-cols-1 gap-2 ">
        ${filteredProducts
          .map(
            (product) =>
              `
        <div
            class="rounded-xl p-2 bg-gray-100 border border-gray-100 flex flex-col md:flex-row items-center gap-1 transition-all duration-500 hover:border-gray-400">
            <div class="">
                <img src="${product.image}" alt="${
                product.title
              }" class="order-detail-img mix-blend-multiply" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 w-full gap-1 md:gap-8">
                <div class="flex items-center md:items-start flex-col justify-between">
                    <h2 class="font-medium text-base text-center sm:text-start text-black mb-1">
                        ${product.title}
                    </h2>
                    <div class="flex items-center">
                    ${
                      product.color
                        ? `<button class="w-6 h-6 border border-gray-800 rounded-full mx-2 mr-2 transition-all duration-300" style="background-color: ${product.color};" data-val-color="${product.color}"></button>`
                        : ""
                    }
                        ${
                          product.size
                            ? ` <button class="bg-gray-300 text-gray-700 text-base py-1 px-3 rounded-full font-semibold mr-2 mx-2 hover:bg-gray-400 transition-all duration-300">${product.size}</button>`
                            : ""
                        }
                        </div>
                </div>
                <div class="flex items-center justify-evenly md:justify-between gap-8">
                    <div class="flex items-center gap-3">
                        <input type="number"
                            class="w-14 h-10 px-2 py-1 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value="${
                              product.count
                            }" max="10" min="0" onchange="updateProductCount(this, ${
                product.id
              })" />
                    </div>
                    <h6 class="font-medium text-xl text-indigo-600">&#8377;${Math.round(
                      (product?.price * 80 + product?.price * 80 * 0.1) *
                        product?.count
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
  // document
  //   .getElementById("change-address")
  //   .addEventListener("click", changeAddress);
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
function updateProductCount(elem, id) {
  console.log(elem);
  console.log(id);
  let newCount = parseInt(elem.value);
  let index = productToPay.findIndex((product) => product.id === id);
  productToPay[index].count = newCount;
  // console.log(productToPay[index]);
  orderDetailsUi(productToPay);
}
// saving curr user in the users and saving in local storage
function saveUserInLocalStorage(user_data) {
  let index = allusers.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    allusers[index] = user_data;
    // console.log(allusers[index]);
  }
  localStorage.setItem("users", JSON.stringify(allusers));
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
        alert(response.razorpay_payment_id);
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

// NAVBAR CONTROL

// GETTING AUTH VALUE
let landingPageAuthVal = sessionStorage.getItem("landingPageAuthVal")
  ? JSON.parse(sessionStorage.getItem("landingPageAuthVal"))
  : "";

// SENDING AUTH VALUE TO AUTHENTICATION PAGE TO SHOW DATA DRIVEN UI
function sendingPageAuthVal(val) {
  landingPageAuthVal = val;
  sessionStorage.setItem(
    "landingPageAuthVal",
    JSON.stringify(landingPageAuthVal)
  );
  window.location.href = "../Authentication/sign-in-up.html";
}
// NAVBAR BTNS CONTROL

function checkLoggedIn() {
  return currUser !== null;
}
// checking if user is available in the sessions storage and updating the ui
if (!checkLoggedIn()) {
  navProfile.classList.add("hidden");
} else {
  navProfile.classList.remove("hidden");
}
if (!checkLoggedIn()) {
  navHome.classList.add("hidden");
} else {
  navHome.classList.remove("hidden");
}
if (!checkLoggedIn()) {
  navMyCart.classList.add("hidden");
} else {
  navMyCart.classList.remove("hidden");
}
if (checkLoggedIn()) {
  navSignin.classList.add("hidden");
  navSignUp.classList.add("hidden");
}
navSignUp.addEventListener("click", () => {
  sendingPageAuthVal("signup");
});
navSignin.addEventListener("click", () => {
  sendingPageAuthVal("login");
});

navLogo.addEventListener("click", () => {
  if (checkLoggedIn()) {
    window.location.href = "../shop/index.html";
  } else {
    sendingPageAuthVal("login");
  }
});
navHome.addEventListener("click", () => {
  if (checkLoggedIn) {
    window.location.href = "../shop/index.html";
  } else {
    sendingPageAuthVal("login");
  }
});

navProfile.addEventListener("click", () => {
  if (checkLoggedIn()) {
    window.location.href = "../profile/index.html";
  } else {
    sendingPageAuthVal("login");
  }
});

navMyCart.addEventListener("click", () => {
  if (checkLoggedIn()) {
    window.location.href = "../cart/index.html";
  } else {
    sendingPageAuthVal("login");
  }
});

navProfile.addEventListener("click", () => {
  if (checkLoggedIn()) {
    window.location.href = "../profile/index.html";
  } else {
    sendingPageAuthVal("login");
  }
});

navLogout.addEventListener("click", () => {
  sessionStorage.removeItem("currentUser");
  window.location.href = "../index.html";
});

// calling required functions after dom content loaded
document.addEventListener("DOMContentLoaded", () => {
  orderDetailsUi(productToPay);
  updateMyCartNavbarUi(currUserFound.cart);
});
