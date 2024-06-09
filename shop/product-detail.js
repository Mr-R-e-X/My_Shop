const productCardDiv = document.querySelector("#product-card")
let myCartNav = document.querySelector("#my-cart")
let productData = JSON.parse(localStorage.getItem("product-data"));
let selectedColor = null;
let selectedSize = null;
let users = JSON.parse(localStorage.getItem("users"));
let currUserEmai = JSON.parse(sessionStorage.getItem("currentUser")).email;
let currUser = users.find((user) => user.email === currUserEmai);
function updateProductUi(productData) {
  let { id, category, description, image, price, title } = productData;
  let { rate } = productData.rating
  productCardDiv.innerHTML = `
    <div class="bg-gray-100 py-8" id="product-${id}">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-[460px] rounded-lg bg-gray-300 mb-4">
                    <img class="single-prod-img" src="${image}" alt="${title}" />
                </div>
                <div class="flex -mx-2 mb-4">
                    <div class="w-1/2 px-2">
                        <button class="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800" data-cat=${category} onclick="addProductToCart(this)">
                            Add to Cart
                        </button>
                    </div>
                    <div class="w-1/2 px-2">
                        <button class="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-4 rounded-full font-bold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-green-500 hover:to-green-700" data-cat=${category} onclick="buyNow(this, ${id})">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h2 class="text-2xl font-bold text-gray-800 mb-2">
                    ${title}
                </h2>
                <div class="flex mb-4">
                    <div class="mr-4">
                        <span class="font-bold text-gray-700">Price:</span>
                        <span class="text-green-600">$${price}</span>
                    </div>
                    <div>
                        <span class="font-bold text-gray-700">Availability:</span>
                        <span class="text-green-500">In Stock</span>
                    </div>
                </div>
                ${productData?.colors ? `
                <div class="mb-4">
                    <span class="font-bold text-gray-700">Select Color:</span>
                    <div class="flex items-center mt-2">
                        ${productData.colors.map((color) => `
                            <button class="w-6 h-6 border border-gray-800 rounded-full mx-2 mr-2 clr-btns transition-all duration-300" style="background-color: ${color};" data-val-color="${color}"></button>
                        `).join("")}
                    </div>
                </div>` : ""}
                ${productData?.sizes ? `
                <div class="mb-4">
                    <span class="font-bold text-gray-700">Select Size:</span>
                    <div class="flex items-center mt-2">
                        ${productData.sizes.map((size) => `
                            <button class="bg-gray-300 text-gray-700 py-2 px-3 rounded-full font-semibold mr-2 mx-2 hover:bg-gray-400 transition-all duration-300 size-btns">${size}</button>
                        `).join("")}
                    </div>
                </div>` : ""}
                <div>
                    <span class="font-bold text-gray-700">Product Description:</span>
                    <p class="text-gray-600 text-sm mt-2">
                        ${description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
    `

  if (productData?.colors !== undefined) {
    const product = document.getElementById(`product-${id}`);
    const colors = document.querySelectorAll(".clr-btns")
    colors.forEach((color) => {
      color.addEventListener("click", (event) => {
        event.stopPropagation();
        selectColor(color, product)
      })
    })
  }
  if (productData?.sizes !== undefined) {
    const product = document.getElementById(`product-${id}`);
    const sizes = document.querySelectorAll(".size-btns")
    sizes.forEach((size) => {
      size.addEventListener("click", (event) => {
        event.stopPropagation();
        selectSize(size, product)
      })
    })
  }
}

function selectColor(color, product) {
  if (color.classList.contains("single-color-selected")) {
    color.classList.remove("single-color-selected")
    selectedColor = null;
    console.log(selectedColor)
  } else {
    let colors = product.querySelectorAll(".clr-btns")
    colors.forEach((el) => el.classList.remove("single-color-selected"));
    const newColor = color.getAttribute("data-val-color");
    color.classList.add("single-color-selected")
    selectedColor = { productId: product.id.split("-")[1], color: newColor };
    console.log(selectedColor)
  }
}

function selectSize(size, product) {
  if (size.classList.contains("single-size-selected")) {
    size.classList.remove("single-size-selected")
    selectedSize = null
    console.log(selectedSize)
  } else {
    let sizes = product.querySelectorAll(".size-btns")
    // console.log(sizes)
    sizes.forEach((el) => el.classList.remove("single-size-selected"));
    const newSize = size.innerText;
    size.classList.add("single-size-selected")
    selectedSize = { productId: product.id.split("-")[1], size: newSize };
    console.log(selectedSize)
  }
}

async function addProductToCart(element) {
  let cat = element.getAttribute("data-cat");
  console.log(cat)
  if (cat === "men's" || cat === "women's") {
    if (selectedColor !== null && selectedSize !== null) {
      let index = currUser.cart.findIndex(
        (product) =>
          product.id === productData.id &&
          product.color === selectedColor.color &&
          product.size === selectedColor.size
      );
      console.log(index)
      if (index !== -1) {
        let existingProd = currUser.cart[index];
        existingProd.count += 1;
        showAlert("Success!", `"${currUser.cart[index].title}" added to the cart successfully.`, "success");
      } else {
        productData["color"] = selectedColor.color;
        productData["size"] = selectedColor.size;
        productData["count"] = 1;
        currUser.cart.push(productData);
        showAlert("Success!", `${productData.title} added to the cart successfully.`, "success");
      }
    } else {
      showAlert("Error", "Please select a specific color and size !", "error");
    }
  } else {
    let index = currUser.cart.findIndex(
      (product) =>
        product.id === productData.id);
    if (index !== -1) {
      let existingProd = currUser.cart[index];
      existingProd.count += 1;
      console.log("curr user car", currUser.cart);
      showAlert("Success!", `"${currUser.cart[index].title}" added to the cart successfully.`, "success");
    } else {
      productData["count"] = 1;
      currUser.cart.push(productData);
      showAlert("Success!", `${productData.title} added to the cart successfully.`, "success");
    }
  }
  let userIndex = users.findIndex(user => user.email === currUser.email);
  users[userIndex] = currUser;
  localStorage.setItem("users", JSON.stringify(users));
  updateMyCartNavbarUi(currUser.cart)
}

function buyNow(elem, id) {
  let cat = elem.getAttribute("data-cat");
  let productForPayment = [];
  if (cat === "men's" || cat === "women's") {
    if (selectedColor !== null && selectedSize !== null) {
      productData["color"] = selectedColor.color;
      productData["size"] = selectedSize.size;
      productData["count"] = 1;
      productForPayment.push(productData);
      console.log(productForPayment);
      sessionStorage.setItem("productForPayment", JSON.stringify(productForPayment));
      window.location.href = "../razorpay/index.html";
    } else {
      showAlert("Error", "Please select a specific color and size!", "error");
    }
  } else {
    productData["count"] = 1;
    productForPayment.push(productData)
    console.log(productForPayment);
    sessionStorage.setItem("productForPayment", JSON.stringify(productForPayment))
    window.location.href = "../razorpay/index.html";
  }
}

function updateMyCartNavbarUi(cart) {
  let count = 0;
  cart.map((item) => {
    count += item.count;
  })
  if (count === 0) {
    myCartNav.classList.add("hidden")
  } else {
    myCartNav.classList.remove("hidden")
    myCartNav.innerText = count
  }
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
  updateProductUi(productData)
  updateMyCartNavbarUi(currUser.cart)
})