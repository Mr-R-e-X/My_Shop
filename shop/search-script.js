// If user is not available in Session Storage redirecting the page to the Landing Page
let currUser = JSON.parse(localStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
// checking user
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => user.email === currUser.email);

// accessing dom
let searchData = JSON.parse(sessionStorage.getItem("search-result"));
let selectedColor = [];
let selectedSize = [];

console.log(searchData);
const navCartItemCount = document.querySelector("#my-cart");
const title = document.getElementById("title");
const resultDiv = document.getElementById("result");

// Data Fetcher Function in will return a data in JSON object format
async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function updateShopUi(data) {
  title.innerHTML = `
      <h1 class="text-xl font-bold mb-4"> Results </h1>
    `;
  //   let productDiv = document.getElementById(title);
  data.map((product) => {
    resultDiv.innerHTML += `
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
            ).toFixed(2)} </span>
            <del class="text-sm text-gray-600 ">
              <span class="prev-price"> &#8377;${Math.floor(
                product?.price * 80 + product?.price * 80 * 0.1
              ).toFixed(2)} </span>
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
    <button id="addToCartBtn" data-cat="${
      product.category
    }" onclick="addProductToCart(this, ${product?.id}, event)">
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
          "Great choice! Added to your cart. 🛒✨",
          `${product.title}`,
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
        "Great choice! Added to your cart. 🛒✨",
        `"${currUserFound.cart[index].title}"`,
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
        "Great choice! Added to your cart. 🛒✨!",
        `${product.title}`,
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

function restructureSingleData(data) {
  let add_colors = ["red", "green", "blue", "black", "white"];
  let add_sizes = ["S", "M", "L", "XL", "XXL"];

  data.colors = add_colors;
  data.sizes = add_sizes;

  return data;
}

async function detailProduct(id, event) {
  event.preventDefault();
  event.stopPropagation();
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

updateMyCartNavbarUi(currUserFound.cart);
updateShopUi(searchData);
