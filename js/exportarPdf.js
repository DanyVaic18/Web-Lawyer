import { datos, errorFaltaDato, setPasoApaso } from "./main.js";

const exportarBoton = document.getElementById("generarPdf");
const nombrePdf = document.getElementById("namePdf");
let
  fontSize = 10,
  text =
    "Which, but their children's end, nought  l ll could remove, Is now the two hours' traffic of our stage dasda dasdasdsadasddasdasdasdasdasdasdasddasdasdasdasdsa;";

/**
 * Tiempo que se demora cargendo la imagen el espere código
 * @param {*} url
 * @returns
 */

function loadImage(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
}

/**
 * Generar el pdf del abogado
 * @param {*} ev Obj del botón para descargar el pdf
 */

function generarPDF(ev) {
  const doc = new jsPDF({
    unit: "in",
    lineHeight: 1.2,
    format: "a4",
  });
  let textLines = doc.splitTextToSize(text, 7.5);
  doc
  .setFontSize(9)
  .text(textLines, 2, 2)
  loadImage("assets/image/escudocol.png").then((logo) => {
    doc.addImage(logo, "PNG", 1, 1, 1, 1);
    doc.save(nombrePdf.value);
  });
}

exportarBoton.addEventListener("click", (ev) => {
  nombrePdf.value === "" ? errorFaltaDato("namePdf") : generarPDF(ev);
});

export {};
