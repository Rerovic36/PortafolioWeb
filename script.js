const header = document.querySelector("header");
window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", window.scrollY > 100);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

// funcion muy interesante hay que buscarle su logica
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};
// cierra el menu cuando aprientas unos de los elementos que te llevan  a las secciones

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};