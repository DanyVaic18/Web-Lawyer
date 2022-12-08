import {setPasoApaso} from './main.js'

const volverBoton = [...document.getElementsByClassName("volver")];
const exportFinal = document.querySelector("#export-final")
volverBoton.forEach((vol, i)=>{
    vol.addEventListener("click", (ev) => {
      if(i === 0){
        setPasoApaso(ev, "block", "none", "none")
      }else{
        setPasoApaso(ev, "none", "block", "none")
        exportFinal.style.display = "none"
      }
      });
})
export{}