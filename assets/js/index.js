// MENU LINKS

// SCROLLBARR
let header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("menuScroll", window.scrollY > 80);
});

// OPEN MENU
let openMenu = document.querySelector(".open-menu");
let navMenu = document.querySelector("header nav");
let closeMenu = document.querySelector(".close-menu");
let closeLink = document.querySelector(".close-link");

openMenu.addEventListener("click", function () {
  navMenu.style.display = "flex";
  openMenu.style.display = "none";
  closeMenu.style.display = "flex";
});

closeMenu.addEventListener("click", function () {
  navMenu.style.display = "none";
  openMenu.style.display = "flex";
  closeMenu.style.display = "none";
});

closeLink.addEventListener("click", function () {
  navMenu.style.display = "none";
  openMenu.style.display = "flex";
  closeMenu.style.display = "none";
});
