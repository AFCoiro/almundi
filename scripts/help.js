const arrows = document.querySelectorAll('.arrowRight');
const desplegables = document.querySelectorAll('.desplegable');
const helpItemSubCont = document.querySelectorAll('.helpItemSubCont');

/*Para que se abra card desplegable en help.html */
helpItemSubCont.forEach((help, i) => {
    help.addEventListener('click', function (event) {
        // Si el clic NO fue en un botón ni dentro de `.desplegable`, se abre/cierra
        if (!event.target.closest('.desplegable') && !event.target.closest('button, a')) {
            desplegables.forEach((desplegable, j) => {
                if (i !== j) {
                    desplegable.classList.remove('active'); // Cierra los demás
                    arrows[j].classList.remove('rotated');
                }
            });

            // Alterna la clase active en el desplegable correspondiente
            desplegables[i].classList.toggle('active');
            arrows[i].classList.toggle('rotated');
        }
    });
});
