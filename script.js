// TARGETING DOM ELEMRNTS
const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");
const loginBtn = document.querySelector("#login-btn");
const signupBtn = document.querySelector("#signup-btn");

let currUser = JSON.parse(localStorage.getItem("currentUser"));
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
function checkLoggedIn() {
  return currUser !== null;
}
// checking if user is available in the sessions storage and updating the ui
const updateUIBasedOnLoginStatus = () => {
  if (!checkLoggedIn()) {
    navProfile.classList.add("hidden");
    navHome.classList.add("hidden");
    navMyCart.classList.add("hidden");
    navSignin.classList.remove("hidden");
    navSignUp.classList.remove("hidden");
  } else {
    navProfile.classList.remove("hidden");
    navHome.classList.remove("hidden");
    navMyCart.classList.remove("hidden");
    navSignin.classList.add("hidden");
    navSignUp.classList.add("hidden");
  }
};

updateUIBasedOnLoginStatus();
// Add event listeners
const handleNavigation = (element, path, authValue = null) => {
  element.addEventListener("click", () => {
    if (checkLoggedIn()) {
      window.location.href = path;
    } else if (authValue) {
      console.log(authValue);
      sendingPageAuthVal(authValue);
    }
  });
};
handleNavigation(navSignUp, "../Authentication/sign-in-up.html", "signup");
handleNavigation(navSignin, "../Authentication/sign-in-up.html", "login");
handleNavigation(navLogo, "../shop/index.html", "login");
handleNavigation(navHome, "../shop/index.html", "login");
handleNavigation(navProfile, "../profile/index.html", "login");
handleNavigation(navMyCart, "../cart/index.html", "login");
