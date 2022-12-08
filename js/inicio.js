import { setPasoApaso, datos, errorFaltaDato } from "./main.js";
import { globalBotones } from "./botones.js";

const formulario = document.querySelector("form");
const seDirige = document.getElementById("seDirige")
const civil = document.getElementById("civil")


const RegexNum = /^[0-9]+$/;

/**
 * Inicializar y guardar el número de cédula con los nombres y apellidos 
 * @param ev De donde se activo el evento, event
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
    civil.innerText = datos.nombresApellidos
    seDirige.innerHTML = `<p> 
      <b>${datos.nombresApellidos}</b>, mayor de edad, vecino de esta ciudad, identificado con la cédula de ciudadanía cuyo número <b>${datos.numCedula}</b>, residente en Cúcuta, actuando en nombre propio (o en representación de), acudo respetuosamente ante su despacho para promover una respuesta clara según la manifestación de la tutela presenteda, dado a los hechos y anexos descritos en la tutela, respetuosamente le explico y respondo de manera consisa, atendiendo su petición:
      <br> 
      <br> 
      Fundamento mi respuesta con el:
      </p>
    `
    globalBotones()
  } else {
    errorFaltaDato("numeroCedula");
  }
}

formulario.addEventListener("submit", (ev) => formCampos(ev));

export {};
