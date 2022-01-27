"use strict"

load_content("home");

async function load_content(id) {

    let container = document.querySelector("#content");
    console.log("Loading content for {" + id + "}");;

    try {
        let res = await fetch(`https://jerestorm.github.io/EsRenovable/${id}.html`);
        if (res.ok) {
            let html = await res.text();
            container.innerHTML = html;
            if (id == "contact") {
                ejecutarCaptchaRandom();
            } else if (id == "home") {
                ejecutarTablaDinamica();
            }
        } else {
            container.innerHTML = 'Error loading for /' + id + '...';
        }
    } catch (error) {
        console.log(error);
        container.innerHTML = `Error.`
    }
}

function push(event) {

    let id = event.target.id;

    document.title = id;

    load_content(id);

    window.history.pushState({ id }, `${id}`,
        `/${id}`);
}

window.onload = (event) => {

    window["home"].addEventListener("click",
        event => push(event))
    window["about"].addEventListener("click",
        event => push(event))
    window["contact"].addEventListener("click",
        event => push(event))
}

window.addEventListener("popstate", event => {

    let stateId = event.state.id;

    console.log("stateId = ", stateId);

    load_content(stateId);
});

// SCRIPT Captcha --------------------------------------------------------------------------------

let verificar;
let num1;
let num2;
let verificacion;
let random1;
let random2;

function ejecutarCaptchaRandom() {

    verificar = document.querySelector("#btnVerificar").addEventListener("click", Captcha);

    num1 = document.querySelector("#primerN");
    num2 = document.querySelector("#segundoN");

    verificacion = document.querySelector("#verificacion");

    random1 = Math.floor((Math.random() * 5) + 1);
    random2 = Math.floor((Math.random() * 5) + 1);

    num1.innerHTML = random1;
    num2.innerHTML = random2;
}


function Captcha() {

    let respuesta = document.querySelector("#respuesta-captcha").value;

    respuesta = parseInt(respuesta);
    let resultado = (random1 + random2);


    console.log(typeof resultado + " " + resultado);
    console.log(typeof respuesta + " " + respuesta);

    if (respuesta === resultado) {

        verificacion.innerHTML = `Captcha verificado`;
    } else {

        random1 = Math.floor((Math.random() * 5) + 1);
        random2 = Math.floor((Math.random() * 5) + 1);

        num1.innerHTML = random1;
        num2.innerHTML = random2;

        verificacion.innerHTML = `Captcha no verificado`;
    }
}
//SCRIPT TABLA DINAMICA ------------------------------------------------------------------------------------------
function ejecutarTablaDinamica() {

    let inputFiltrar;
    let tablaEnergias;
    let botonAgregar;
    let mensaje;

    const url = 'https://60c280a6917002001739d1bb.mockapi.io/api/esrenovable';

    tablaEnergias = document.querySelector("#energias");
    botonAgregar = document.querySelector("#btn-agregar");
    mensaje = document.querySelector("#mensaje");

    inputFiltrar = document.querySelector("#filtrar");
    inputFiltrar.addEventListener("input", buscarFila);

    obtener();


    botonAgregar.addEventListener("click", function(e) {
        let energiasRenovablesValue = document.querySelector("#energias-renovables").value;
        let energiasNoRenovablesValue = document.querySelector("#energias-no-renovables").value;

        let fila = {
            energiasReno: energiasRenovablesValue,
            energiasNoReno: energiasNoRenovablesValue
        }
        if ((energiasRenovablesValue != "" && energiasNoRenovablesValue != "") && (energiasRenovablesValue != energiasNoRenovablesValue)) {
            agregar(fila);
        }

    })

    // METODO POST -----------------------------------------------------------------------------------------------
    function agregar(fila) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fila)
        }).then(function(r) {
            obtener()
        }).catch(function(e) {
            console.log('error al cargar el usuario');
        })

    }
    // OBTENER LA PROMESA --------------------------------------------------------------------------------------------
    async function obtener() {
        try {
            let res = await fetch(url);
            let json = await res.json();
            console.log(json);
            renderizarTabla(json) //MANDA ESA PROMESA
        } catch (error) {
            console.log(error);
        }
    }
    // RENDERIZAR TABLA ----------------------------------------------------------------------------------------------
    function renderizarTabla(energias) {

        let esValido = false;
        tablaEnergias.innerHTML = "";


        for (let i = 0; i < energias.length; i++) {
            verificarYCargar(energias[i], esValido);
        }

        let btnesBorrarFila = document.querySelectorAll(".btn-borrar");
        for (let i = 0; i < btnesBorrarFila.length; i++) {
            btnesBorrarFila[i].addEventListener("click", function() {
                borrarFila(this.getAttribute("id"));
            });

        }
        let btnesModificarFila = document.querySelectorAll(".btn-modificar");
        for (let i = 0; i < btnesModificarFila.length; i++) {
            btnesModificarFila[i].addEventListener("click", function() {
                modificarFila(this.getAttribute("data_id"));
            });

        }

    }

    function verificarYCargar(energias, esValido) {


        if (energias.energiasReno == "Energia Eolica") {
            esValido = true;
            let condicion = "resaltado";
            col_1_Resaltada(energias, condicion);

        } else if (energias.energiasReno == "Energia Petrolifera") {
            esValido = true;
            let condicion = "rojo";
            col_1_Resaltada(energias, condicion);
        }
        if (energias.energiasNoReno == "Energia Eolica") {
            esValido = true;
            let condicion = "rojo";
            col_2_Resaltada(energias, condicion);

        } else if (energias.energiasNoReno == "Energia Petrolifera") {
            esValido = true;
            let condicion = "resaltado";
            col_2_Resaltada(energias, condicion);
        }
        if (!esValido) {
            tablaEnergias.innerHTML +=
                `<tr> 
                    <td> ${energias.energiasReno} </td> 
                    <td> ${energias.energiasNoReno} </td> 
                    <td> 
                        <button class="btn-borrar" id="${energias.id}">Borrar</button>
                    </td>
                    <td> 
                        <button class="btn-modificar" data_id="${energias.id}" >Editar</button>
                    </td>
            </tr>`;
        }
    }

    function col_1_Resaltada(energias, condicion) {
        tablaEnergias.innerHTML +=
            `<tr> 
            <td class="${condicion}"> ${energias.energiasReno} </td> 
            <td> ${energias.energiasNoReno} </td> 
            <td> 
                <button class="btn-borrar" id="${energias.id}">Borrar</button>
            </td>
            <td> 
                <button class="btn-modificar" data_id="${energias.id}" >Editar</button>
            </td>
        </tr>`;
    }

    function col_2_Resaltada(energias, condicion) {
        tablaEnergias.innerHTML +=
            `<tr> 
            <td> ${energias.energiasReno} </td> 
            <td class="${condicion}"> ${energias.energiasNoReno} </td> 
            <td> 
                <button class="btn-borrar" id="${energias.id}">Borrar</button>
            </td>
            <td> 
                <button class="btn-modificar" data_id="${energias.id}" >Editar</button>
            </td>
        </tr>`;
    }
    // MODIFICAR FILA -------------------------------------------------------------------------------------------------
    function modificarFila(id) {
        mensaje.innerHTML = 'Complete los inputs y aprete el boton "OKAY"';
        mensaje.classList.remove("borrar");

        botonAgregar.classList.add("borrar")

        let divModificar = document.querySelector("#okay");
        divModificar.innerHTML = "";

        let btnModificar = document.createElement("button");

        btnModificar.textContent = "OKAY";
        btnModificar.setAttribute("type", "button");
        btnModificar.classList.add("botonesAdmin");

        divModificar.appendChild(btnModificar);

        btnModificar.addEventListener("click", () => {

            mensaje.classList.add("borrar");
            botonAgregar.classList.remove("borrar");
            btnModificar.classList.add("borrar");

            let energiasRenovablesValue = document.querySelector("#energias-renovables").value;
            let energiasNoRenovablesValue = document.querySelector("#energias-no-renovables").value;

            let fila = {
                energiasReno: energiasRenovablesValue,
                energiasNoReno: energiasNoRenovablesValue
            }
            console.log(id)
            metodoPut(fila, id);
        })

    }
    // FUNCION MODIFICAR -----------------------------------------------------------------------------------------------
    async function metodoPut(filaNueva, id) {
        try {
            let res = await fetch(`${url}/${id}`, {
                "method": "PUT",
                "headers": {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(filaNueva)
            })
            if (res.ok) {
                console.log("Modificado con exito")
            } else {
                console.log("Modificado fallido")
            }
        } catch (error) {
            console.log(error);
        }
        obtener()
    }
    // FUNCION BUSCAR -----------------------------------------------------------------------------------------------
    async function buscarFila() {
        let arreglo = [];
        try {
            let res = await fetch(url);
            let json = await res.json();
            console.log(json);
            for (const objeto of json) {
                if (objeto.energiasReno.toUpperCase().includes(inputFiltrar.value.toUpperCase()) || objeto.energiasNoReno.toUpperCase().includes(inputFiltrar.value.toUpperCase())) {
                    arreglo.push(objeto)
                }
            }

            renderizarTabla(arreglo) //MANDA ESA PROMESA A LA TABLA
        } catch (error) {
            console.log(error);
        }
    }
    // FUNCION BORRAR -----------------------------------------------------------------------------------------------
    async function borrarFila(id) {

        try {
            let res = await fetch(`${url}/${id}`, {
                "method": "DELETE",
            });
            if (res.ok) {
                console.log("Eliminado con exito")
            } else {
                console.log("Eliminado fallido")
            }
        } catch (error) {
            console.log(error);
        }

        obtener()
    }
}