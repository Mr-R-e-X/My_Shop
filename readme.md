const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");

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
window.location.href = "./Authentication/sign-in-up.html";
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
window.location.href = "./shop/index.html";
} else {
window.location.href = "./index.html";
}
});
navLogo.addEventListener("click", () => {
if (checkLoggedIn()) {
window.location.href = "./shop/index.html";
} else {
sendingPageAuthVal("login");
}
});
navHome.addEventListener("click", () => {
if (checkLoggedIn) {
window.location.href = "./shop/index.html";
} else {
sendingPageAuthVal("login");
}
});

navProfile.addEventListener("click", () => {
if (checkLoggedIn()) {
window.location.href = "./profile/index.html";
} else {
sendingPageAuthVal("login");
}
});

navMyCart.addEventListener("click", () => {
if (checkLoggedIn()) {
window.location.href = "./cart/index.html";
} else {
sendingPageAuthVal("login");
}
});

navProfile.addEventListener("click", () => {
if (checkLoggedIn()) {
window.location.href = "./profile/index.html";
} else {
sendingPageAuthVal("login");
}
});
