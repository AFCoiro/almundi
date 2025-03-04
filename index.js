const navbar = document.querySelector("#navbar");
const navbarToggle = navbar.querySelector("#navbar-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinksContainer = navbarMenu.querySelector(".navbar-cont-links");

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

/*Paralaz para section azul */


document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const wrapper = document.querySelector(".carousel-wrapper");
  const btnLeft = document.querySelector(".left");
  const btnRight = document.querySelector(".right");
  const indicators = document.querySelector(".carousel-indicators");
  
  let index = 0;
  const cards = document.querySelectorAll(".cards");
  const cardWidth = 315; // 300px + 15px de gap

  function updateCarousel() {
      const visibleCards = Math.floor(wrapper.clientWidth / cardWidth);
      const totalCards = cards.length;
      const maxIndex = totalCards - visibleCards;

      // Mover carrusel
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;

      // Actualizar indicadores
      indicators.innerHTML = "";
      for (let i = 0; i <= maxIndex; i++) {
          let dot = document.createElement("span");
          if (i === index) dot.classList.add("active");
          indicators.appendChild(dot);
      }

      // Mostrar/ocultar flechas
      btnLeft.style.display = index > 0 ? "block" : "none";
      btnRight.style.display = index < maxIndex ? "block" : "none";
  }

  btnRight.addEventListener("click", () => {
      const visibleCards = Math.floor(wrapper.clientWidth / cardWidth);
      const totalCards = cards.length;
      const maxIndex = totalCards - visibleCards;

      if (index < maxIndex) {
          index++;
          updateCarousel();
      }
  });

  btnLeft.addEventListener("click", () => {
      if (index > 0) {
          index--;
          updateCarousel();
      }
  });

  // Swipe en mobile
  let startX, endX;
  
  carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX > endX + 50) {
          btnRight.click();
      } else if (startX < endX - 50) {
          btnLeft.click();
      }
  });

  // Chequear tamaño en resize
  window.addEventListener("resize", updateCarousel);

  // Inicializar
  updateCarousel();
});



/*Login modal*/

const login = document.querySelectorAll('.login')

login.forEach(log=>{

  log.addEventListener('click',()=>{

    let modal = document.createElement('div');
      modal.className="login-modal";
      modal.innerHTML=`
      <div class="modal-content">
          <span class="close">&times;</span>
          <h4>Bienvenido a tu próximo viaje</h4>
          <img src="img/logo-grande.png" alt="logo almundi">
          <div id="modalCuerpo">
            <p>Para ver tus reservas ingresá o registrate con el email que realizaste la compra.</p>
            <div class="cont-btn-login">
              <button class="botonContacto" id='ingresar' >INGRESAR</button>
              <button class="botonContacto" id='registrar' >REGISTRATE</button>
            </div> 
          </div>
      </div>
      `;
 

      document.body.append(modal);
      
      const closebtn = document.querySelector('.close');
      closebtn.addEventListener('click',()=>{ modal.remove() })
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
    });

    const ingresar = document.getElementById('ingresar');
    const registrar = document.getElementById('registrar');
    const modalCuerpo = document.getElementById('modalCuerpo');

    ingresar.addEventListener('click',fnIngresar);
    registrar.addEventListener('click',fnRegistrar);
    
    function fnIngresar() {
      modalCuerpo.innerHTML=`
      <h5>Ingresar</h5>
      <button class="login">
      Volver</button>
      `
    }

    function fnRegistrar() {
      modalCuerpo.innerHTML=`
      <h5>Registrar</h5>
      <button class="login">
      Volver</button>

      `
    }


  });
  fnIngresar();
  fnRegistrar();
})


