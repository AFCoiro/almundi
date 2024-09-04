const arrows = document.querySelectorAll('.arrowRight');
const desplegables = document.querySelectorAll('.desplegable');
const helpItem = document.querySelectorAll('.helpItem');

helpItem.forEach((help, i) => {
    help.addEventListener('click', function() {
        desplegables.forEach((desplegable, j) => {
            if (i !== j) {
                desplegable.style.display = 'none';
                arrows[j].classList.remove('rotated');
            }
        });
        const desplegable = desplegables[i];
        desplegable.style.display = desplegable.style.display === 'none' || desplegable.style.display === '' ? 'block' : 'none' ;
        arrows[i].classList.toggle('rotated');
    });
});


