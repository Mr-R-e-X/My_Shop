const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");
const navCartItemCount = document.querySelector("#my-cart");
let categories = document.querySelector("#categories");
let categoyBtns = document.querySelectorAll("#category");
let manClothDiv = document.querySelector("#man-cloth");
let womenClothDiv = document.querySelector("#women-cloth");
let jewelleryDiv = document.querySelector("#jewellery");
let electronicDiv = document.querySelector("#electronics");
let categoryBtns = document.querySelectorAll(".category-btns");
let selectedColor = [];
let selectedSize = [];
let users = JSON.parse(localStorage.getItem("users"));
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let currUserFound = users.find((user) => user.email === currUser.email);

// Data Fetcher Function in will return a data in JSON object format
async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// Get Data for Page, Document onload it will initially render the page with the data
async function getData(url, cat, divDtls) {
  let data = await fetchData(url);
  if (cat === "men's clothing" || cat === "women's clothing") {
    let restructuredData = restructureData(data);
    let shuffledData = shuffleArray(restructuredData);
    updateShopUi(shuffledData, divDtls, cat);
  } else {
    let shuffledData = shuffleArray(data);
    updateShopUi(shuffledData, divDtls, cat);
  }
}

// Resture Data for adding Colors and Sizes to the Men and Woman Clothings
function restructureData(data) {
  let add_colors = ["red", "green", "blue", "black", "white"];
  let add_sizes = ["S", "M", "L", "XL", "XXL"];
  data.map((data) => {
    data["colors"] = add_colors;
    data["sizes"] = add_sizes;
  });
  return data;
}
function restructureSingleData(data) {
  let add_colors = ["red", "green", "blue", "black", "white"];
  let add_sizes = ["S", "M", "L", "XL", "XXL"];

  data.colors = add_colors;
  data.sizes = add_sizes;

  return data;
}
// Suffle Array to suffle the product on every time dom loads
function shuffleArray(arr) {
  let currIndex = arr.length;
  while (currIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currIndex);
    currIndex--;
    let temp = arr[currIndex];
    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
}

// Update UI with the data
function updateShopUi(data, divDtls, cat) {
  let title = cat
    .split(" ")
    .map((num) => num.charAt(0).toUpperCase() + num.slice(1))
    .join(" ");
  divDtls.innerHTML = `
    <div class="text-xl font-bold mb-4">${title}</div>
    <div id="${title}" class="w-max flex"></div>
  `;
  let productDiv = document.getElementById(title);
  data.map((product) => {
    productDiv.innerHTML += `
    <div class="product" id="product-${product?.id}" onclick="detailProduct(${
      product?.id
    }, event)">
  <div class="prod-img">
    <img src="${product.image}" class="" />
  </div>
  <div class="product-details">
    <p class="product-title">
      ${product?.title}
    </p>
    <div class="product-info">
      <div>
        <p class="product-price">
          <span class="prod-curr-price"> &#8377;${Math.floor(
            product?.price * 80
          ).toFixed(0)} </span>
          <del class="text-sm text-gray-600 ">
            <span class="prev-price"> $${Math.floor(
              product?.price * 80 + product?.price * 80 * 0.01
            ).toFixed(0)} </span>
          </del>
        </p>
      </div>
      <div class="product-center">
        <p class="product-rate">${product?.rating?.rate}</p>
        <img src="https://cdn-icons-png.flaticon.com/128/477/477406.png" alt="stars" class="rate-img" />
      </div>
    </div>
    ${
      product?.colors
        ? `
    <div class="product-colors">
      <div class="product-center">
        ${product.colors
          .map(
            (color) => `
          <div class="prod-cloth-color" style="background-color: ${color};" data-val-color="${color}"></div>
        `
          )
          .join("")}
      </div>
    </div>
  `
        : ""
    }
  ${
    product?.sizes
      ? `
    <div class="product-colors">
      <div class="product-center">
        ${product.sizes
          .map(
            (size) => `
          <span class="prod-cloth-size" data-val-size="${size}" >${size}</span>
        `
          )
          .join("")}
      </div>
    </div>
  `
      : ""
  }
  </div>
  <button id="addToCartBtn" data-cat="${cat}" onclick="addProductToCart(this, ${
      product?.id
    }, event)">
    Add to Cart
  </button>
</div>
    `;
  });
  data.map((product) => {
    if (product?.colors !== undefined) {
      const productElem = document.getElementById(`product-${product.id}`);
      const colors = productElem.querySelectorAll(".prod-cloth-color");
      colors.forEach((color) => {
        color.addEventListener("click", (event) => {
          event.stopPropagation();
          selectColor(color, productElem);
        });
      });
    }
    if (product?.sizes) {
      const productElem = document.getElementById(`product-${product.id}`);
      const sizes = productElem.querySelectorAll(".prod-cloth-size");
      sizes.forEach((size) => {
        size.addEventListener("click", (event) => {
          event.stopPropagation();
          selectSize(size, productElem);
        });
      });
    }
  });
}

function selectColor(element, prodElem) {
  if (element.classList.contains("selected")) {
    element.classList.remove("selected");
    selectedColor = selectedColor.filter(
      (item) => item.productId !== prodElem.id.split("-")[1]
    );
  } else {
    let colors = prodElem.querySelectorAll(".prod-cloth-color");
    colors.forEach((el) => el.classList.remove("selected"));
    element.classList.add("selected");
    const color = element.getAttribute("data-val-color");
    let sel_color = { productId: prodElem.id.split("-")[1], color: color };
    let idx = selectedColor.findIndex(
      (item) => item.productId === sel_color.productId
    );

    if (idx === -1) {
      selectedColor.push(sel_color);
    } else {
      selectedColor[idx].color = sel_color.color;
    }
  }
}

function selectSize(element, prodElem) {
  if (element.classList.contains("selected-size")) {
    element.classList.remove("selected-size");
    selectedSize = selectedSize.filter(
      (item) => item.productId !== prodElem.id.split("-")[1]
    );
  } else {
    let sizes = prodElem.querySelectorAll(".prod-cloth-size");
    sizes.forEach((el) => el.classList.remove("selected-size"));
    element.classList.add("selected-size");
    const dataSize = element.getAttribute("data-val-size");
    let sel_size = { productId: prodElem.id.split("-")[1], size: dataSize };
    let idx = selectedSize.findIndex(
      (item) => item.productId === sel_size.productId
    );
    if (idx === -1) {
      selectedSize.push(sel_size);
    } else {
      selectedSize[idx].size = sel_size.size;
    }
  }
}

async function addProductToCart(element, prodId, event) {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event propagation
  let cat = element.getAttribute("data-cat");
  if (cat === "men's clothing" || cat === "women's clothing") {
    let colorAndSize = checkChooseProdSizeAndColor(prodId);
    if (colorAndSize !== false) {
      let index = currUserFound.cart.findIndex(
        (product) =>
          product.id === prodId &&
          product.color === colorAndSize.color &&
          product.size === colorAndSize.size
      );
      if (index !== -1) {
        let existingProd = currUserFound.cart[index];
        existingProd.count += 1;
        console.log("curr user car", currUserFound.cart);
        showAlert(
          "Success!",
          `"${currUserFound.cart[index].title}" added to the cart successfully.`,
          "success"
        );
      } else {
        let product = await fetchData(
          `https://fakestoreapi.com/products/${prodId}`
        );
        product["color"] = colorAndSize.color;
        product["size"] = colorAndSize.size;
        product["count"] = 1;
        currUserFound.cart.push(product);
        console.log("curr user cart", currUserFound.cart);
        showAlert(
          "Success!",
          `${product.title} added to the cart successfully.`,
          "success"
        );
      }
    } else {
      showAlert("Error", "Please select a specific color and size !", "error");
    }
  } else {
    let index = currUserFound.cart.findIndex(
      (product) => product.id === prodId
    );
    if (index !== -1) {
      let existingProd = currUserFound.cart[index];
      existingProd.count += 1;
      console.log("curr user car", currUserFound.cart);
      showAlert(
        "Success!",
        `"${currUserFound.cart[index].title}" added to the cart successfully.`,
        "success"
      );
    } else {
      let product = await fetchData(
        `https://fakestoreapi.com/products/${prodId}`
      );
      product["count"] = 1;
      currUserFound.cart.push(product);
      console.log("curr user cart", currUserFound.cart);
      showAlert(
        "Success!",
        `${product.title} added to the cart successfully.`,
        "success"
      );
    }
  }
  let userIndex = users.findIndex((user) => user.email === currUserFound.email);
  users[userIndex] = currUserFound;
  localStorage.setItem("users", JSON.stringify(users));
  updateMyCartNavbarUi(currUserFound.cart);
}

function checkChooseProdSizeAndColor(prodId) {
  let isColorSelected = selectedColor.find(
    (color) => color.productId == prodId
  );
  let isSizeSelected = selectedSize.find((size) => size.productId == prodId);
  if (isColorSelected === undefined) {
    return false;
  }
  if (isSizeSelected === undefined) {
    return false;
  }
  return { color: isColorSelected.color, size: isSizeSelected.size };
}

async function detailProduct(id, event) {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event propagation
  let data = await fetchData(`https://fakestoreapi.com/products/${id}`);
  if (
    data.category === "men's clothing" ||
    data.category === "women's clothing"
  ) {
    data = restructureSingleData(data);
  }
  localStorage.setItem("product-data", JSON.stringify(data));
  window.location.href = "./product-detail.html";
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

function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}

function categoryButtonUIHandler(element) {
  let parent = document.querySelector("#categories").children;
  Array.from(parent).forEach((catBtn) => {
    catBtn.classList.remove("bg-black", "text-white");
    catBtn.classList.add("bg-white", "text-black");
  });
  element.classList.add("bg-black", "text-white");
  element.classList.remove("bg-white", "text-black");
}

categoryBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    categoryButtonUIHandler(btn);
    let btn_text = btn.textContent.toLowerCase().trim();
    if (btn_text === "all") {
      manClothDiv.classList.remove("hidden");
      womenClothDiv.classList.remove("hidden");
      jewelleryDiv.classList.remove("hidden");
      electronicDiv.classList.remove("hidden");
    }
    if (btn_text === "mens") {
      manClothDiv.classList.remove("hidden");
      womenClothDiv.classList.add("hidden");
      jewelleryDiv.classList.add("hidden");
      electronicDiv.classList.add("hidden");
    }
    if (btn_text === "womens") {
      manClothDiv.classList.add("hidden");
      womenClothDiv.classList.remove("hidden");
      jewelleryDiv.classList.add("hidden");
      electronicDiv.classList.add("hidden");
    }
    if (btn_text === "jewellery") {
      manClothDiv.classList.add("hidden");
      womenClothDiv.classList.add("hidden");
      jewelleryDiv.classList.remove("hidden");
      electronicDiv.classList.add("hidden");
    }
    if (btn_text === "electronics") {
      manClothDiv.classList.add("hidden");
      womenClothDiv.classList.add("hidden");
      jewelleryDiv.classList.add("hidden");
      electronicDiv.classList.remove("hidden");
    }
  });
});

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
    window.location.href = "../index.html";
  }
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

//Calling required initial functions on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getData(
    `https://fakestoreapi.com/products/category/men's%20clothing`,
    "men's clothing",
    manClothDiv
  );
  getData(
    `https://fakestoreapi.com/products/category/women's%20clothing`,
    "women's clothing",
    womenClothDiv
  );
  getData(
    `https://fakestoreapi.com/products/category/jewelery`,
    "jewelery",
    jewelleryDiv
  );
  getData(
    `https://fakestoreapi.com/products/category/electronics`,
    "electronics",
    electronicDiv
  );
  updateMyCartNavbarUi(currUserFound.cart);
});
