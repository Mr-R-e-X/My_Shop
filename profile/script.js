const navCartItemCount = document.querySelector("#my-cart");
const profileTitle = document.getElementById("title");
const personalInfo = document.getElementById("personalInfo");
const orderHistory = document.getElementById("prevOrder");
const passwordDiv = document.getElementById("changePassword");

// If user is not available in Session Storage redirecting the page to the Landing Page
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => user.email === currUser.email);
console.log(currUserFound);
function updateProfileTitleUi(user) {
  profileTitle.innerHTML = `<h1 class="text-2xl font-semibold italic text-center text-gray-800">Hello, ${user.firstName} ${user.lastName}.</h1>`;
}

function updateProfileInfoUi(user) {
  personalInfo.innerHTML = `
  <div>
    <div class="flex justify-between items-center mb-2">
      <p class="text-lg font-semibold text-gray-700">Name</p>
      <span id="editPersonalInfo" class="text-blue-600 cursor-pointer hover:underline">Edit</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <input id="firstName" value="${user.firstName}" type="text" disabled class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">
      </div>
      <div>
        <input id="lastName" value="${user.lastName}" type="text" disabled class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">
      </div>
    </div>
  </div>
  
  <!-- Email Section -->
  <div>
    <div class="flex justify-between items-center mb-2">
      <p class="text-lg font-semibold text-gray-700">Email</p>
      <span id="editEmail" class="text-blue-600 cursor-pointer hover:underline">Edit</span>
    </div>
    <div>
      <input id="email" value="${user.email}" type="email" disabled class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500">
    </div>
  </div>
</div>
`;
  let editPersonalInfo = document.getElementById("editPersonalInfo");
  let editEmail = document.getElementById("editEmail");
  let firstNameInput = document.getElementById("firstName");
  let lastNameInput = document.getElementById("lastName");
  let email = document.getElementById("email");

  editPersonalInfo.addEventListener("click", (e) => {
    if (editPersonalInfo.innerText === "Edit") {
      editPersonalInfo.innerText = "Save";
      firstNameInput.disabled = false;
      lastNameInput.disabled = false;
      removeClass(firstNameInput, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);
      removeClass(lastNameInput, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);
    } else if (editPersonalInfo.innerText === "Save") {
      // Perform save action
      let changedFirstName = firstNameInput.value.toUpperCase();
      let changedLastName = lastNameInput.value.toUpperCase();

      currUserFound.firstName = changedFirstName;
      currUserFound.lastName = changedLastName;

      firstNameInput.value = user.firstName;
      lastNameInput.value = user.lastName;

      saveInSession("currentUser", currUserFound);
      saveUserInLocalStorage(currUserFound);

      firstNameInput.disabled = true;
      lastNameInput.disabled = true;
      addClass(firstNameInput, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);
      addClass(lastNameInput, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);

      editPersonalInfo.innerText = "Edit";
      updateProfileTitleUi(currUserFound);
    }
  });
  editEmail.addEventListener("click", () => {
    if (editEmail.innerText === "Edit") {
      editEmail.innerText = "Save";
      email.disabled = false;
      removeClass(email, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);
    } else if (editEmail.innerText === "Save") {
      let changedEmail = email.value.toLowerCase();

      currUserFound.email = changedEmail;
      email.value = currUserFound.email;

      saveInSession("currentUser", currUserFound);
      saveUserInLocalStorage(currUserFound);

      email.disabled = true;
      addClass(email, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);

      editEmail.innerText = "Edit";
    }
  });
}

function removeClass(elem, classname) {
  classname.map((name) => {
    elem.classList.remove(name);
  });
}
function addClass(elem, classname) {
  classname.map((name) => {
    elem.classList.add(name);
  });
}

function updateProfleChangePasswordUi(user) {
  passwordDiv.innerHTML = `
  <div class="flex justify-between items-center mb-2">
    <p class="text-lg font-semibold text-gray-700">Change Password</p>
  </div>
  <div class="space-y-4">
    <div>
      <label for="oldPassword" class="block text-sm font-medium text-gray-700">Old Password</label>
      <input id="oldPassword" type="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500">
    </div>
    <div>
      <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
      <input id="newPassword" type="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500">
    </div>
    <div>
      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
      <input id="confirmPassword" type="password" class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500">
    </div>
    <div class="flex justify-end">
      <button class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Change Password
      </button>
    </div>
  </div>
</div>
`;
}

function updateOrderListUi(orderList) {
  let sortedOrderList = orderList.sort((a, b) => b.timestamp - a.timestamp);
  orderHistory.innerHTML = `
  <div class="flex justify-between items-center mb-2">
      <p class="text-lg font-semibold text-gray-700">Your Orders</p>
    </div>
    <div class="space-y-4">
       ${orderList.map((order) => `${OrderUi(order)}`).join("")}
    </div>
  `;
}
function OrderUi(order) {
  let orderId = order.timestamp;
  let orderDate = formatDate(new Date(orderId), 0);
  let deliveryDate = formatDate(new Date(orderId), 1);
  let orderStatus = order.status;
  let shippingStatus;
  if (order.shippingStatus === "pending") {
    shippingStatus = "In Transit";
  } else {
    shippingStatus = `Delivered on ${deliveryDate}`;
  }
  let totalAmount = order.orderDetails.reduce(
    (sum, item) => sum + Math.round(item.price * 80),
    0
  );
  return `
    <div class="p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer" onclick="detailOrder(${orderId})">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600">Order Number</p>
          <p class="text-gray-800 font-semibold">${orderId}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600">Order Date</p>
          <p class="text-gray-800 font-semibold">${orderDate}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600">Status</p>
          <p class="text-gray-800 font-semibold">${shippingStatus}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600">Total Amount</p>
          <p class="text-gray-800 font-semibold">&#8377;${totalAmount.toFixed(
            2
          )}</p>
        </div>
      </div>
    </div>
  `;
}
function formatDate(date, val) {
  const day = String(date.getDate() + val).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function detailOrder(orderId) {
  let order = currUserFound.orders.find((item) => item.timestamp === orderId);
  if (order) {
    saveInSession("order", order);
    window.location.href = "./orders.html";
  }
}

function saveInSession(storeName, data) {
  sessionStorage.setItem(storeName, JSON.stringify(data));
}

function saveUserInLocalStorage(user_data) {
  let index = users.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    users[index] = user_data;
  }
  localStorage.setItem("users", JSON.stringify(users));
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

document.addEventListener("DOMContentLoaded", () => {
  updateMyCartNavbarUi(currUser.cart);
  updateProfileTitleUi(currUserFound);
  updateProfileInfoUi(currUserFound);
  updateProfleChangePasswordUi(currUserFound);
  updateOrderListUi(currUserFound.orders);
});
