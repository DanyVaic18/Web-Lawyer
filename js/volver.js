import {setPasoApaso} from './main.js'

const volverBoton = [...document.getElementsByClassName("volver")];

volverBoton.forEach((vol, i)=>{
    vol.addEventListener("click", (ev) => {
        i === 0? 
        setPasoApaso(ev, "block", "none", "none"):
        setPasoApaso(ev, "none", "block", "none");
      });
})
export{}