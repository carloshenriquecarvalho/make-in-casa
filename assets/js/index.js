const header = document.querySelector("header");
const navMenu = document.querySelector("header nav");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const closeLink = document.querySelector(".close-link");

window.addEventListener("scroll", () => {
  header.classList.toggle("menuScroll", window.scrollY > 80);
});

const openMobileMenu = () => {
  header.classList.add("menu-open");
};

const closeMobileMenu = () => {
  header.classList.remove("menu-open");
};

openMenu.addEventListener("click", openMobileMenu);
closeMenu.addEventListener("click", closeMobileMenu);
closeLink.addEventListener("click", closeMobileMenu);
