import { datos, setPasoApaso, errorFaltaDato } from "./main.js";

const previsualizador = document.getElementById("previsualizar");

const listHechosEle = [...document.querySelectorAll(".hechos")];
const listTiposEle = [...document.querySelectorAll(".tipos")];
const listHechos = ["PROMOVER", "SOLICITAR", "INFORMAR", "RECABAR"];
const listTipos = ["TIPO 1", "TIPO 2", "TIPO 3", "TIPO 4"];

listHechosEle?.forEach((ele, i) => {
  ele.value = listHechos[i];
  ele.addEventListener("click", (ev) => {
    ev.preventDefault();
    datos.hechos = ev.target.value;
    const parrafoEle = document.createElement("p");
    const subTitulo = document.createElement("h3");
    subTitulo.innerHTML = `Hechos`;
    previsualizador.appendChild(subTitulo);
    parrafoEle.innerHTML = `Presento la carta por ${datos.hechos} la información suministrada en el día de hoy`;
    previsualizador.appendChild(parrafoEle);
  });
});
listTiposEle?.forEach((ele, i) => {
  ele.value = listTipos[i];
  ele.addEventListener("click", (ev) => {
    ev.preventDefault();
    datos.tipo = ev.target.value;
    if (datos.hechos.trim() !== "") {
      setPasoApaso(ev, "none", "none", "flex");
      const parrafoEle = document.createElement("p");
      const subTitulo = document.createElement("h3");
      subTitulo.innerHTML = `Tipo u Objeto`;
      previsualizador.appendChild(subTitulo);
      parrafoEle.innerHTML = `Presento el tipo de denucia como ${datos.tipo} lo cual es no es conveniente`;
      previsualizador.appendChild(parrafoEle);
    } else {
      errorFaltaDato("contenedor-hechos");
    }
  });
});

export {};
