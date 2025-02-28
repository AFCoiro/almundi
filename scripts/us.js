const arrows = document.querySelectorAll('.arrowRight');
const desplegables = document.querySelectorAll('.desplegable');
const helpItems = document.querySelectorAll('.helpItem');


/*Para que se abra card desplegable en help.html */

helpItems.forEach((help, i) => {
    help.addEventListener('click', function() {
        desplegables.forEach((desplegable, j) => {
            if (i !== j) {
                desplegable.classList.remove('active'); // Cierra los demás
                arrows[j].classList.remove('rotated');
            }
        });

        // Alterna la clase active en el desplegable correspondiente
        desplegables[i].classList.toggle('active');
        arrows[i].classList.toggle('rotated');
    });
});
