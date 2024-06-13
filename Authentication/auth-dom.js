let displayVal = JSON.parse(sessionStorage.getItem("landingPageAuthVal"));
console.log(displayVal);
let signUpDiv_auth = document.querySelector("#sign-up");
let signInDiv_auth = document.querySelector("#sign-in");
let logInAccBtn = document.querySelector("#login-acc-btn");
let createAccBtn = document.querySelector("#create-acc-btn");
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
logInAccBtn.addEventListener("click", () => {
  document.querySelector("title").textContent = "Sign In";
  signUpDiv_auth.classList.add("hidden");
  signInDiv_auth.classList.remove("hidden");
  signInDiv_auth.classList.add("flex");
  displayVal = "login";
  displayImg(displayVal);
});
createAccBtn.addEventListener("click", () => {
  document.querySelector("title").textContent = "Sign Up";
  signInDiv_auth.classList.add("hidden");
  signUpDiv_auth.classList.remove("hidden");
  signUpDiv_auth.classList.add("flex");
  displayVal = "signup";
  displayImg(displayVal);
});
function displayImg(val) {
  if (val === "signup") {
    document.getElementById("signInImg").classList.add("hidden");
    document.getElementById("signUpImg").classList.remove("hidden");
  } else if (val === "login") {
    document.getElementById("signInImg").classList.remove("hidden");
    document.getElementById("signUpImg").classList.add("hidden");
  }
}
displayImg(displayVal);
