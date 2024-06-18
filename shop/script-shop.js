const navCartItemCount = document.querySelector("#my-cart");
let categories = document.querySelector("#categories");
let categoyBtns = document.querySelectorAll("#category");
let manClothDiv = document.querySelector("#man-cloth");
let womenClothDiv = document.querySelector("#women-cloth");
let jewelleryDiv = document.querySelector("#jewellery");
let electronicDiv = document.querySelector("#electronics");
let categoryBtns = document.querySelectorAll(".category-btns");
let defaultSearch = document.getElementById("default-search");
let resDiv = document.getElementById("result");
let searchForm = document.getElementById("search-form");
let selectedColor = [];
let selectedSize = [];
let users = JSON.parse(localStorage.getItem("users"));
let currUser = JSON.parse(localStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let currUserFound = users.find((user) => user.email === currUser.email);

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

async function getAllData() {
  let allData = await fetchData(`https://fakestoreapi.com/products`);
  let structuredData = restructureAllData(allData);
  sessionStorage.setItem("allItem", JSON.stringify(structuredData));
}

function restructureAllData(data) {
  let add_colors = ["red", "green", "blue", "black", "white"];
  let add_sizes = ["S", "M", "L", "XL", "XXL"];
  data.map((data) => {
    if (
      data.category === "men's clothing" ||
      data.category === "women's clothing"
    ) {
      data["colors"] = add_colors;
      data["sizes"] = add_sizes;
    }
  });
  return data;
}

//Calling required initial functions on DOM load
document.addEventListener("DOMContentLoaded", () => {
  getAllData();
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
  defaultSearch.addEventListener("input", (e) => {
    let avlData = JSON.parse(sessionStorage.getItem("allItem"));
    console.log(avlData);
    let input = defaultSearch.value;
    if (defaultSearch.value.trim() !== "") {
      resDiv.classList.remove("hidden");
      let result = checkMatch(avlData, input);
      displaySearchResult(result, resDiv);
    } else {
      resDiv.innerHTML = "";
      resDiv.classList.add("hidden");
    }
  });
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let avlData = JSON.parse(sessionStorage.getItem("allItem"));
    let inputValue = defaultSearch.value;
    let result = avlData.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    if (result.length === 0) {
      showAlert("Product Not Found", "", "error");
      return;
    }
    sessionStorage.setItem("search-result", JSON.stringify(result));
    window.location.href = "./searchResult.html";
  });
});
function checkMatch(data, searchValue) {
  if (searchValue.length) {
    let result = data.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return result;
  }
  return [];
}
function displaySearchResult(result, elem) {
  let content = result
    .map(
      (item) =>
        `<li class="py-3 px-2 text-base cursor-pointer transition-all duration-150 flex items-center justify-start"> 
        <div class="pl-1 pr-2" onclick="fillTheSearch('${item.title}')">
          <img src="https://cdn-icons-png.flaticon.com/128/2267/2267904.png" alt="arrow" height="20px" width="20px" class="searchProd(${item.id})"/>
        </div>
        <p onclick="searchProd(${item.id})">${item.title}</p>
        </li>
      `
    )
    .join("");
  elem.innerHTML = `<ul>${content}</ul>`;
  if (result.length === 0) {
    elem.classList.add("hidden");
  }
}

function fillTheSearch(title) {
  defaultSearch.value = title;
  defaultSearch.focus();
  resDiv.classList.add("hidden");
}

function searchProd(id) {
  let avlData = JSON.parse(sessionStorage.getItem("allItem"));
  let item = avlData.filter((item) => item.id === id);
  if (
    item.category === "men's clothing" ||
    item.category === "women's clothing"
  ) {
    item = restructureSingleData(item);
  }
  console.log(JSON.stringify(item));
  localStorage.setItem("product-data", JSON.stringify(...item));
  window.location.href = "./product-detail.html";
}

const form = document.getElementById("filterForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting
  let avlData = JSON.parse(sessionStorage.getItem("allItem"));
  const formData = new FormData(form);

  // console.log('Form Data:', formData); // Log FormData object for debugging

  const filterData = {};

  for (const [key, value] of formData.entries()) {
    if (filterData[key]) {
      if (Array.isArray(filterData[key])) {
        filterData[key].push(value);
      } else {
        filterData[key] = [filterData[key], value];
      }
    } else {
      filterData[key] = value;
    }
  }

  
});
