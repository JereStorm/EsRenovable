/*alert("que onda pa")*/
/*
let inputPreview = document.querySelector("#inputPreview");
console.log("declaro la variable");


 let botonPreview = document.querySelector("#botonPreview");
 botonPreview.addEventListener("click", function( pasarAlPreview ) 
 
 
 
 
 function pasarAlPreview() {
    alert("Hola!");
  }
  */

/*
console.log("se pregunta");
  let suma = prompt("2+2=?");
  let resultado=4;

  while(suma!=resultado){
    console.log("No verificado :(");
    alert("Intente de nuevo");
    console.log("otro intento");
    console.log("se pregunta");
    suma = prompt("2+2=?");
  }
console.log ("Verificado :D");
*/


let verificar = document.querySelector("#btnVerificar");
//DECLARO LA VARIABLE VERIFICAR Y LE ASIGO EL VALOR DEL #BTNVERIFICAR
verificar.addEventListener("click", catcha)
//AGREGO EL ESCUCHADOR DE EVENTOS Y CUANDO SUCEDA EL EVENTO SE INICIA LA FUNCION
const suma = 4
/*console.log(verificar) SIRVE PARA EL DIVAGEO*/
function catcha() {
  let resultado = document.querySelector("#resultado").value;
  //DECLARO EN LA VARIABLE RESULTADO EL VALOR DEL #RESULTADO
  console.log(resultado)
  //MUESTRO LO QUE INGRESO EL USUARIO
  let verificacion = document.querySelector("#verificacion")
  //DECLARO LA VARIABLE VERIFICACION QUE CONFIRMA SI SE COMPLETO EL CATCHA
  if (resultado == suma) {
    verificacion.innerHTML = "Muy bien, verificado :D"
    console.log(resultado + " Verificado :D")
  }
  else {
    verificacion.innerHTML = "Captcha fallido"
    console.log(resultado + " Captcha fallido")
  }
  resultado.value = " "
}