let productToPay = JSON.parse(sessionStorage.getItem("productForPayment"));
let orderSummery = document.querySelector("#order-summery");
let orderProduct = document.querySelector("#order-product");
const shippingInfoBtn = document.getElementById("shipping-info-btn");
const orderSumBtn = document.getElementById("order-sum-btn");
const addressDiv = document.getElementById("address-div");
const orderDetails = document.getElementById("Order-details");
const addressForm = document.getElementById("address-form");
const nameIp = document.getElementById("name");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const zip = document.getElementById("zip_postal");
const mobile = document.getElementById("mobile");
const deliveryInfo = document.getElementById("delivery-info");
const checkDefault = document.getElementById("setDefault");
const submitBtn = document.getElementById("submit");

let allusers = JSON.parse(localStorage.getItem("users"));

let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let currUserFound = allusers.find((user) => user.email === currUser.email);

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
            <div
              class="p-4 border border-gray-200 rounded-xl w-full group transition-all duration-500 hover:border-gray-400"
            >
              <h2
                class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200"
              >
                Order Summary
              </h2>
              ${filteredProducts
                .map(
                  (product) =>
                    `
                <div class="py-2 border-b border-gray-200">
                  <div class="flex items-center justify-between mb-2">
                  <p class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700 text-nowrap overflow-hidden text-ellipsis w-[50%]">
                      ${product.title}
                  </p>
                  <p class="font-medium text-base text-gray-900"> <span class="text-xs text-gray-400 font-semibold">X</span>${
                    product.count
                  }
                  <p class="font-medium text-base text-gray-900">&#8377;${(
                    product?.price * 80 +
                    product?.price * 80 * 0.01
                  ).toFixed(2)} </p>
                </div>
                `
                )
                .join("")}
                <div class="flex items-center justify-between gap-4 mb-5">
                  <p
                    class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700"
                  >
                    Shipping
                  </p>
                  <p class="font-medium text-base text-gray-600">${
                    totalPrice >= 300 ? "Free" : `&#8377; 51`
                  }</p>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <p
                    class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700"
                  >
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
                     ? `${totalPrice}`
                     : `${totalPrice === 0 ? "0" : `${totalPrice + 51}`}`
                 }
                </h5>
              </div>
               <div class="mt-4" onclick="proceedToPay(event,${totalPrice})">
      <button
        class="w-full py-3 bg-indigo-600 text-white font-manrope font-bold text-lg rounded-lg transition-all duration-500 hover:bg-indigo-700"
      >
        Proceed To Pay
      </button>
    </div>
            </div>
    `;
  orderProduct.innerHTML = `
        <h2
                class="font-manrope font-bold text-lg text-black pb-1 border-b border-gray-200"
              >
                Order Details
              </h2>
        <div class="grid grid-cols-1 gap-2">
        ${filteredProducts
          .map(
            (product) =>
              `
          <div
                class="rounded-xl p-2 bg-gray-100 border border-gray-100 flex flex-col md:flex-row items-center gap-1 transition-all duration-500 hover:border-gray-400"
              >
                <div class="">
                  <img
                    src="${product.image}"
                    alt="${product.title}"
                    class="order-detail-img mix-blend-multiply"
                  />
                </div>
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 w-full gap-1 md:gap-8"
                >
                  <div
                    class="flex items-center md:items-start flex-col justify-between"
                  >
                    <h2 class="font-medium text-base text-center sm:text-start text-black mb-1">
                      ${product.title}
                    </h2>
                  </div>
                  <div
                    class="flex items-center justify-evenly md:justify-between gap-8"
                  >
                    <div class="flex items-center gap-3">
                      <input
                        type="number"
                        class="w-14 h-10 px-2 py-1 text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value="${
                          product.count
                        }" max="10" min="0" onchange="updateProductCount(this, ${
                product.id
              })"
                      />
                    </div>
                    <h6 class="font-medium text-xl text-indigo-600">&#8377;${Math.floor(
                      product.price * product.count * 80
                    )}</h6>
                  </div>
                </div>
              </div>
          `
          )
          .join("")}
              
            </div>
            `;
}

orderDetailsUi(productToPay);

function updateProductCount(elem, id) {
  console.log(elem);
  console.log(id);
  let newCount = parseInt(elem.value);
  let index = productToPay.findIndex((product) => product.id === id);
  productToPay[index].count = newCount;
  console.log(productToPay[index]);
  orderDetailsUi(productToPay);
}

// document.getElementById("rzp-button1").onclick = function (e) {
//   var options = {
//     key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
//     amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//     currency: "USD",
//     name: "MyShop Checkout",
//     description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//     theme: {
//       color: "#0000FF",
//     },
//     image:
//       "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
//   };

//   var rzpy1 = new Razorpay(options);
//   rzpy1.open();
//   // clear mycart - localStorage
//   e.preventDefault();
// };

function proceedToPay(event, price) {
  if (
    nameIp.value !== "" &&
    address.value !== "" &&
    city.value !== "" &&
    state.value !== "" &&
    zip.value !== "" &&
    mobile.value !== ""
  ) {
    console.log("here");
    if (price < 50) {
      price = price + 20;
    }
    let options = {
      key: "rzp_test_PV1oQ0oMtgXOsq",
      amount: price * 100,
      currency: "INR",
      name: "MyShop Checkout",
      description: "This is your order",
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
      prefill: {
        email: "souvikhazra151@gmail.com",
        contact: +918001624449,
      },
      handler: function (response) {
        alert(response.razorpay_payment_id);
      },

      theme: {
        color: "#0000FF",
      },
    };
    let rzpy = new Razorpay(options);
    // console.log(rzpy.open());
    rzpy.open();
  } else {
    showAlert(
      "Error",
      "Please fill the Shipping Information before payment!",
      "error"
    );
  }

  // event.preventDefault();
}

function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const activeBtnClasses = [
    "bg-gray-600",
    "text-white",
    "transition",
    "duration-300",
    "transform",
    "hover:scale-105",
    "hover:shadow-lg",
    "focus:outline-none",
    "focus:ring-4",
    "focus:ring-gray-300",
    "animate-pulse",
  ];
  const inactiveBtnClasses = ["bg-white", "text-gray-400"];

  function setActiveButton(btn) {
    btn.classList.add(...activeBtnClasses);
    btn.classList.remove(...inactiveBtnClasses);
  }

  function setInactiveButton(btn) {
    btn.classList.remove(...activeBtnClasses);
    btn.classList.add(...inactiveBtnClasses);
  }

  shippingInfoBtn.addEventListener("click", () => {
    addressDiv.classList.remove("hidden");
    addressDiv.classList.add("w-full");
    orderDetails.classList.remove("w-full");
    orderDetails.classList.add("hidden");
    setActiveButton(shippingInfoBtn);
    setInactiveButton(orderSumBtn);
  });

  orderSumBtn.addEventListener("click", () => {
    orderDetails.classList.remove("hidden");
    orderDetails.classList.add("w-full");
    addressDiv.classList.remove("w-full");
    addressDiv.classList.add("hidden");
    setActiveButton(orderSumBtn);
    setInactiveButton(shippingInfoBtn);
  });

  function handleResize() {
    if (window.innerWidth >= 768) {
      addressDiv.classList.remove("hidden");
      addressDiv.classList.add("w-full");
      orderDetails.classList.remove("hidden");
      orderDetails.classList.add("w-full");
      setInactiveButton(shippingInfoBtn);
      setInactiveButton(orderSumBtn);
    } else {
      addressDiv.classList.remove("hidden");
      addressDiv.classList.add("w-full");
      orderDetails.classList.add("hidden");
      setActiveButton(shippingInfoBtn); // Set the initial active button on small screens
      setInactiveButton(orderSumBtn);
    }
  }

  handleResize();
  window.addEventListener("resize", handleResize);

  nameIp.value = `${currUserFound.firstName} ${currUserFound.lastName}`;

  addressForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const addressData = {
      name: nameIp.value,
      address: address.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      mobile: mobile.value,
      deliveryInfo: deliveryInfo.value,
      setDefault: checkDefault.checked,
    };
    console.log(addressData);
  });
});
