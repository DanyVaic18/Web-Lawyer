import { setPasoApaso, datos, errorFaltaDato } from "./main.js";

const formulario = document.querySelector("form");

const previsualizador = document.getElementById("previsualizar");
const parrafoEle = document.createElement("p");

const RegexNum = /^[0-9]+$/;

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
    const parrafoEle = document.createElement("p");
    parrafoEle.innerHTML = `${datos.nombresApellidos} por propio derecho con número de identificación ${datos.numCedula} me dirigio a usted respetuosamente me presento y  digo:`;
    previsualizador.appendChild(parrafoEle);
  } else {
    errorFaltaDato("numeroCedula");
  }
}

formulario.addEventListener("submit", (ev) => {
  formCampos(ev);
});

export {};
