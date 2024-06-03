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
    updateUi(restructuredData, divDtls);
  } else {
    console.log("Nm", data);
    updateUi(data, divDtls);
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
function createCard(product) {
  let { category, description, image, title, id, Colors, Sizes, price } =
    product;
  return `
  <div class="p-5 w-62 h-62 py-10 bg-purple-300 text-center transform duration-500 hover:-translate-y-2 cursor-pointer rounded-lg shadow-lg">
        <img src="${image}" alt="Product Image" class="w-full h-64 object-cover rounded-md mb-5 mix-blande-prop">
        <div class="space-x-1 flex justify-center mt-2 mb-5">
            <svg class="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
            </svg>
            <svg class="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
            </svg>
            <svg class="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
            </svg>
            <svg class="w-4 h-4 mx-px fill-current text-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
            </svg>
            <svg class="w-4 h-4 mx-px fill-current text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                <path d="M6.43 12l-2.36 1.64a1 1 0 0 1-1.53-1.11l.83-2.75a1 1 0 0 0-.35-1.09L.73 6.96a1 1 0 0 1 .59-1.8l2.87-.06a1 1 0 0 0 .92-.67l.95-2.71a1 1 0 0 1 1.88 0l.95 2.71c.13.4.5.66.92.67l2.87.06a1 1 0 0 1 .59 1.8l-2.3 1.73a1 1 0 0 0-.34 1.09l.83 2.75a1 1 0 0 1-1.53 1.1L7.57 12a1 1 0 0 0-1.14 0z"></path>
            </svg>
        </div>
        <h1 class="text-3xl my-5 font-bold">${title}</h1>
        <p class="mb-5 text-gray-700">$${price}</p>
        <button class="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">Add To Cart</button>
    </div>
    `;
}
function updateUi(data, divDtls) {
  data.map((product) => {
    divDtls.innerHTML += `
            ${createCard(product)}
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
