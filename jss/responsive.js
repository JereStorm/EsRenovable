let btnMenu = document.querySelector("#btn-menu").addEventListener("click", mostrarMenu);

function mostrarMenu() {
    let menu = document.querySelector("#menu");
    menu.classList.toggle("ocultar")
}