var borrar;
function borrador(x, y){
    seleccionar(x, y)

    if (auxcontadorcapa >= 0){
        for (var i = contadorcapa; i >= auxcontadorcapa; i--) { //guarda el orden de las capas y quita la capa superior que se selecciono
            if(i == auxcontadorcapa){
                borrar = capas.pop()
            } else {
                capasaux.push(capas.pop())
            }
        }
        for (var i = 0; i <= ((contadorcapa - auxcontadorcapa) - 1); i++){
            capas.push(capasaux.pop())
        }
    }
    ctxlimpio.clearRect(0, 0, canvas.width, canvas.height);
    redibujar(capas)
}

function eliminarFig(){
    if(encontrado){
        dibujado = dibujadoCopia.slice();
        dibujadoCopia.splice(posFigS, 1);
        redibujado(dibujadoCopia);
        btnElim.setAttribute("disabled", "true");
        posFigS = null;
    }
}