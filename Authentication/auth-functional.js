// Dom Elements
const signInEmailInput = document.getElementById("signin-email");
const signInPasswordInput = document.getElementById("signin-password");
const signInSubmitBtn = document.getElementById("signin-submit");

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const signUpEmailInput = document.getElementById("signup-email");
const signUpPasswordInput = document.getElementById("signup-password");
const signUpConfirmPasswordInput = document.getElementById("confirm-password");
const signUpSubmitBtn = document.getElementById("signup-submit");

// getting users form local storage

let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}

function checkUser(email) {
  return users.find((user) => user.email === email);
}

function authUser(user) {
  return users.find(
    (existuser) =>
      existuser.email === user.email && existuser.password === user.password
  );
}

signInSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = signInEmailInput.value;
  let password = signInPasswordInput.value;
  if (email === "" && password === "") {
    showAlert("Oops!", "Please enter a valid email and password!!", "error");
  } else if (email === "") {
    showAlert("Oops!", "Please enter a valid email!!", "error");
  } else if (password === "") {
    showAlert("Oops!", "Please enter a valid password!!", "error");
  }
  let user = checkUser(email);
  if (user) {
    let auth = authUser({ email: email, password: password });
    if (auth) {
      showAlert("Success", `Welcome ${auth.name}`, "success");
    } else {
      showAlert("Oops!", "Authentication failed !!", "error");
    }
  } else {
    showAlert("Oops!", "User not found !!", "error");
  }
});

sign;
