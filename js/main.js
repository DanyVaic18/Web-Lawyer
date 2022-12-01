import { saludo } from "./hellow.js";

const formulario = document.querySelector("form");
const exportarBoton = document.getElementById("generarPdf");
const volverBoton = document.getElementById("volver");

const contenedorInicio = document.getElementsByClassName("contenedor-inicio");
const contenedorOpciones = document.getElementsByClassName(
  "contenedor-opciones"
);
const contenedorExportar = document.getElementsByClassName(
  "contenedor-exportar"
);

const datos = {
  numCedula: "",
  nombresApellidos: "",
  hechos: "",
  tipo: "",
};

/**
 * @param {ev} ev De donde se activo el evento, event
 * @returns {datos} Guarda datos formulario, numCedula nombreApellidos
 */

function formCampos(ev) {
  ev.preventDefault();
  const campos = Object.fromEntries(new FormData(ev.target));
  datos.numCedula = campos.numeroCedula;
  datos.nombresApellidos = campos.nombresApellidos;
  if (datos.numCedula.trim() !== "" && datos.nombresApellidos.trim() !== "") {
    setPasoApaso(ev, "none", "block", "none");
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

volverBoton.addEventListener("click", (ev) => {
  setPasoApaso(ev, "block", "none", "none");
});

exportarBoton.addEventListener("click", (ev) => {
  var doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
});
