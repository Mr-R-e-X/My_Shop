const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");

const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");
let landingPageAuthVal = sessionStorage.getItem("landingPageAuthVal")
  ? JSON.parse(sessionStorage.getItem("landingPageAuthVal"))
  : "";

function sendingPageAuthVal(val) {
  landingPageAuthVal = val;
  sessionStorage.setItem(
    "landingPageAuthVal",
    JSON.stringify(landingPageAuthVal)
  );
  window.location.href = "./Authentication/sign-in-up.html";
}
loginBtn.addEventListener("click", () => {
  sendingPageAuthVal("login");
});
signupBtn.addEventListener("click", () => {
  sendingPageAuthVal("signup");
});

navSignUp.addEventListener("click", () => {
  sendingPageAuthVal("signup");
});
navSignin.addEventListener("click", () => {
  sendingPageAuthVal("login");
});
