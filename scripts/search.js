let containerCardTrip = document.getElementsByClassName("containerCardTrip");


const jsonUrl = '../../tours.json';
/*llamado a un json interno*/
async function ProcesarDatos() {
  try {

    const datosJson = await fetch(jsonUrl);
    const datosJ = await datosJson.json();
    fnMostrarPaises(datosJ);
    console.log(datosJ);

  } catch (error) {
    console.error("*****ERROR*****: " + error);
  }
}
ProcesarDatos();
/*los datos guardados los usamos para mostrarlos en las cards de productos*/

function fnMostrarPaises(paises) {
  paises.forEach(pais => {

    let nombre = pais.nombre;
    let bandera = pais.bandera;
    let precio = pais.precio;
    let descripcion = pais.descripcion;
    let titulo = pais.titulo;
    let salida = pais.salida;
    let embarque = pais.embarque;
    let duracion = pais.duracion;
    let destinos = pais.destinos;
    let hotel = pais.hotel;
    let img = pais.img;


    const cardsTrip = document.createElement("div");
    cardsTrip.setAttribute('class', 'cardsTrip');
    cardsTrip.innerHTML = `
            <div class="contImgCard">
                <img class="imgCardTrip" src="${img}" alt="Imagen de paquete de ${nombre}">
                <div class="cardPais">${bandera} ${nombre}</div>
            </div>
            <a class="linkCardTrip" href="travels.html" target="_blank">
                <div>
                  <h3>${embarque}</h3>
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

/*guardo la informacion de la card donde se hizo click en el local storage*/
      cardsTrip.querySelector('.linkCardTrip').addEventListener('click', function () {
        const infoPaisGuardado = {
           nombre :nombre,
           bandera :bandera,
           precio :precio,
           descripcion :descripcion,
           titulo :titulo,
           salida :salida,
           embarque :embarque,
           duracion :duracion,
           destinos :destinos,
           hotel :hotel,
           img :img,
        };
        localStorage.setItem('infoPais', JSON.stringify(infoPaisGuardado));
      });

      containerCardTrip[0].append(cardsTrip);
    });
  }


  /*⬇⬇TRAVELS⬇⬇⬇⬇TRAVELS⬇⬇⬇⬇TRAVELS⬇⬇*/

/*lo guardado en LS lo uso para que mediante DOMContentLoaded lo  muestre en la pagina travels.html */




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
    console.log('asunto',`Reserva de paquete a ${infoPaisesGuardados.nombre} el ${infoPaisesGuardados.salida}`);
  });
  }
);

      /*⬇⬇⬇⬇⬇⬇LLENAR FORMULARIO CON INFO DE TRAVELS⬇⬇⬇⬇⬇*/

      document.addEventListener('DOMContentLoaded', function () {
        let asunto = document.getElementById('asunto');
        let storedAsunto = localStorage.getItem('asunto');
        if (storedAsunto) {
          asunto.value = storedAsunto;
          asunto.disabled ="disabled";
          console.log(storedAsunto);
          localStorage.removeItem('asunto'); 
        }});
          // Limpiar el valor almacenado

 <script src="../scripts/search.js"></script>
 console.log("hiicte click en boton bien")
