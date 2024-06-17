const navCartItemCount = document.querySelector("#my-cart");

// If user is not available in Session Storage redirecting the page to the Landing Page
let currUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (currUser === null) window.location.href = "../index.html";
function updateMyCartNavbarUi(cart) {
  let count = 0;
  cart.map((item) => {
    count += item.count;
  });
  if (count === 0) navCartItemCount.classList.add("hidden");
  else {
    navCartItemCount.classList.remove("hidden");
    navCartItemCount.innerText = count;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateMyCartNavbarUi(currUser.cart);
});
