import { datos, errorFaltaDato, setPasoApaso } from "./main.js";

const exportarBoton = document.getElementById("generarPdf");
const nombrePdf = document.getElementById("namePdf");
const seDirige = document.getElementById("seDirige");

const contenidoPDF = {
  membretado: [
    "República de Colombia",
    "Departamento de Norte de Santander",
    "Entidad Fiscal de la Alcaldía Municipal de Cúcuta",
  ],
};

const doc = new jsPDF({
  unit: "mm",
  lineHeight: 2,
  format: "a4",
});
/**
 * Tiempo que se demora cargendo la imagen el espere código
 * @param {*} url de la imagen o logo para pasar a base 64 por que la funcion de la libreía lee las img así.
 * @returns {void}
 */

function loadImage(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  });
}

function generarPDF(ev) {
  /**
   * Generar el pdf del abogado
   * @param {*} ev Obj del botón para descargar el pdf
   */

  /**  Trabajos en milimetros de parte de doc^ */
  let saltosLinea = {
    mm6: 6,
    mm10: 10,
    mm20: 20,
  };
  /**
   * Eje @property {x} (horizontal),  @property {y} (vertical)
   */
  var y = 70;
  var x = 25;
  let { mm6, mm10, mm20 } = saltosLinea;
  /**
   * Sacar el alto total del parrafo
   * @param {*} arrTextos arreglo de doc.splitTextToSize(texto o parrafo largo)
   * @param {*} fontSize tamaño de la letra
   * @returns {number} alto total del parrafo
   */
  function altoTotalParrafos(arrTextos = [], fontSize = 0) {
    return Math.round((arrTextos.length * fontSize * 1.15) / 3.3) + 1;
  }
  function dividirParrafos(arrHechosTipos, boton = "") {
    if (boton === "Hechos") {
      arrHechosTipos.forEach((hecho, index) => {
        if (y >= 237) {
          y = 30;
          doc.addPage("a4", "p");
          doc
            .setFontSize(16)
            .setFont("helvetica", "normal")
            .text("Hecho", 109, y, null, null, "center");
          y = y + mm10;
          let hechoText = doc.splitTextToSize(hecho.contenido, 220);
          doc
            .setFontSize(12)
            .setFont("helvetica", "normal")
            .text(hechoText, x, y);
          y = y + altoTotalParrafos(hechoText, 12) + mm10;
        } else {
          doc
            .setFontSize(16)
            .setFont("helvetica", "normal")
            .text("Hecho", 109, y, null, null, "center");
          y = y + mm10;
          let hechoText = doc.splitTextToSize(hecho.contenido, 220);
          doc
            .setFontSize(12)
            .setFont("helvetica", "normal")
            .text(hechoText, x, y);
          y = y + altoTotalParrafos(hechoText, 12) + mm10;
        }
      });
    } else {
      if (y >= 237) {
        y = 30;
        doc.addPage("a4", "p");
        doc
          .setFontSize(16)
          .setFont("helvetica", "normal")
          .text("Anexos", 110, y, null, null, "center");
        y = y + mm10;
        arrHechosTipos.forEach((tipo, index) => {
          let tipoText = doc.splitTextToSize(
            `${index + 1}. ` + tipo.contenido,
            160
          );
          doc
            .setFontSize(12)
            .setFont("helvetica", "normal")
            .text(tipoText, x, y);
          y = y + altoTotalParrafos(tipoText, 12) + 2;
        });
      } else {
        doc
          .setFontSize(16)
          .setFont("helvetica", "normal")
          .text("Anexos", 110, y, null, null, "center");
        y = y + mm10;
        arrHechosTipos.forEach((tipo, index) => {
          let tipoText = doc.splitTextToSize(
            `${index + 1}. ` + tipo.contenido,
            160
          );
          doc
            .setFontSize(12)
            .setFont("helvetica", "normal")
            .text(tipoText, x, y);
          y = y + altoTotalParrafos(tipoText, 12) + 2;
        });
      }
    }
  }
  /* --------------- Agregando El Membretado ------------------- */
  loadImage("assets/image/escudocol.png").then((logo) => {
    doc.setPage(1);
    doc.addImage(logo, "PNG", x, 23, 28, 28);
    doc.save(nombrePdf.value);
  });

  doc
    .setFontSize(14)
    .setFont("helvetica", "bold")
    .text(contenidoPDF.membretado, 120, 30, null, null, "center");
  /* --------------- Agregando el Contenido estático ------------------- */
  //FECHA
  doc.setFontSize(12).setFont("helvetica", "normal").text(datos.fecha, x, y);
  y = y + mm10; // Salto en línea
  //Base del Juez
  doc.setFont("helvetica", "normal").text("Señor:", x, y);
  y = y + mm6;
  doc
    .setFont("helvetica", "bold")
    .text("JUEZ CIVIL MUNICIPAL DE CÚCUTA-NSA.", x, y);
  y = y + mm6;
  doc.setFont("helvetica", "normal").text("Cúcuta.", x, y);
  y = y + mm10;
  // REFERENCIA, ACCIONANTE, ACCIONADO
  doc.setFont("helvetica", "bold").text("REFERENCIA:", x, y);
  doc
    .setFont("helvetica", "normal")
    .text("Solicitud de respuesta de tutela.", x + 29, y);
  y = y + mm6;
  doc.setFont("helvetica", "bold").text("ACCIONANTE:", x, y);
  doc.setFont("helvetica", "normal").text("Nombre del Abogado.", x + 30, y);
  y = y + mm6;
  doc.setFont("helvetica", "bold").text("ACCIONADO:", x, y);
  doc
    .setFont("helvetica", "normal")
    .text(`${datos.nombresApellidos}.`, x + 28, y);
  y = y + mm10;
  // Respetuosamente el Abogado se dirige al Accionado:
  let se_Dirige = doc.splitTextToSize(seDirige.innerText, 165);
  doc
    .setLineHeightFactor()
    .setFont("helvetica", "normal")
    .text(se_Dirige, x, y);
  y = y + altoTotalParrafos(se_Dirige, 12) + mm10 + mm6;
  // Hehcos y tipos o Anexos
  dividirParrafos(datos.hechos.listHechos, "Hechos");
  dividirParrafos(datos.tipo.listTipos, "Tipo");
  y = y + mm6;
  //Final del PDF firma datos del Accionante
  if (y >= 237) {
    y = 30;
    doc.addPage("a4", "p");
    let respuesta = doc.splitTextToSize(
      "Con esto doy cumplimiento a cada una de las pretenciones solicitadas por la accionante y lo ordenado por el honorable Juez",
      160
    );
    doc.setFont("helvetica", "bold").text(respuesta, x, y);
    y = y + altoTotalParrafos(respuesta, 12) + mm10;
    doc.setFont("helvetica", "normal").text(datos.nombresApellidos, x, y);
    y = y + mm10;
    doc.setFont("helvetica", "normal").text(datos.numCedula, x, y);
    y = y + mm6;
    doc.setFont("helvetica", "normal").text("CC", x, y);
    y = y + mm10;
  } else {
    let respuesta = doc.splitTextToSize(
      "Con esto doy cumplimiento a cada una de las pretenciones solicitadas por la accionante y lo ordenado por el honorable Juez",
      160
    );
    doc.setFont("helvetica", "bold").text(respuesta, x, y);
    y = y + altoTotalParrafos(respuesta, 12) + mm10;
    doc.setFont("helvetica", "normal").text(datos.nombresApellidos, x, y);
    y = y + mm10;
    doc.setFont("helvetica", "normal").text(datos.numCedula, x, y);
    y = y + mm6;
    doc.setFont("helvetica", "normal").text("CC", x, y);
    y = y + mm10;
  }

  if (y >= 237) {
    y = 30;
    doc.addPage("a4", "p");
    doc.setFont("helvetica", "normal").text("Nombre del Abogado", x, y);
    y = y + mm20;
    doc
      .setFont("helvetica", "normal")
      .text("_________________________________", x, y);
    y = y + mm6;
    doc.setFont("helvetica", "normal").text("Firma", x + 25, y);
    y = y + mm10;
  } else {
    doc.setFont("helvetica", "normal").text("Nombre del Abogado", x, y);
    y = y + mm20;
    doc
      .setFont("helvetica", "normal")
      .text("_________________________________", x, y);
    y = y + mm6;
    doc.setFont("helvetica", "normal").text("Firma", x + 25, y);
    y = y + mm10;
  }
}

exportarBoton.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (nombrePdf.value === "") {
    errorFaltaDato("namePdf");
  } else {
    generarPDF(ev);
    document.getElementsByClassName("volver")[1].disabled = true;
    document.getElementsByClassName("volver")[1].style.backgroundColor =
      "#474747";
    document.getElementById("recargar").style.display = "block";
    document.getElementById("recargar").addEventListener("click", (ev) => {
      ev.preventDefault();
      location.reload();
    });
  }
});

export {};
