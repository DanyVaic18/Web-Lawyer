import { datos, setPasoApaso, errorFaltaDato } from "./main.js";

const contenedorHechos = document.querySelector("#contenedor-hechos");
const contenedorTipos = document.querySelector("#contenedor-tipos");
const prevHechos = document.querySelector("#respuesta-hecho");
const prevTipos = document.querySelector("#respuesta-tipo");
const restablecer = document.querySelector("#restablecer-hecho-tipo")
const siguiente = document.querySelector("#siguiente")
const exportFinal = document.querySelector("#export-final")

const arrBtnHechos = [
  {
    _id: "hecho-1",
    numHecho: "Hecho 1",
    contenido: "La alcaldía municipal de Cúcuta no es la encargada de los procesos de mecina o EPS, por el reclamo de medicamentos, camillas, quejas, citas, falta de personal, mala atención; Por favor comunicarse con la EPS primero, antes de enviar una petición de tutela.",
    agregado: false,

  },
  {
    _id: "hecho-2",
    numHecho: "Hecho 2",
    contenido: "Dado el cumplimiento de la alcaldía municipal de Cúcuta, ya ha respondido ante ese tipos de hechos y peticones, de los cuales se está haciendo los procesos en lo que va el año 2022, como lo son las obras públicas ciclo viales (Centro de la ciudad), creación y representación de entidad recicladores, ayuda a los damnificados en los barrios de alto riesgo de de rumbes o deslizamiento por lluvias.",
    agregado: false,
  },
  {
    _id: "hecho-3",
    numHecho: "Hecho 3",
    contenido: "La alcaldía de Cúcuta, ha delegado sobre los hechos sobre reclamos de instrumentos, articulos, materiales, objetos deportivos como (balones, mallas, aros, canchas, entre demás objetos), cuya realización es cada inicio de año.",
    agregado: false,
  },
  {
    _id: "hecho-4",
    numHecho: "Hecho 4",
    contenido: "La alcaldía municipal de Cúcuta, no responde ese tipo de petición ni reclamos porque ya hay otra entidad en la ciudad que responde por la falta de manteniminto y aseo de las calles y avenidas en la ciudad, ante un reclamo por dicha entidad, la alcaldia se compromete en trabajar en lo que va del año en el mantenimiento y aseo de resto no.",
    agregado: false,
  },
];
const arrBtnTipos = [
  {
    _id: "tipo-1",
    numTipo: "Tipo 1",
    contenido: "Copia de representacion legal de la copropiedad o entidad de la empresa",
    agregado: false,
  },
  {
    _id: "tipo-2",
    numTipo: "Tipo 2",
    contenido: "Respuesta por medio dirijido al accionante, con adjuntos en relación al requerimiento y el cual fue rotundamente negado a recibir la reunión por parte de la comunidad y la alcaldía sobre los damnidicados de la zona.",
    agregado: false,
  },
  {
    _id: "tipo-3",
    numTipo: "Tipo 3",
    contenido: "En respuesta a los elementos, instrumentos, objetos y/o artículos para las instictuciones públicas se les ha dicho que hablen con la entidad de su comuna para suministrar lo que hace falta, igual forma reciben el suficiente dinero para adquirir la compra de los materiales que hace falta.",
    agregado: false,
  },
  {
    _id: "tipo-4",
    numTipo: "Tipo 4",
    contenido: "Con razón en los hechos presentados en la peticón en la tutela respondo que la alcaldía municipal no es responsable ante peticones, reclamos, quejas, respecto a otras entidades o empresas de la ciudad.",
    agregado: false,
  },
];


siguiente.addEventListener("click", (ev)=>{
  ev.preventDefault()
  if(datos.hechos.contenido === "" && datos.tipo.contenido === ""){
    errorFaltaDato("contenedor-hechos")
    errorFaltaDato("contenedor-tipos")
  }else{
    exportFinal.style.display = "block"
    exportFinal.innerHTML = `
    <p><b>Con esto doy cumplimiento a cada una de las pretencionessolicitadas por la accionante y lo ordenado por el honorable Juez</b>.</p>
    <br>
    <br>
    <h4>${datos.nombresApellidos}</h4>
    <h4>${datos.numCedula}</h4>
    <h4>CC</h4>
    <br>
    <h4>Nombre del Abogado</h4>
    <br>
    <div>
    <p>__________________________________</p>
    <h4 style="margin:0px 0px 0px 20%;">Firma</h4>
    </div>
    
    `
    setPasoApaso(ev, "none","none","flex")
  }
})

restablecer.addEventListener("click", (ev)=>{
  ev.preventDefault()
  datos.tipo = {
    listTipos:[],
    contenido:""
  }
  datos.hechos = {
    listHechos:[],
    contenido:""
  }
  prevHechos.innerHTML = ``
  prevTipos.innerHTML = `<h3 style="display: none;" id="anexos">Anexos</h3>`
  arrBtnHechos.concat(arrBtnTipos).forEach((ele, i)=>{
    ele.agregado = false
  })
})

/**
 * Crear botones para contenedores de hechos y tipos
 * @param {}
 * @returns {void}
 */
function globalBotones() {
    contenedorHechos.innerHTML = ""
    contenedorTipos.innerHTML = ""
  arrBtnHechos.forEach((hecho, index) => {
    contenedorHechos.innerHTML += `
    <button class="boton-dark" type="button" id=${hecho._id}> ${hecho.numHecho}</button>
    `;
  });
  arrBtnTipos.forEach((tipo, index) => {

    contenedorTipos.innerHTML += `
    <button class="boton-dark" type="button" id=${tipo._id}> ${tipo.numTipo}</button>
    `;
  });
  llamadaEventosBtn([...contenedorHechos.children]);
  llamadaEventosBtn([...contenedorTipos.children]);
}
/**
 * Activar eventos en los botones
 * @param arrBotones Resive todos los botones y desde aquí activamos los eventos
 * @returns {datos} Guarda datos formulario, numCedula nombreApellidos
 */
function llamadaEventosBtn(arrBotones = []) {
  arrBotones.forEach((btn, i) => {
    btn.addEventListener("click", (ev) => aggTipoHechoPrev(ev, btn, i));
  });
}
/**
 * Agrega el contenido del tipo o hechos al previzualizador
 * @param ev Resive todos los botones y desde aquí activamos los eventos
 * @param btn Mandar el botón quien activo el evento
 * @param i Es la clave para entrar el arreglo del contenido.
 * @returns {datos} Guarda datos formulario, numCedula nombreApellidos
 */


function aggTipoHechoPrev(ev,btn,i) {
  ev.preventDefault()

  if(btn.id.includes("hecho")){
    if(!arrBtnHechos[i].agregado){
      datos.hechos.contenido = arrBtnHechos[i].contenido
      datos.hechos.listHechos.push(arrBtnHechos[i])
      prevHechos.innerHTML += ` 
      <h3 style="text-align:center;">Hecho ${i+1}.</h3> 
      <p>${datos.hechos.contenido}</p>
      `
      arrBtnHechos[i].agregado = true
    }else{
      alert(`El Hecho ya fue agregado en el previzualizador`)
    }
  }else{
   if(datos.hechos.contenido === ""){
    errorFaltaDato("contenedor-hechos")
   }else{
    if(!arrBtnTipos[i].agregado){
      datos.tipo.contenido = arrBtnHechos[i].contenido
      datos.tipo.listTipos.push(arrBtnHechos[i])
      let anexos = document.getElementById("anexos")
      anexos.style.display = "block"
      anexos.style.textAlign = "center"
      prevTipos.innerHTML += ` 
        <ol type="1" id="listAnexos">
        </ol>
      `
      document.querySelector("#listAnexos").innerHTML += `<li>
      ${datos.tipo.contenido}
      </li>`
      arrBtnTipos[i].agregado = true
    }else{
      alert("El tipo ya fue agregado en el previzualizador")
    }
   }
  }
}

export { globalBotones };
