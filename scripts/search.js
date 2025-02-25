let containerCardTrip = document.getElementsByClassName("containerCardTrip")[0];

const jsonUrl = '../../tours.json';

/* Llamado al JSON interno */
async function ProcesarDatos() {
  try {
    const datosJson = await fetch(jsonUrl);
    const datosJ = await datosJson.json();
    
    // Ordenar por precio y tomar los 6 más baratos
    const paquetesOrdenados = datosJ.sort((a, b) => a.precio - b.precio).slice(0, 6);
    fnMostrarPaises(paquetesOrdenados);

    console.log("Paquetes más baratos:", paquetesOrdenados);

    // Agregar eventos a los botones de filtro
    document.getElementById("btnTodo").addEventListener("click", () => fnMostrarPaises( datosJ));

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
          <h2>$$${precio}</h2>
          <p>Incluye impuestos, tasas y cargos</p>
        </div>
      </a>
    `;

    /* Guardar la info de la card en localStorage */
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
