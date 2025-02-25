const navbar = document.querySelector("#navbar");
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-links");

let isNavbarExpanded = navbarToggle.getAttribute("aria-expanded") === "true";

const toggleNavbarVisibility = () => {
  isNavbarExpanded = !isNavbarExpanded;
  navbarToggle.setAttribute("aria-expanded", isNavbarExpanded);

  // Solo bloquear scroll si el botón hamburguesa es visible
  if (window.innerWidth <= 768) {
    document.body.classList.toggle("no-scroll", isNavbarExpanded);
  }
};

// Evento para el botón hamburguesa
navbarToggle.addEventListener("click", toggleNavbarVisibility);

// Evitar que los clics dentro del menú lo cierren
navbarLinksContainer.addEventListener("click", (e) => e.stopPropagation());

// Solo cerrar el menú cuando se haga click fuera de los enlaces
navbarMenu.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    toggleNavbarVisibility();
  }
});
