import {} from './inicio.js'
import {} from './botones.js'
import {} from './exportarPdf.js'
import {} from './volver.js'
const contenedorInicio = document.getElementsByClassName("contenedor-inicio");
const contenedorOpciones = document.getElementsByClassName("contenedor-opciones");
const contenedorExportar = document.getElementsByClassName("contenedor-exportar");
const fechaActual = document.getElementById("fecha")

const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]

const datos = {
  numCedula: "",
  nombresApellidos: "",
  hechos: {
    listHechos:[],
    contenido:""
  },
  tipo: {
    listTipos:[],
    contenido:""
  },
  fecha:`Cúcuta, ${meses[new Date().getMonth()]} ${new Date().getDate()} de ${new Date().getFullYear()}`,
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

fechaActual.innerHTML += ` ${datos.fecha}`

export {
  setPasoApaso,
  datos,
  errorFaltaDato,
}