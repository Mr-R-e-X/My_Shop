// If user is not available in Session Storage redirecting the page to the Landing Page
let currUser = JSON.parse(localStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";

// accessing dom elements
const navCartItemCount = document.querySelector("#my-cart");
const profileTitle = document.getElementById("title");
const personalInfo = document.getElementById("personalInfo");
const orderHistory = document.getElementById("prevOrder");
const passwordDiv = document.getElementById("changePassword");

// getting user data from local storage
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => user.email === currUser.email);

// updating profile title
function updateProfileTitleUi(user) {
  profileTitle.innerHTML = `<h1 class="text-2xl font-semibold italic text-center text-gray-800">Hello, ${user.firstName} ${user.lastName}.</h1>`;
}

// updating user info
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
  // acessing dom elements in the ui
  let editPersonalInfo = document.getElementById("editPersonalInfo"); //edit btn for name inputs
  let editEmail = document.getElementById("editEmail"); // edit btn for email input
  let firstNameInput = document.getElementById("firstName"); //first name input
  let lastNameInput = document.getElementById("lastName"); // last name input
  let email = document.getElementById("email"); // email input

  //adding event listener
  editPersonalInfo.addEventListener("click", (e) => {
    // checking the inner text of the btn and making changes in the ui
    if (editPersonalInfo.innerText === "Edit") {
      editPersonalInfo.innerText = "Save"; // changing the inner text to dave
      firstNameInput.disabled = false; // enabled name input
      lastNameInput.disabled = false; // enabled name input
      // calling the the remove class function to remove required styling
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
    }
    // if the inner text is "save" then changing the user data
    else if (editPersonalInfo.innerText === "Save") {
      // collecting the input data
      let changedFirstName = firstNameInput.value.toUpperCase();
      let changedLastName = lastNameInput.value.toUpperCase();

      //changing the data in current user
      currUserFound.firstName = changedFirstName;
      currUserFound.lastName = changedLastName;
      // changing the data in the input field
      firstNameInput.value = user.firstName;
      lastNameInput.value = user.lastName;
      // saving in local storage
      localStorage.setItem("currentUser", JSON.stringify(currUserFound));
      saveUserInLocalStorage(currUserFound); //saving the current user in the users oarray
      // reapplying default styling
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

      editPersonalInfo.innerText = "Edit"; //changing the inner text to edit
      // updating the profile title
      updateProfileTitleUi(currUserFound);
    }
  });
  // handling edit email btn
  editEmail.addEventListener("click", () => {
    // if inner text is edit then allow user to edit data
    if (editEmail.innerText === "Edit") {
      editEmail.innerText = "Save"; //changing the inner text to save
      email.disabled = false;
      removeClass(email, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);
    } else if (editEmail.innerText === "Save") {
      // collecting the changed data
      let changedEmail = email.value.toLowerCase();
      // saving in the currnt user
      currUserFound.email = changedEmail;
      email.value = currUserFound.email;
      // saving in local storage
      localStorage.setItem("currentUser", JSON.stringify(currUserFound));
      saveUserInLocalStorage(currUserFound);
      //applying default styling
      email.disabled = true;
      addClass(email, [
        "cursor-not-allowed",
        "disabled:bg-gray-100",
        "disabled:text-gray-500",
      ]);

      editEmail.innerText = "Edit"; //changing the inner text to edit
    }
  });
}

// remove class function
function removeClass(elem, classname) {
  classname.map((name) => {
    elem.classList.remove(name);
  });
}
// add class function
function addClass(elem, classname) {
  classname.map((name) => {
    elem.classList.add(name);
  });
}

// updating the ui for change password
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
      <button id="changePasswordBtn" class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        Change Password
      </button>
    </div>
  </div>
</div>
`;
  // handling the dom elements
  let oldPasswordInput = document.getElementById("oldPassword"); //old password
  let newPasswordInput = document.getElementById("newPassword"); //new password
  let confirmPasswordInput = document.getElementById("confirmPassword"); //confirm password
  let changePasswordBtn = document.getElementById("changePasswordBtn"); //change password btn

  //handing click on change password
  changePasswordBtn.addEventListener("click", () => {
    // collecting values
    let oldPass = oldPasswordInput.value;
    let newPass = newPasswordInput.value;
    let confPass = confirmPasswordInput.value;
    // checking empty values
    if (oldPass === "" || newPass === "" || confPass === "") {
      showAlert("Please fill all the details", "", "error");
      return;
    }
    // checking if old password is correct or not
    if (oldPass !== currUserFound.password) {
      showAlert("Old Password doesn't match", "", "error");
      return;
    }
    // checking if new password and confirm password are same or not
    if (newPass !== confPass) {
      showAlert(
        "New Password and Confirm Password have to be same!",
        "",
        "error"
      );
      return;
    }
    // if old password or new password both are same then show alert
    if (oldPass === newPass) {
      showAlert("Old Password and New Password san not be same !", "", "error");
      return;
    }
    // checking old password and checking the new and confirm password
    if (oldPass === currUserFound.password && newPass === confPass) {
      currUserFound.password = newPass; //changing old password
      // updating in local storage
      localStorage.setItem("currentUser", JSON.stringify(currUserFound));
      saveUserInLocalStorage(currUserFound);
      showAlert("Password changed successfully !", "", "success");
      // making the inputs empty
      oldPasswordInput.value = "";
      newPasswordInput.value = "";
      confirmPasswordInput.value = "";
    }
  });
}

// showing alert
function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}
// updating the order
function updateOrderListUi(orderList) {
  // if order list is empty then don't update the ui
  if (!orderList) {
    return;
  }

  let sortedOrderList = orderList.sort((a, b) => b.timestamp - a.timestamp); // sorting as per ordered time
  orderHistory.innerHTML = `
  <div class="flex justify-between items-center mb-2">
      <p class="text-lg font-semibold text-gray-700">Your Orders</p>
    </div>
    <div class="space-y-4">
       ${sortedOrderList.map((order) => `${OrderUi(order)}`).join("")}
    </div>
  `;
}

// order ui function
function OrderUi(order) {
  let orderId = order.timestamp;
  let orderDate = new Date(orderId).toLocaleDateString("en-IN");
  let deliveryDate = new Date(24 * 60 * 60 * 1000 + orderId).toLocaleDateString(
    "en-IN"
  );
  let orderStatus = order.status;
  let shippingStatus;
  if (order.shippingStatus === "pending") {
    shippingStatus = "In Transit";
    statusColor = "text-orange-500"; // Orange color for pending
  } else {
    shippingStatus = `Delivered on ${deliveryDate}`;
    statusColor = "text-green-600"; // Green color for delivered
  }
  let totalAmount = order.orderDetails.reduce(
    (sum, item) => sum + Math.round(item.price * 80),
    0
  );
  return `
    <div class="p-4 border border-gray-300 rounded-lg shadow-sm cursor-pointer" onclick="detailOrder(${orderId})">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600 font-medium">Order Number</p>
          <p class="text-blue-600 font-semibold">${orderId}</p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600 font-medium">Order Date</p>
          <p class="text-green-600 font-semibold">${orderDate}</p>
        </div>
        
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600 font-medium">Status</p>
          ${
            orderStatus === "confirmed"
              ? `
            <p class="${statusColor} font-semibold">${shippingStatus}</p>
          `
              : `
            <p class="text-red-600 font-semibold capitalize">${orderStatus}</p>
          `
          }
        </div>
        <div class="flex flex-col justify-center items-center">
          <p class="text-gray-600 font-medium">Total Amount</p>
          <p class="text-green-600 font-semibold">&#8377;${totalAmount.toFixed(
            2
          )}</p>
        </div>
      </div>
    </div>
  `;
}

// if user click on any order on ohe order list ui it will redirect to the details order page
function detailOrder(orderId) {
  let order = currUserFound.orders.find((item) => item.timestamp === orderId);
  if (order) {
    saveInSession("order", order);
    window.location.href = "./orders.html";
  }
}

// saving in session function
function saveInSession(storeName, data) {
  sessionStorage.setItem(storeName, JSON.stringify(data));
}

// saving in localStorage function
function saveUserInLocalStorage(user_data) {
  let index = users.findIndex((user) => user.email === user_data.email);
  if (index !== -1) {
    users[index] = user_data;
  }
  localStorage.setItem("users", JSON.stringify(users));
}

// updating nav cart ui
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

// calling the required function
document.addEventListener("DOMContentLoaded", () => {
  updateMyCartNavbarUi(currUserFound.cart);
  updateProfileTitleUi(currUserFound);
  updateProfileInfoUi(currUserFound);
  updateProfleChangePasswordUi(currUserFound);
  updateOrderListUi(currUserFound.orders);
});
