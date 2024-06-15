// TARGETING DOM ELEMRNTS
const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");
const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");

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
// MAIN PAGE BTN CONTROL
loginBtn.addEventListener("click", () => {
  sendingPageAuthVal("login");
});
signupBtn.addEventListener("click", () => {
  sendingPageAuthVal("signup");
});

// NAVBAR BTNS CONTROL
navSignUp.addEventListener("click", () => {
  sendingPageAuthVal("signup");
});
navSignin.addEventListener("click", () => {
  sendingPageAuthVal("login");
});
