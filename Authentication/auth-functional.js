// Dom Elements
const navLogo = document.querySelector("#nav-logo"); // navigation logo
const navHome = document.querySelector("#nav-home"); // navigation home
const navSignin = document.querySelector("#nav-signin"); // navigation sign in
const navSignUp = document.querySelector("#nav-signup"); //navigation sign up
const navMyCart = document.querySelector("#nav-my-cart"); //navigation my cart
const navProfile = document.querySelector("#nav-profile"); //navigation profile

const signInEmailInput = document.getElementById("signin-email"); // sign in email input
const signInPasswordInput = document.getElementById("signin-password"); // sign in password input
const signInSubmitBtn = document.getElementById("signin-submit"); // sign in submit button

const firstNameInput = document.getElementById("first-name"); // first name input
const lastNameInput = document.getElementById("last-name"); //last name input
const signUpEmailInput = document.getElementById("signup-email"); // email input
const signUpPasswordInput = document.getElementById("signup-password"); //sign-up pass input
const signUpConfirmPasswordInput = document.getElementById("confirm-password"); // confirm pass input
const signUpSubmitBtn = document.getElementById("signup-submit"); //sign up btn
const registeredEmailInput = document.getElementById("registered-email"); // registered email input
const findAccBtn = document.getElementById("find-acc-btn"); // find acc btn
const newPassInput = document.getElementById("new-password"); // new password input
const newConfPassInput = document.getElementById("new-confirm-password"); // new confirm password input

let signUpDiv = document.querySelector("#sign-up"); //sign up div
let signInDiv = document.querySelector("#sign-in"); // sign in div

// getting users form local storage
let currUser = JSON.parse(localStorage.getItem("currentUser"));
// GETTING AUTH VALUE
let landingPageAuthVal = sessionStorage.getItem("landingPageAuthVal")
  ? JSON.parse(sessionStorage.getItem("landingPageAuthVal"))
  : "";

// setiing up user, if already available getting it from local storage else making an empty array
let users = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];
const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // regex for password check
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // regex for email check

// show normal alert using sweet alert
function showAlert(title, msg, icon) {
  swal({
    title: title,
    text: msg,
    icon: icon,
    button: "Okay",
  });
}

// authentication success alert function using sweetalert
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

// checking user email already registered or not
function checkUser(email) {
  return users.find((user) => user.email === email);
}

// checking password to authenticate user
function authUser(user) {
  return users.find(
    (existuser) =>
      existuser.email === user.email && existuser.password === user.password
  );
}

// adding event listener to sign in btn
signInSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let email = signInEmailInput.value;
  let password = signInPasswordInput.value;
  // checking if email and is empty
  if (email === "" && password === "") {
    showAlert("Please enter a valid email and password!!", "", "warning");
    return;
  }
  // checking if email is empty
  else if (email === "") {
    showAlert("Please enter a valid email!!", "", "warning");
    return;
  }
  // checking if password is empty
  else if (password === "") {
    showAlert("Please enter a valid password!!", "", "warning");
    return;
  }
  // checking user email is registered or not
  let user = checkUser(email);
  if (user) {
    let auth = authUser({ email: email, password: password }); // making an object of user email and password to store as current user
    if (auth) {
      let currentUser = {
        username: `${auth.firstName} ${auth.lastName}`,
        email: auth.email,
      };
      localStorage.setItem("currentUser", JSON.stringify(currentUser)); // storing in local storage
      //  authentication success alert function calling
      authSuccessAlert(
        `Welcome ${auth.firstName} ${auth.lastName}`,
        "",
        "success"
      );
    } else {
      // Password doesn't match
      showAlert("Authentication failed !!", "", "error");
    }
  } else {
    // email not found
    showAlert("User not found !!", "", "error");
  }
});

// sign up btn event listener
signUpSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // extracting values from input
  let firstName = firstNameInput.value;
  let lastName = lastNameInput.value;
  let email = signUpEmailInput.value;
  let password = signUpPasswordInput.value;
  let confirmPassword = signUpConfirmPasswordInput.value;
  // checking if any field is empty or not
  if (
    firstName === "" ||
    lastName === "" ||
    email == "" ||
    password == "" ||
    confirmPassword == ""
  ) {
    showAlert("Please fill all the fields!!", "", "warning"); //showing alert
    return;
  }
  // checking valid email using regex
  else if (!emailRegex.test(email)) {
    showAlert("Please provide a valid email address", "", "warning");
    return;
  }
  // checking valid password using reges
  else if (!passRegex.test(password)) {
    showAlert(
      "Password Requirements:\n- Minimum length of 8 characters\n- Must include at least one uppercase letter\n- Must include at least one lowercase letter\n- Must include at least one number\n- Must include at least one special character (e.g., !@#$%^&*)",
      "",
      "warning"
    );
  }
  // checking if password and confirm password are not same
  else if (password !== confirmPassword) {
    showAlert("Passwords do not match!!", "", "warning");
    return;
  }
  // cheecking if user email is already registered
  else if (checkUser(email)) {
    showAlert("Email has already been registered!", "", "warning");
    return;
  }
  // other wise creating a new object of user
  else {
    let newUser = {
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
      email: email,
      password: password,
      cart: [],
      address: "",
    };
    // pusing the new user object inside the user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users)); //saving in the local storage
    // showing successful alert
    showAlert(
      `Hi ${firstName}. Your account created successfully.`,
      "",
      "success"
    );
    // hiding the sign up ui and shoing log in ui
    signUpDiv.classList.add("hidden");
    signInDiv.classList.remove("hidden");
  }
});

// Find account button event handlers
findAccBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // collecting the value from input
  let regEmail = registeredEmailInput.value;
  // checking for empty input or not valid email format
  if (regEmail === "" || !emailRegex.test(regEmail)) {
    showAlert("Please enter a valid email address", "", "error");
    return;
  }
  // checking as user for email finding
  if (findAccBtn.innerText.toLowerCase() === "find account") {
    let foundUser = users.findIndex((user) => user.email === regEmail); // finding the email in the users array
    // if not found showing alert
    if (foundUser === -1) {
      showAlert("Sorry! Account not found", "", "error");
      return;
    }
    // if found showing alert of user found
    showAlert(
      `Hi ${users[foundUser].firstName}. Please reset your password!`,
      "",
      "success"
    );
    registeredEmailInput.disabled = true; //disabling the email input so that user can't change the input
    registeredEmailInput.classList.add("cursor-not-allowed"); // updating disabled style
    findAccBtn.innerText = "Change Password"; // changing the btn to text to change password
    newPassInput.parentElement.classList.remove("hidden"); // showing the new password input ui
    newConfPassInput.parentElement.classList.remove("hidden"); // showing the confirm password input ui
  }
  // checking if the user is changing the password
  else if (findAccBtn.innerText.toLowerCase() === "change password") {
    let foundUser = users.findIndex((user) => user.email === regEmail); //finding the user
    // extracting values from password input
    let newPassword = newPassInput.value;
    let newConfPassword = newConfPassInput.value;
    // checking proper format of password using regex if not showing alert
    if (!passRegex.test(newPassword) || !passRegex.test(newConfPassword)) {
      showAlert(
        "Password Requirements:\n- Minimum length of 8 characters\n- Must include at least one uppercase letter\n- Must include at least one lowercase letter\n- Must include at least one number\n- Must include at least one special character (e.g., !@#$%^&*)",
        "",
        "warning"
      );
      return;
    }
    // checking the new password and confirm password are same or not
    if (newPassword !== newConfPassword) {
      showAlert("Passwords do not match!", "", "warning");
      return;
    }
    // checking and changing the password and showing alert
    if (foundUser !== undefined) {
      users[foundUser].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      showAlert(
        `Hi ${users[foundUser].firstName}. Your password changed successfully.`,
        "",
        "success"
      );

      registeredEmailInput.disabled = false; // making email input enabled
      registeredEmailInput.classList.remove("cursor-not-allowed"); // updating the styling of cursor
      findAccBtn.innerText = "Find Account"; //changing the btn text to find account
      newPassInput.parentElement.classList.add("hidden"); //hiding the password inputs
      newConfPassInput.parentElement.classList.add("hidden"); //hiding the password inputs
      forgotPassDiv.classList.add("hidden"); //hiding the forgot password ui
      forgotPassDiv.classList.remove("flex"); // removing requied class
      signInDiv_auth.classList.remove("hidden"); // showing sign in div
      signInDiv_auth.classList.add("flex"); //adding required class
    }
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

// checking if user is logged in or not
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
//calling the function for UI update in nav
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

// Navigation btn route control
handleNavigation(navSignUp, "../Authentication/sign-in-up.html", "signup");
handleNavigation(navSignin, "./sign-in-up.html", "login");
handleNavigation(navLogo, "../index.html", "navLogo");
handleNavigation(navHome, "../shop/index.html", "login");
handleNavigation(navProfile, "../profile/index.html", "login");
handleNavigation(navMyCart, "../cart/index.html", "login");
