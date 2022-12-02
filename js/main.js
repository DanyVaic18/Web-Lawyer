import {} from './inicio.js'
import {} from './botones.js'
import {} from './exportarPdf.js'
import {} from './volver.js'

const contenedorInicio = document.getElementsByClassName("contenedor-inicio");
const contenedorOpciones = document.getElementsByClassName("contenedor-opciones");
const contenedorExportar = document.getElementsByClassName("contenedor-exportar");

const datos = {
  numCedula: "",
  nombresApellidos: "",
  hechos: "",
  tipo: "",
};

/**
 * @param {byID} byID Es el nombre del id del elemento
 * @returns {void}
 */
function errorFaltaDato (byID) {
    let restablecer = 1;
    document.getElementById(byID).style.border = "1px solid #F54A4A";
    const aviso = setInterval(() => {
      restablecer--;
      if (restablecer === 0) {
        document.getElementById(byID).style.border = "";
        clearInterval(aviso);
      }
    }, 2000);
}

/**
 * @param {ev} ev De donde se activo el evento
 * @param {inicio} inicio parametros para ocultar o mostrar ese contenedor
 * @param {opciones} opciones parametros para ocultar o mostrar ese contenedor
 * @param {exportar} exportar parametros para ocultar o mostrar ese contenedor
 * @returns {void}
 */

function setPasoApaso(ev, inicio, opciones, exportar) {
  contenedorInicio[0].style.display = inicio;
  contenedorOpciones[0].style.display = opciones;
  contenedorExportar[0].style.display = exportar;
}

export {
  setPasoApaso,
  datos,
  errorFaltaDato,
}