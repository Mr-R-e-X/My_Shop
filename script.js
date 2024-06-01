let loginBtn = document.querySelector("#login-btn");
let signupBtn = document.querySelector("#signup-btn");
let landingPageAuthVal = sessionStorage.getItem("landingPageAuthVal")
  ? JSON.parse(sessionStorage.getItem("landingPageAuthVal"))
  : "";
loginBtn.addEventListener("click", () => {
  landingPageAuthVal = "login";
  sessionStorage.setItem(
    "landingPageAuthVal",
    JSON.stringify(landingPageAuthVal)
  );
  window.location.href = "./Authentication/sign-in-up.html";
});
signupBtn.addEventListener("click", () => {
  landingPageAuthVal = "signup";
  sessionStorage.setItem(
    "landingPageAuthVal",
    JSON.stringify(landingPageAuthVal)
  );
  window.location.href = "./Authentication/sign-in-up.html";
});
