// getting data to control ui of SIGN IN , SIGN UP.
let displayVal = JSON.parse(sessionStorage.getItem("landingPageAuthVal"));
// DOM Elements
let forgotPassBtn = document.querySelector("#forgot-password"); //forgot password btn
let forgotPassDiv = document.querySelector("#forgot-password-div"); //forgot password div
let signUpDiv_auth = document.querySelector("#sign-up"); //sign up div
let signInDiv_auth = document.querySelector("#sign-in"); //sign in div
let logInAccBtns = document.querySelectorAll(".login-acc-btn"); //login btns
let createAccBtns = document.querySelectorAll(".create-acc-btn"); // create account btns

// checking value and displaying ui
if (displayVal === "login") {
  signInDiv_auth.classList.toggle("hidden");
  signInDiv_auth.classList.toggle("flex");
  document.querySelector("title").textContent = "Sign In";
} else if (displayVal === "signup") {
  signUpDiv_auth.classList.toggle("hidden");
  signUpDiv_auth.classList.toggle("flex");
  document.querySelector("title").textContent = "Sign Up";
} else {
  document.querySelector("title").textContent = "Sign In";
  signInDiv_auth.classList.toggle("hidden");
  signInDiv_auth.classList.toggle("flex");
  displayVal = "login";
}

// adding event listener to all login btns
logInAccBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("title").textContent = "Sign In";
    if (!signUpDiv_auth.classList.contains("hidden"))
      signUpDiv_auth.classList.add("hidden"); //hide signup div
    if (!forgotPassDiv.classList.contains("hidden"))
      forgotPassDiv.classList.add("hidden"); //hide forgot password div
    signInDiv_auth.classList.remove("hidden"); // show sign in div
    signInDiv_auth.classList.add("flex"); //adding required class
    displayVal = "login";
  });
});

// adding event listener to all create account btn
createAccBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("title").textContent = "Sign Up"; // changing page title
    if (!signInDiv_auth.classList.contains("hidden"))
      signInDiv_auth.classList.add("hidden"); //hiding sign in div
    if (!forgotPassDiv.classList.contains("hidden"))
      forgotPassDiv.classList.add("hidden"); // hiding forgot password div
    signUpDiv_auth.classList.remove("hidden"); // show sign up div
    signUpDiv_auth.classList.add("flex"); //adding required class
    displayVal = "signup";
  });
});

//adding event listener to forgot password btn
forgotPassBtn.addEventListener("click", () => {
  if (!signInDiv_auth.classList.contains("hidden"))
    signInDiv_auth.classList.add("hidden"); //hide sign in div
  if (!signUpDiv_auth.classList.contains("hidden"))
    signUpDiv_auth.classList.add("hidden"); //hide sign up div
  if (signInDiv_auth.classList.contains("flex"))
    signInDiv_auth.classList.remove("flex"); // remove required class form sign in div
  if (forgotPassDiv.classList.contains("hidden"))
    forgotPassDiv.classList.remove("hidden"); //show forgot password div
  if (!forgotPassDiv.classList.contains("flex"))
    forgotPassDiv.classList.add("flex"); // adding required class to forgot password div
});
