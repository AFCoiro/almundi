const arrows = document.querySelectorAll('.arrowRight');
const desplegables = document.querySelectorAll('.desplegable');

arrows.forEach((arrow, i) => {
    arrow.addEventListener('click', function() {
        // Cerrar todos los desplegables
        desplegables.forEach((desplegable, j) => {
            if (i !== j) {
                desplegable.style.display = 'none';
            }
        });

        // Abrir el desplegable correspondiente al arrow clicado
        const desplegable = desplegables[i];
        desplegable.style.display = desplegable.style.display === 'none' || desplegable.style.display === '' ? 'block' : 'none';
    });
});