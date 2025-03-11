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

/*ANIMACIONES DE TRANSICIÓN*/

function animarScroll() {
  const elementos = document.querySelectorAll('.animacion1, .animacion2');
  const alturaPantalla = window.innerHeight;

  elementos.forEach(el => {
      const posicion = el.getBoundingClientRect().top;
      
      if (posicion < alturaPantalla - 100) { // Ajusta para que se active antes
          el.classList.add('mostrar');
      }
  });
}

// Ejecutar al hacer scroll y al cargar la página
window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll);

// /*Login modal*/
// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("login")) {
//     mostrarModal();
//   }
// });

// function mostrarModal() {
//   let modal = document.querySelector(".login-modal");

  
//   const contenidoOriginal = `
//     <p>Para ver tus reservas ingresá o registrate con el email que realizaste la compra.</p>
//     <div class="cont-btn-login">
//       <button class="botonContacto login" data-tipo="ingresar">INGRESAR</button>
//       <button class="botonContacto login" data-tipo="registrar">REGISTRATE</button>
//     </div> 
//   `;

//   // Si el modal no existe, se crea
//   if (!modal) {
//     modal = document.createElement("div");
//     modal.className = "login-modal";
//     modal.innerHTML = `
//       <div class="modal-content">
//           <span class="close">&times;</span>
//           <h4>Bienvenido a tu próximo viaje</h4>
//           <img src="img/logo-grande.png" alt="logo almundi">
//           <div id="modalCuerpo">${contenidoOriginal}</div>
//       </div>
//     `;

//     document.body.append(modal);

//     // Evento para cerrar modal
//     modal.querySelector(".close").addEventListener("click", () => modal.remove());
//     modal.addEventListener("click", (e) => {
//       if (e.target === modal) modal.remove();
//     });

//     // Para el click en volver, que contiene la clase login y mostrar contenidoOriginal
//     modal.addEventListener("click", (e) => {
//       if (e.target.classList.contains("login")) {
//         actualizarModal(e.target.dataset.tipo, contenidoOriginal);
//       }
//     });
//   }
// }

// //Fn para mostrar contenido de ingresar o registrarse
// function actualizarModal(tipo, contenidoOriginal) {
//   const modalCuerpo = document.getElementById("modalCuerpo");

//   if (!modalCuerpo) return;

//   // Contenidos dinámicos
//   const contenidoDinamico = {
//     ingresar: `
//       <h5>Ingresar</h5>
//       <form class="formLogin" id="formIngresar">
//         <label for="email">Email</label>
//         <input class="formInput" type="email" id="email" placeholder="Ingrese su email" required>
//         <label for="password">Contraseña</label>
//         <input class="formInput" type="password" id="password" placeholder="Ingrese su contraseña" required>
//         <button type="submit" class="botonContacto">Iniciar sesión</button>
//       </form>
//       <button class="login volver" data-tipo="volver">Volver</button>
//     `,
//     registrar: `
//       <h5>Registrarse</h5>
//       <form class="formLogin" id="formRegistrarse">
//         <label for="email-reg">Email</label>
//         <input class="formInput" type="email" id="email-reg" placeholder="Ingrese su email" required>
//         <label for="name-reg">Nombre de Usuario</label>
//         <input class="formInput" type="name" id="name-reg" placeholder="Ingrese su nombre de Usuario" required>
//         <label for="password-reg">Contraseña</label>
//         <input class="formInput" type="password" id="password-reg" placeholder="Cree una contraseña" required>
//         <label for="password-confirm">Confirmar contraseña</label>
//         <input class="formInput" type="password" id="password-confirm" placeholder="Repita su contraseña" required>
//         <p id="alertaModal"></p>
//         <button type="submit" class="botonContacto">Registrarse</button>
//       </form>
//       <button class="login volver" data-tipo="volver">Volver</button>
//     `,
//     volver: contenidoOriginal
//   };

//   modalCuerpo.innerHTML = contenidoDinamico[tipo] || contenidoOriginal;
// }
// document.addEventListener("DOMContentLoaded", function () {
//   const formRegistrarse = document.getElementById('formRegistrarse');
  
//   if (formRegistrarse) { // Verifica que el formulario exista
//     formRegistrarse.addEventListener("submit", (e) => {
//       e.preventDefault();  // Prevenir el comportamiento predeterminado de envío del formulario
//       console.log("Formulario enviado");

//       const emailReg = document.getElementById('email-reg');
//       const nameReg = document.getElementById('name-reg');
//       const passReg = document.getElementById('password-reg');
//       const passConfirm = document.getElementById('password-confirm');
//       const alertaModal = document.getElementById('alertaModal');

//       // Verifica si los valores del formulario están correctos
//       console.log("Email:", emailReg.value);
//       console.log("Nombre:", nameReg.value);
//       console.log("Contraseña:", passReg.value);
//       console.log("Confirmar Contraseña:", passConfirm.value);

//       // Verificar que las contraseñas coincidan
//       if (passReg.value !== passConfirm.value) {
//         alertaModal.innerText = "Las contraseñas no coinciden.";
//         return;
//       }

//       // Crear usuario
//       const nuevoUsuario = new Usuario(emailReg.value, nameReg.value, passReg.value);

//       // Almacenar en array y localStorage
//       const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];
//       usuariosRegistrados.push(nuevoUsuario);
//       localStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

//       console.log("Usuario registrado:", nuevoUsuario);

//       alert("Registro exitoso");

//       // Limpiar formulario
//       formRegistrarse.reset();
//     });
//   }
// });



// // const formIngresar = document.getElementById('formIngresar');
// // const email = document.getElementById('email');
// // const password = document.getElementById('password');

