// Dom Elements
const navLogo = document.querySelector("#nav-logo");
const navHome = document.querySelector("#nav-home");
const navSignin = document.querySelector("#nav-signin");
const navSignUp = document.querySelector("#nav-signup");
const navMyCart = document.querySelector("#nav-my-cart");
const navProfile = document.querySelector("#nav-profile");

const signInEmailInput = document.getElementById("signin-email");
const signInPasswordInput = document.getElementById("signin-password");
const signInSubmitBtn = document.getElementById("signin-submit");

const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const signUpEmailInput = document.getElementById("signup-email");
const signUpPasswordInput = document.getElementById("signup-password");
const signUpConfirmPasswordInput = document.getElementById("confirm-password");
const signUpSubmitBtn = document.getElementById("signup-submit");

let signUpDiv = document.querySelector("#sign-up");
let signInDiv = document.querySelector("#sign-in");
// getting users form local storage

let currUser = JSON.parse(localStorage.getItem("currentUser"));
// GETTING AUTH VALUE
let landingPageAuthVal = sessionStorage.getItem("landingPageAuthVal")
  ? JSON.parse(sessionStorage.getItem("landingPageAuthVal"))
  : "";
let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}

function authSuccessAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  }).then(() => {
    window.location.href = "../shop/index.html";
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
    showAlert("Oops!", "Please enter a valid email and password!!", "warning");
    return;
  } else if (email === "") {
    showAlert("Oops!", "Please enter a valid email!!", "warning");
    return;
  } else if (password === "") {
    showAlert("Oops!", "Please enter a valid password!!", "warning");
    return;
  }
  let user = checkUser(email);
  if (user) {
    let auth = authUser({ email: email, password: password });
    if (auth) {
      // console.log(auth);
      let currentUser = {
        username: `${auth.firstName} ${auth.lastName}`,
        email: auth.email,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      authSuccessAlert(
        "Success",
        `Welcome ${auth.firstName} ${auth.lastName}`,
        "success"
      );
    } else {
      showAlert("Oops!", "Authentication failed !!", "error");
    }
  } else {
    showAlert("Oops!", "User not found !!", "error");
  }
});

signUpSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let email = signUpEmailInput.value;
  let password = signUpPasswordInput.value;
  let confirmPassword = signUpConfirmPasswordInput.value;
  if (
    firstName === "" ||
    lastName === "" ||
    email == "" ||
    password == "" ||
    confirmPassword == ""
  ) {
    showAlert("Oops!", "Please fill all the fields!!", "warning");
    return;
  } else if (!emailRegex.test(email)) {
    showAlert("Oops!", "Please provide a valid email address", "warning");
    return;
  } else if (!passRegex.test(password)) {
    showAlert(
      "Oops!",
      "Password Requirements:\n- Minimum length of 8 characters\n- Must include at least one uppercase letter\n- Must include at least one lowercase letter\n- Must include at least one number\n- Must include at least one special character (e.g., !@#$%^&*)",
      "warning"
    );
  } else if (password !== confirmPassword) {
    showAlert("Oops!", "Passwords do not match!!", "warning");
    return;
  } else if (checkUser(email)) {
    showAlert("Oops!", "Email has already been registered!", "warning");
    return;
  } else {
    let newUser = {
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      email: email,
      password: password,
      cart: [],
      address: "",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showAlert(
      "Success",
      `Hi ${firstName}. Your account created successfully.`,
      "success"
    );
    signUpDiv.classList.add("hidden");
    document.getElementById("signUpImg").classList.add("hidden");
    document.getElementById("signInImg").classList.remove("hidden");
    signInDiv.classList.remove("hidden");
  }
});

// NAVBAR BTNS CONTROL
function sendingPageAuthVal(val) {
  if (val === "navLogo") {
    window.location.href = "../index.html";
    return;
  }
  landingPageAuthVal = val;
  sessionStorage.setItem(
    "landingPageAuthVal",
    JSON.stringify(landingPageAuthVal)
  );
  window.location.href = "../Authentication/sign-in-up.html";
}
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
handleNavigation(navSignin, "./sign-in-up.html", "login");
handleNavigation(navLogo, "../index.html", "navLogo");
handleNavigation(navHome, "../shop/index.html", "login");
handleNavigation(navProfile, "../profile/index.html", "login");
handleNavigation(navMyCart, "../cart/index.html", "login");
