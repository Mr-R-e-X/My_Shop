const applyFilterBtnSmallDevice = document.getElementById("apply-filter-sm");
const formSM = document.getElementById("filterForm-sm");
const range = document.getElementById("rating-sm");
const ratingValue = document.getElementById("rating-value-sm");
let filterSmBtn = document.getElementById("sm-filter-btn");
let smFilterOpen = false;
let main = document.querySelector("main");

// from opening closing function
filterSmBtn.addEventListener("click", function () {
  const filterElement = document.getElementById("filter");
  if (!smFilterOpen) {
    filterElement.classList.remove("hidden");
    // Force a reflow to restart the animation
    filterElement.offsetHeight;
    filterElement.classList.add("openFilter");
    main.classList.add("blur-md");
    filterSmBtn.src =
      "https://cdn-icons-png.flaticon.com/128/16206/16206622.png";

    smFilterOpen = !smFilterOpen;
  } else {
    filterElement.classList.remove("openFilter");

    filterSmBtn.src =
      "https://cdn-icons-png.flaticon.com/128/16381/16381099.png";
    smFilterOpen = !smFilterOpen;

    // Wait for the animation to complete before hiding
    setTimeout(() => {
      if (!smFilterOpen) {
        filterElement.classList.add("hidden");
        main.classList.remove("blur-md");
      }
    }, 300); // Duration of the animation in milliseconds
  }
});

// Add event listener for input event
range.addEventListener("input", function () {
  ratingValue.textContent = range.value;
});
applyFilterBtnSmallDevice.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  const formData = new FormData(formSM);
  if (applyFilterBtnSmallDevice.innerText === "Apply Filter") {
    let filteredProducts = filterProducts(formData);
    console.log(filteredProducts);

    if (!filteredProducts.length) {
      showAlert("Sorry! No product found!", "", "error");
      return;
    }

    // Hide main product categories and show filtered results
    hideMainProductCategories();
    showFilteredResults(filteredProducts);

    // Update button text to 'Clear Filter'
    applyFilterBtnSmallDevice.innerText = "Clear Filter";
    applyFilterBtnSmallDevice.classList.add("bg-orange-600");
  } else if (applyFilterBtnSmallDevice.innerText === "Clear Filter") {
    // Reset form and show main product categories
    formSM.reset();
    showMainProductCategories();

    // Reset filtered results UI
    resetFilteredResultsUI();

    // Update button text back to 'Apply Filter'
    applyFilterBtnSmallDevice.innerText = "Apply Filter";
    applyFilterBtnSmallDevice.classList.remove("bg-orange-600");
  }
});

//

// Hide main product category elements
function hideMainProductCategories() {
  manClothDiv.classList.add("hidden");
  womenClothDiv.classList.add("hidden");
  jewelleryDiv.classList.add("hidden");
  electronicDiv.classList.add("hidden");
  categoryBtns.forEach((btn) => btn.classList.add("hidden"));
}
// Show filtered results based on filteredProducts array
function showFilteredResults(filteredProducts) {
  filterResDiv.classList.remove("hidden");
  updateFilterDivUi(filteredProducts);
}
// Show main product category elements
function showMainProductCategories() {
  manClothDiv.classList.remove("hidden");
  womenClothDiv.classList.remove("hidden");
  jewelleryDiv.classList.remove("hidden");
  electronicDiv.classList.remove("hidden");
  categoryBtns.forEach((btn) => btn.classList.remove("hidden"));
}

function resetFilteredResultsUI() {
  // Reset filtered results UI
  filterResDiv.innerHTML = "";
  filterResDiv.classList.add("hidden");
}

// Function to filter products based on form criteria
function filterProducts(formData) {
  let products = JSON.parse(sessionStorage.getItem("allItem"));
  let filteredProducts = products.filter((product) => {
    if (formData.has("colors[]")) {
      let selectedColors = formData.getAll("colors[]");

      if (
        !product.colors ||
        !selectedColors.some((color) =>
          product.colors.includes(color.toLowerCase())
        )
      ) {
        return false;
      }
    }

    // Filter by sizes (if radio buttons)
    if (formData.has("sizes")) {
      let selectedSize = formData.get("sizes");
      if (
        !product.sizes ||
        !product.sizes.includes(selectedSize.toUpperCase())
      ) {
        return false;
      }
    }

    // Filter by price range
    if (formData.has("price-range[]")) {
      let selectedPriceRanges = formData.getAll("price-range[]");
      if (
        !selectedPriceRanges.some((range) => {
          let price = Math.floor(product.price * 80);
          console.log(price);
          let filterRange = parseInt(range);
          switch (filterRange) {
            case 5000:
              return price >= 0 && price < 5000;
            case 10000:
              return price >= 5000 && price < 10000;
            case 20000:
              return price >= 10000 && price < 20000;
            case 40000:
              return price >= 40000;
            default:
              return false;
          }
        })
      ) {
        return false;
      }
    }

    // Filter by rating
    if (formData.has("rating")) {
      let selectedRating = parseFloat(formData.get("rating"));
      if (product.rating.rate < selectedRating) {
        return false;
      }
    }

    return true; // Product matches all selected filters
  });

  return filteredProducts;
}

function updateFilterDivUi(data) {
  filterResDiv.innerHTML = `
      <h1 class="text-xl font-bold mb-4"> Filter Results </h1>
      <div id="filter-Result" class="w-max flex"></div>
    `;
  let productDiv = document.getElementById("filter-Result");
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
    <button id="addToCartBtn" data-cat="${
      product.category
    }" onclick="addProductToCart(this, ${product?.id}, event)">
      Add to Cart
    </button>
  </div>
      `;
  });
  data.map((product) => {
    if (product?.colors) {
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
