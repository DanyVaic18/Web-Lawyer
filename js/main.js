import { saludo } from "./hellow.js";

const formulario = document.querySelector("form");
const exportarBoton = document.getElementById("generarPdf");

const volverBoton = [...document.getElementsByClassName("volver")];
const contenedorInicio = document.getElementsByClassName("contenedor-inicio");
const contenedorOpciones = document.getElementsByClassName("contenedor-opciones");
const contenedorExportar = document.getElementsByClassName("contenedor-exportar");

const listHechosEle = [...document.querySelectorAll(".hechos")];
const listTiposEle = [...document.querySelectorAll(".tipos")];
const listHechos = ["PROMOVER", "SOLICITAR", "INFORMAR", "RECABAR"];
const listTipos = ["TIPO 1", "TIPO 2", "TIPO 3", "TIPO 4"];
const RegexNum = /^[0-9]+$/;

const datos = {
  numCedula: "",
  nombresApellidos: "",
  hechos: "",
  tipo: "",
};

listHechosEle?.forEach((ele, i) => {
  ele.value = listHechos[i];
  ele.addEventListener("click", (ev) => {
    ev.preventDefault();
    datos.hechos = ev.target.value;
    const parrafoEle = document.createElement("p")
    const subTitulo = document.createElement("h3")
    subTitulo.innerHTML =`Hechos`
    previsualizador.appendChild(subTitulo)
    parrafoEle.innerHTML = `Presento la carta por ${datos.hechos} la información suministrada en el día de hoy`
    previsualizador.appendChild(parrafoEle)
  });
});
listTiposEle?.forEach((ele, i) => {
  ele.value = listTipos[i];
  ele.addEventListener("click", (ev) => {
    ev.preventDefault();
    datos.tipo = ev.target.value;
    if(datos.hechos.trim() !== ""){
        setPasoApaso(ev, "none", "none", "flex");
        const parrafoEle = document.createElement("p")
        const subTitulo = document.createElement("h3")
        subTitulo.innerHTML =`Tipo u Objeto`
        previsualizador.appendChild(subTitulo)
        parrafoEle.innerHTML = `Presento el tipo de denucia como ${datos.tipo} lo cual es no es conveniente`
        previsualizador.appendChild(parrafoEle)
    }else{
        errorFaltaDato("contenedor-hechos")
    }
  });
});

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
 * @param {ev} ev De donde se activo el evento, event
 * @returns {datos} Guarda datos formulario, numCedula nombreApellidos
 */

function formCampos(ev) {
  ev.preventDefault();
  const campos = Object.fromEntries(new FormData(ev.target));
  datos.numCedula = campos.numeroCedula;
  datos.nombresApellidos = campos.nombresApellidos;
  if (
    datos.numCedula.trim() !== "" &&
    RegexNum.test(datos.numCedula.trim()) &&
    datos.nombresApellidos.trim() !== ""
  ) {
    setPasoApaso(ev, "none", "block", "none");
    const parrafoEle = document.createElement("p")
    parrafoEle.innerHTML = `${datos.nombresApellidos} por propio derecho con número de identificación ${datos.numCedula} me dirigio a usted respetuosamente me presento y  digo:`
    previsualizador.appendChild(parrafoEle)
  } else {
    errorFaltaDato("numeroCedula")
  }
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
formulario.addEventListener("submit", (ev) => {
  formCampos(ev);
});

volverBoton.forEach((vol, i)=>{
    vol.addEventListener("click", (ev) => {
        i === 0? 
        setPasoApaso(ev, "block", "none", "none"):
        setPasoApaso(ev, "none", "block", "none");
      });
})

exportarBoton.addEventListener("click", (ev) => {
  var doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
});


const previsualizador = document.getElementById("previsualizar")
const parrafoEle = document.createElement("p")

