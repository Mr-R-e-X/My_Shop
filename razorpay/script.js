let productToPay = JSON.parse(sessionStorage.getItem("productForPayment"));
let orderSummery = document.querySelector("#order-summery");
let orderProduct = document.querySelector("#order-product");

function orderDetails(products) {
  console.log(products);
  let totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.count,
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
              ${productToPay
                .map(
                  (product) =>
                    `
                <div class="py-2 border-b border-gray-200">
                  <div class="flex items-center justify-between mb-2">
                  <p class="font-normal text-base text-gray-400 transition-all duration-500 group-hover:text-gray-700 text-nowrap overflow-hidden text-ellipsis w-[50%]">
                      ${product.title}
                  </p>
                  <p class="font-medium text-base text-gray-900"> <span class="bg-white text-center px-2 pb-1 mr-1 rounded-full cursor-pointer">&plus;</span>&nbsp;${
                    product.count
                  } <span class="bg-white px-2 pb-1 rounded-full ml-1 cursor-pointer">&minus;</span> </p>
                  <p class="font-medium text-base text-gray-900">$${(
                    product?.price +
                    product?.price * 0.01
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
                    totalPrice >= 50 ? "Free" : "$20"
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
                  $${totalPrice >= 50 ? `${totalPrice}` : `${totalPrice + 20}`}
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
        ${products
          .map(
            (product) =>
              `
          <div
                class="rounded-xl p-2 bg-gray-100 border border-gray-100 flex flex-col sm:flex-row items-center gap-1 transition-all duration-500 hover:border-gray-400"
              >
                <div class="">
                  <img
                    src="${product.image}"
                    alt="${product.title}"
                    height="150px"
                    width="200px"
                    class="object-contain sm:w-[122px] mix-blend-multiply"
                  />
                </div>
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 w-full gap-1 md:gap-8"
                >
                  <div
                    class="flex items-center sm:items-start flex-col justify-between"
                  >
                    <h2 class="font-medium text-base text-center sm:text-start text-black mb-1">
                      ${product.title}
                    </h2>
                  </div>
                  <div
                    class="flex items-center justify-evenly sm:justify-between gap-8"
                  >
                    <div class="flex items-center gap-3"><p class="font-medium text-base text-gray-900"> <span class="bg-white text-center px-2 pb-1 mr-1 rounded-full cursor-pointer">&plus;</span>${product.count} <span class="bg-white px-2 pb-1 rounded-full ml-1 cursor-pointer">&minus;</span> </p></div>
                    <h6 class="font-medium text-xl text-indigo-600">$${product.price}</h6>
                  </div>
                </div>
              </div>
          `
          )
          .join("")}
              
            </div>
            `;
}

orderDetails(productToPay);

document.getElementById("rzp-button1").onclick = function (e) {
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: 300 * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "USD",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#0000FF",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - localStorage
  e.preventDefault();
};

function proceedToPay(event, price) {
  if (price < 50) {
    price = price + 20;
  }
  let options = {
    key: "rzp_test_PV1oQ0oMtgXOsq",
    amount: price * 100,
    currency: "USD",
    name: "MyShop Checkout",
    description: "This is your order",
    theme: {
      color: "#0000FF",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };
  let rzpy = new Razorpay(options);
  rzpy.open();
  // event.preventDefault();
}
