let displayVal = JSON.parse(sessionStorage.getItem("landingPageAuthVal"));
let forgotPassBtn = document.querySelector("#forgot-password");
let forgotPassDiv = document.querySelector("#forgot-password-div");
// console.log(displayVal);
let signUpDiv_auth = document.querySelector("#sign-up");
let signInDiv_auth = document.querySelector("#sign-in");
let logInAccBtns = document.querySelectorAll(".login-acc-btn");
let createAccBtns = document.querySelectorAll(".create-acc-btn");
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
logInAccBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("title").textContent = "Sign In";
    if (!signUpDiv_auth.classList.contains("hidden"))
      signUpDiv_auth.classList.add("hidden");
    if (!forgotPassDiv.classList.contains("hidden"))
      forgotPassDiv.classList.add("hidden");
    signInDiv_auth.classList.remove("hidden");
    signInDiv_auth.classList.add("flex");
    displayVal = "login";
  });
});
createAccBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("title").textContent = "Sign Up";
    if (!signInDiv_auth.classList.contains("hidden"))
      signInDiv_auth.classList.add("hidden");
    if (!forgotPassDiv.classList.contains("hidden"))
      forgotPassDiv.classList.add("hidden");
    signUpDiv_auth.classList.remove("hidden");
    signUpDiv_auth.classList.add("flex");
    displayVal = "signup";
  });
});
forgotPassBtn.addEventListener("click", () => {
  if (!signInDiv_auth.classList.contains("hidden"))
    signInDiv_auth.classList.add("hidden");
  if (!signUpDiv_auth.classList.contains("hidden"))
    signUpDiv_auth.classList.add("hidden");
  if (signInDiv_auth.classList.contains("flex"))
    signInDiv_auth.classList.remove("flex");
  if (forgotPassDiv.classList.contains("hidden"))
    forgotPassDiv.classList.remove("hidden");
  if (!forgotPassDiv.classList.contains("flex"))
    forgotPassDiv.classList.add("flex");
});
