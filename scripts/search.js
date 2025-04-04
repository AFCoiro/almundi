// Seleccionar el contenedor de las cards
let containerCardTrip = document.getElementsByClassName("containerCardTrip")[0];

// Ruta al archivo JSON
const jsonUrl = '../tours.json';

/* Llamado al JSON interno */
async function ProcesarDatos() {
  try {
    const datosJson = await fetch(jsonUrl);
    const datosJ = await datosJson.json();

    // Ordenar por precio y tomar los 6 más baratos
    const paquetesOrdenados = datosJ.sort((a, b) => a.precio - b.precio).slice(0, 6);
    fnMostrarPaises(paquetesOrdenados);


    // Agregar eventos a los botones de filtro
    document.getElementById("btnTodo").addEventListener("click", () => fnMostrarPaises(datosJ));

    document.getElementById("btnAmerica").addEventListener("click", () => filtrarPorContinente("América", datosJ));
    document.getElementById("btnEuropa").addEventListener("click", () => filtrarPorContinente("Europa", datosJ));
    document.getElementById("btnMundo").addEventListener("click", () => filtrarPorContinente("Otros", datosJ));

  } catch (error) {
    console.error("*****ERROR*****: " + error);
  }
}

ProcesarDatos();

/* Mostrar los paquetes en las cards */
function fnMostrarPaises(paises) {
  containerCardTrip.innerHTML = ""; // Limpiar antes de mostrar nuevas cards

  paises.forEach(pais => {
    let { nombre, bandera, precio, descripcion, titulo, salida, embarque, duracion, destinos, hotel, img } = pais;

    const cardsTrip = document.createElement("div");
    cardsTrip.setAttribute('class', 'cardsTrip');
    cardsTrip.innerHTML = `
      <div class="contImgCard">
        <img class="imgCardTrip" src="${img}" alt="Imagen de paquete de ${nombre}">
        <div class="cardPais">${bandera} ${nombre}</div>
      </div>
      <a class="linkCardTrip" href="travels.html" target="_blank">
        <div>
          <h3>${destinos}</h3>
          <h4>Paquete de ${duracion}</h4>
          <p>Vuelo + Hotel + Recorré ${destinos}</p>
        </div>
        <div>
          <h4>Precio por persona desde</h4>
          <h2>$${precio}</h2>
          <p>Incluye impuestos, tasas y cargos</p>
        </div>
      </a>
    `;

    // Guardar la info de la card en localStorage
    cardsTrip.querySelector('.linkCardTrip').addEventListener('click', function () {
      const infoPaisGuardado = { nombre, bandera, precio, descripcion, titulo, salida, embarque, duracion, destinos, hotel, img };
      localStorage.setItem('infoPais', JSON.stringify(infoPaisGuardado));
    });

    containerCardTrip.append(cardsTrip);
  });
}

/* Función para filtrar por continente */
function filtrarPorContinente(continente, datos) {
  let paquetesFiltrados = datos.filter(pais => pais.continente === continente);
  fnMostrarPaises(paquetesFiltrados);
}

/* Filtrar por el parámetro 'filtro' en la URL */
document.addEventListener('DOMContentLoaded', async function () {
  // Capturamos el parámetro de la URL (si existe)
  const urlParams = new URLSearchParams(window.location.search);
  const filtro = urlParams.get('filtro'); // "argentina" en este caso

  try {
    // Llamar al JSON
    const response = await fetch(jsonUrl);
    const data = await response.json();

    // Filtrar los datos si se pasa el filtro
    let paquetesFiltrados = data;

    if (filtro === 'argentina') {
      // Filtrar los paquetes cuyo nombre sea "Argentina"
      paquetesFiltrados = data.filter(pais => pais.nombre.toLowerCase() === 'argentina');
    }

    // Mostrar los paquetes filtrados
    fnMostrarPaises(paquetesFiltrados);

  } catch (error) {
    console.error("*****ERROR*****: " + error);
  }
});

/*⬇⬇⬇⬇TRAVELS⬇⬇⬇⬇TRAVELS⬇⬇⬇⬇TRAVELS⬇⬇*/

document.addEventListener('DOMContentLoaded', function() {
  const infoPaisesGuardados = JSON.parse(localStorage.getItem('infoPais'));

  if (infoPaisesGuardados) {
    const mainTravel = document.getElementById('mainTravel');
    mainTravel.innerHTML = `
    <div class="contTravel">

      <section class="travelInfo">
          <img src="${infoPaisesGuardados.img}" alt="${infoPaisesGuardados.nombre}">
          <div class="contTravelText containerWidth">
              <h2>Descripcion</h2>
              <h3>${infoPaisesGuardados.bandera}  ${infoPaisesGuardados.titulo}</h3>
              <h4>Plan Cuota Simple - 12 cuotas fijas</h4>
              <ul>
                  <li>Duración: <span>${infoPaisesGuardados.duracion}</span></li>
                  <li>Saliendo desde: <span>${infoPaisesGuardados.embarque}</span></li>
                  <li>Destinos: <span>${infoPaisesGuardados.destinos}</span></li>
                  <li>Hospedaje: <span>${infoPaisesGuardados.hotel}</span></li>
              </ul>
              <h3>Sobre ${infoPaisesGuardados.nombre}</h3>
              <p>${infoPaisesGuardados.descripcion}</p>
          </div>
      </section>

      <section class="travelPay">
          <h2>${infoPaisesGuardados.bandera} ${infoPaisesGuardados.titulo}</h2>
          <h3>📅Salida: ${infoPaisesGuardados.salida}</h3>
          <h3>👤👤2 pasajeros,🛏️ 1 habitación</h3>
          <h3>Precio total - 2 pasajeros: <span>$${infoPaisesGuardados.precio}</span></h3>
          <a href="contact.html" class="botonContacto" id="btnContact">Consultar</a>
      </section>

    </div>
    `;

  }
  const btnContact = document.getElementById("btnContact");

  btnContact.addEventListener('click', function () {
    localStorage.setItem('asunto',`Reserva de paquete a ${infoPaisesGuardados.nombre} el ${infoPaisesGuardados.salida}`);
  });
});

/*⬇⬇⬇⬇⬇⬇LLENAR FORMULARIO CON INFO DE TRAVELS⬇⬇⬇⬇⬇*/

document.addEventListener('DOMContentLoaded', function () {
  let asunto = document.getElementById('asunto');
  let storedAsunto = localStorage.getItem('asunto');
  if (storedAsunto) {
    asunto.value = storedAsunto;
    asunto.disabled ="disabled";
    localStorage.removeItem('asunto'); 
  }
});
