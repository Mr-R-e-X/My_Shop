// checking current user in local storage if not avl redirecting to the landing page
let currUser = JSON.parse(localStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";

// accessing do
const navCartItemCount = document.querySelector("#my-cart");
const productDiv = document.getElementById("product-div");
const cartSummery = document.getElementById("cart-summery");
// getting users data
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => (user.email = currUser.email));

// updating the ui
function updateUi(userCart) {
  // if user cart is empty then showing empty ui
  if (userCart.length === 0) {
    cartSummery.innerHTML = `
      <div class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <img src="../Assets/void.svg" class="mx-auto w-auto h-[70vh]" />
      </div>
    `;
    productDiv.innerHTML = "";
    return;
  }
  // reseting the ui
  cartSummery.innerHTML = "";
  productDiv.innerHTML = "";
  // calculating the total price
  let totalPrice = userCart.reduce(
    (sum, product) => sum + Math.floor(product.price * product.count * 80),
    0
  );
  // cart summery ui
  cartSummery.innerHTML += `
    <div class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400">
        <h2 class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200">
            Cart Summary
        </h2>
        <div class="py-2 border-b border-gray-200">
        ${userCart
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
        <div class="mt-4" onclick="proceedToCheckout()">
            <button
                class="w-full py-3 bg-indigo-600 text-white font-manrope font-bold text-lg rounded-lg transition-all duration-500 hover:bg-indigo-700">
                Proceed To Checkout
            </button>
        </div>
      </div>
  `;

  // product details ui
  productDiv.innerHTML += `
     <div class="grid grid-cols-1 lg:grid-cols-1 gap-2 mx-2">
    ${userCart
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
              <h6 class="font-medium bg-white w-max px-2 text-xl text-green-600 transition-all duration-300 transform hover:scale-110 absolute" style="top:2px; right:10px">&#8377;${Math.round(
                (product.price * 80 + product.price * 80 * 0.1) * product.count
              ).toFixed(2)}</h6>
              <div class="flex items-center justify-end gap-2">
            <button class="bg-red-300 rounded-full font-bold px-2 py-1 transition-all duration-300 transform hover:scale-110" onclick="updateProductCount(${index}, -1)"><img src="../Assets/minus_png.png" height="25px" width="25px" /></button>
            <p class="w-max px-2 py-1 text-base border border-gray-300 rounded-md transition-all duration-300 transform hover:scale-110"> Qty: ${
              product.count
            } </p>
                <button class="bg-green-300 rounded-full px-2 py-1 font-bold transition-all duration-300 transform hover:scale-110" onclick="updateProductCount(${index}, 1)"><img src="../Assets/plus_svg.svg" height="25px" width="25px"/></button>
                </div>
              <button class="bg-red-500 text-white py-1 px-2 rounded-full font-normal flex items-center transition-all duration-300 transform hover:bg-red-700 hover:scale-110" onclick="removeFromCart(${index})">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      `
      )
      .join("")}
  </div>
  `;
}
// remove from cart function
function removeFromCart(index) {
  areYouSureAlert(index); //showing sure alert
}
// removing item from cart
function remove(index) {
  let filteredUserCart = currUserFound.cart.filter(
    (item, idx) => idx !== index
  );
  // saving changed data
  currUserFound.cart = filteredUserCart;

  saveUserInLocalStorage(currUserFound);
  updateMyCartNavbarUi(currUserFound.cart);
  updateUi(currUserFound.cart);
}

// if user adding or decreasing the item increasing count function
function updateProductCount(index, quantity) {
  let product = currUserFound.cart[index];
  product.count += quantity;
  // if count 0
  if (product.count === 0) {
    removeFromCart(index);
  } else {
    currUserFound.cart[index] = product;
    saveUserInLocalStorage(currUserFound);
    updateMyCartNavbarUi(currUserFound.cart);
    updateUi(currUserFound.cart);
  }
}
// are you sure alert
function areYouSureAlert(index) {
  swal({
    title: "Remove from cart?",
    text: "Are you sure?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      remove(index); // after confirmation calling remove function
      swal("Success! 🛒 Item removed with ease!", {
        icon: "success",
      });
    }
  });
}

// saving in local storage
function saveUserInLocalStorage(user_data) {
  let index = users.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    users[index] = user_data;
  }
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user_data));
}
// proceed to checkout btn
function proceedToCheckout() {
  sessionStorage.setItem(
    "productForPayment",
    JSON.stringify(currUserFound.cart)
  );
  sessionStorage.setItem("fromCart", JSON.stringify(true));
  window.location.href = "../razorpay/index.html";
}

// updating nav cart ui
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

// calling required functions
document.addEventListener("DOMContentLoaded", () => {
  updateUi(currUserFound.cart);
  updateMyCartNavbarUi(currUserFound.cart);
});
