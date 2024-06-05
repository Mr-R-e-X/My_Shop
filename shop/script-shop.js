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
    let shuffledData = shuffleArray(restructuredData);
    updateUi(shuffledData, divDtls, cat);
  } else {
    console.log("Nm", data);
    let shuffledData = shuffleArray(data);
    updateUi(shuffledData, divDtls, cat);
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
    <div class="bg-gray-300 py-2 shadow-md hover:shadow-lg hover:shadow-black duration-300 product cursor-pointer relative flex flex-col">
  <div class="prod-img">
    <img src="${product.image}" class="" />
  </div>
  <div class="w-full px-3 flex-1">
    <p class="text-base font-medium text-black text-justify tracking-tighter capitalize my-1 leading-none">
      ${product?.title}
    </p>
    <div class="w-full flex items-center justify-between">
      <div>
        <p class="text-base font-semibold my-1">
          <span class="prod-curr-price"> $${product?.price} </span>
          <del class="text-sm text-gray-600 ">
            <span class="prev-price"> $${Math.floor(product?.price + product?.price * 0.01)} </span>
          </del>
        </p>
       
      </div>
      <div class="flex items-center">
        <p class="mr-1 text-sm text-gray-700">${product?.rating?.rate}</p>
        <img src="https://cdn-icons-png.flaticon.com/128/477/477406.png" alt="stars" class="h-4 w-4" />
      </div>
    </div>
    ${product?.Colors ? `
    <div class="my-1 flex">
      <p class="text-sm font-medium text-gray-700 mr-2">Colors:</p>
      <div class="flex items-center">
        ${product.Colors.map(color => `
          <span class="w-4 h-4 rounded-full border mr-2" style="background-color: ${color};"></span>
        `).join('')}
      </div>
    </div>
  ` : ""}
  ${product?.Sizes ? `
    <div class="my-2 flex justify-start items-center">
      <p class="text-sm font-medium text-gray-700 mr-2">Sizes:</p>
      <div class="flex items-center">
        ${product.Sizes.map(size => `
          <span class="px-2 text-sm bg-gray-400 rounded-md border border-gray-500 mr-2">${size}</span>
        `).join('')}
      </div>
    </div>
  ` : ""}
  </div>
  <button class="mt-4 w-full bg-blue-500 text-white py-2 shadow hover:bg-blue-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-300 absolute bottom-0">
    Add to Cart
  </button>
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
