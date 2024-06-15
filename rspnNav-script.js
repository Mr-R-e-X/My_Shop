// Controlling Responsiveness
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const iconPath = document.getElementById("iconPath");
  const nav = document.getElementById("rspn-nav");
  let isOpen = false;

  toggleButton.addEventListener("click", function () {
    if (isOpen) {
      // Change to hamburger menu icon
      iconPath.setAttribute(
        "d",
        "M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
      );
      nav.classList.toggle("hidden");
    } else {
      // Change to close icon
      iconPath.setAttribute(
        "d",
        "M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
      );
      nav.classList.toggle("hidden");
    }
    isOpen = !isOpen;
  });
});
