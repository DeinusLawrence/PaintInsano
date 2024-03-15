//Funcion lapiz
function lapiz(x,y){
    ctx.beginPath();
    ctx.dibujar_linea(x, y);
    ctx.strokeStyle= color;
    ctx.lineWidth = grosor;
    ctx.lineCap = 'round';
    ctx.stroke();
}