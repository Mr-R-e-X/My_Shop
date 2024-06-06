let categories = document.querySelector("#categories");
let categoyBtns = document.querySelectorAll("#category");
let manClothDiv = document.querySelector("#man-cloth");
let womenClothDiv = document.querySelector("#women-cloth");
let jewelleryDiv = document.querySelector("#jewellery");
let electronicDiv = document.querySelector("#electronics");
let selectedColor = [];
let selectedSize = [];
let cart = []

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
    console.log("Restruce", restructuredData);
    let shuffledData = shuffleArray(restructuredData);
    updateShopUi(shuffledData, divDtls, cat);
  } else {
    console.log("Nm", data);
    let shuffledData = shuffleArray(data);
    updateShopUi(shuffledData, divDtls, cat);
  }
}

// Resture Data for adding Colors and Sizes to the Men and Woman Clothings
function restructureData(data) {
  let colors = ["red", "green", "blue", "black", "white"];
  let sizes = ["S", "M", "L", "XL", "XXL"];
  data.map((data) => {
    data["Colors"] = colors;
    data["Sizes"] = sizes;
  });
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
    <div class="product" id="product-${product?.id}" onclick="detailProduct(${product?.id})">
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
          <span class="prod-curr-price"> $${product?.price} </span>
          <del class="text-sm text-gray-600 ">
            <span class="prev-price"> $${Math.floor(product?.price + product?.price * 0.01)} </span>
          </del>
        </p>
      </div>
      <div class="product-center">
        <p class="product-rate">${product?.rating?.rate}</p>
        <img src="https://cdn-icons-png.flaticon.com/128/477/477406.png" alt="stars" class="rate-img" />
      </div>
    </div>
    ${product?.Colors ? `
    <div class="product-colors">
      <p class="prod-info-txt">Colors:</p>
      <div class="product-center">
        ${product.Colors.map(color => `
          <div class="prod-cloth-color" style="background-color: ${color};" data-val-color="${color}"></div>
        `).join('')}
      </div>
    </div>
  ` : ""}
  ${product?.Sizes ? `
    <div class="my-2 flex justify-start items-center">
      <p class="prod-info-txt">Sizes:</p>
      <div class="product-center">
        ${product.Sizes.map(size => `
          <span class="prod-cloth-size" data-val-size="${size}" >${size}</span>
        `).join('')}
      </div>
    </div>
  ` : ""}
  </div>
  <button id="addToCartBtn" data-cat="${cat}" onclick="addProductToCart(this, ${product?.id})">
    Add to Cart
  </button>
</div>
    `;
  });
  data.map((product) => {
    if (product?.Colors !== undefined) {
      const productElem = document.getElementById(`product-${product.id}`);
      const colors = productElem.querySelectorAll('.prod-cloth-color')
      colors.forEach(color => {
        color.addEventListener("click", (event) => {
          event.stopPropagation();
          selectColor(color, productElem)
        })
      })
    }
    if (product?.Sizes) {
      const productElem = document.getElementById(`product-${product.id}`);
      const sizes = productElem.querySelectorAll('.prod-cloth-size')
      sizes.forEach(size => {
        size.addEventListener("click", (event) => {
          event.stopPropagation();
          selectSize(size, productElem)
        })
      })
    }
  })

}
function selectColor(element, prodElem) {
  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    selectedColor = selectedColor.filter(item => item.productId !== prodElem.id.split("-")[1])
  }
  else {
    let colors = prodElem.querySelectorAll('.prod-cloth-color')
    colors.forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    const color = element.getAttribute('data-val-color');
    let sel_color = { "productId": prodElem.id.split("-")[1], "color": color }
    selectedColor.push(sel_color);
  }
}

function selectSize(element, prodElem) {
  if (element.classList.contains('selected-size')) {
    element.classList.remove('selected-size');
    selectedSize = selectedSize.filter(item => item.productId !== prodElem.id.split("-")[1])
  }
  else {
    let sizes = prodElem.querySelectorAll('.prod-cloth-size')
    sizes.forEach(el => el.classList.remove('selected-size'));
    element.classList.add('selected-size');
    const dataSize = element.getAttribute('data-val-size');
    console.log(`Selected size for ${prodElem.id} : ${dataSize}`);
    let size = { "productId": prodElem.id.split("-")[1], "size": dataSize }
    selectedSize.push(size)
  }
}

async function addProductToCart(element, prodId) {
  console.log(prodId)
  let cat = element.getAttribute("data-cat");
  if (cat === "men's clothing" || cat === "women's clothing") {
    if (checkChooseProdSizeAndColor(prodId)) {

      console.log(true);
    }
    else {
      console.log("Please select color and size")
    }
  }
  // let data = await fetchData(`https://fakestoreapi.com/products/${prodId}`)
  // console.log(data);
}

function checkChooseProdSizeAndColor(prodId) {
  let isColoeSelected = selectedColor.find(color => color.productId == prodId);
  let isSizeSelected = selectedSize.find(size => size.productId == prodId);
  if (isColoeSelected === undefined) {
    return false;
  }
  if (isSizeSelected === undefined) {
    return false;
  }
  return true;
}
async function detailProduct(id) {
  // let data = await fetchData(`https://fakestoreapi.com/products/${id}`)
  // console.log(data);
}
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
});
