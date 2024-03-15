//deshacer
function deshacer(){
    capascache.push(capas.pop())
    ctxlimpio.clearRect(0, 0, canvas.width, canvas.height);
    redibujar(capas)
}