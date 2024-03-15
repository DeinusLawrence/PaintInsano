//rehacer
function rehacer(){
    capas.push(capascache.pop())
    ctxlimpio.clearRect(0, 0, canvas.width, canvas.height);
    redibujar(capas)
}