const exportarBoton = document.getElementById("generarPdf");

exportarBoton.addEventListener("click", (ev) => {
  var doc = new jsPDF();
  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
});
export {};
