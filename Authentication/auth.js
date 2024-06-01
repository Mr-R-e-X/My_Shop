let displayVal = JSON.parse(sessionStorage.getItem("landingPageAuthVal"));
console.log(displayVal);
let signUpDiv = document.querySelector("#sign-up");
let signInDiv = document.querySelector("#sign-in");
let logInAccBtn = document.querySelector("#login-acc-btn");
let createAccBtn = document.querySelector("#create-acc-btn");
if (displayVal === "login") {
  signInDiv.classList.toggle("hidden");
  signInDiv.classList.toggle("flex");
  document.querySelector("title").textContent = "Sign In";
} else if (displayVal === "signup") {
  signUpDiv.classList.toggle("hidden");
  signUpDiv.classList.toggle("flex");
  document.querySelector("title").textContent = "Sign Up";
} else {
  document.querySelector("title").textContent = "Sign In";
  signInDiv.classList.toggle("hidden");
  signInDiv.classList.toggle("flex");
  displayVal = "login";
}
logInAccBtn.addEventListener("click", () => {
  document.querySelector("title").textContent = "Sign In";
  signUpDiv.classList.add("hidden");
  signInDiv.classList.remove("hidden");
  signInDiv.classList.add("flex");
  displayVal = "login";
  displayImg(displayVal);
});
createAccBtn.addEventListener("click", () => {
  document.querySelector("title").textContent = "Sign Up";
  signInDiv.classList.add("hidden");
  signUpDiv.classList.remove("hidden");
  signUpDiv.classList.add("flex");
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
