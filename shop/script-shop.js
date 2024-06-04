let categories = document.querySelector("#categories");
let categoyBtns = document.querySelectorAll("#category");
let manClothDiv = document.querySelector("#man-cloth");
let womenClothDiv = document.querySelector("#women-cloth");
let jewelleryDiv = document.querySelector("#jewellery");
let electronicDiv = document.querySelector("#electronics");
async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getData(url, cat, divDtls) {
  let data = await fetchData(url);
  if (cat === "men's clothing" || cat === "women's clothing") {
    let restructuredData = restructureData(data);
    console.log("Restruce", restructuredData);
    updateUi(restructuredData, divDtls, cat);
  } else {
    console.log("Nm", data);
    updateUi(data, divDtls, cat);
  }
}

function restructureData(data) {
  let colors = ["red", "green", "blue", "black", "white"];
  let sizes = ["S", "M", "L", "XL", "XXL"];
  data.map((data) => {
    data["Colors"] = colors;
    data["Sizes"] = sizes;
  });
  return data;
}

function chooseCategoryBg(cat) {
  cat.classList.remove("bg-white");
  cat.classList.remove("text-black");
  cat.classList.add("bg-black");
  cat.classList.add("text-white");
}
function resetCategoryBg(cat) {
  cat.classList.remove("bg-black");
  cat.classList.remove("text-white");
  cat.classList.add("bg-white");
  cat.classList.add("text-black");
}

function updateUi(data, divDtls, cat) {
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
    <div class="bg-gray-400 shadow-md hover:scale-105 hover:shadow-xl duration-300 product product cursor-pointer">
    <div class="prod-img">
      <img src="${product.image}" class="" />
    </div>
    <div>
      <p class="text-base font-medium text-black capitalize">${
        product?.title
      }</p>
      <div class="flex items-center">
        <p class="text-base font-semibold my-3 product-price">$${
          product?.price
        }</p>
        <del class="flex items-center">
          <p class="text-sm pl-3 prev-price">$${Math.floor(
            product?.price + product?.price * 0.01
          )}</p>
        </del>
      </div>
      <div>
          <p>${product?.rating?.rate}</p>
      </div>
    </div>
  </div>
    `;
  });
}

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
