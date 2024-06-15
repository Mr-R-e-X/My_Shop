let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
let users = JSON.parse(localStorage.getItem("users"));
let currUserFound = users.find((user) => (user.email = currUser.email));
console.log(currUserFound);
