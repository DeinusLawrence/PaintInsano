//Funcion para hacer rectangulo
function rectangulo(x0, y0, x1, y1){
    linea(x0, y0, x1, y0);
    linea(x0, y1, x1, y1);
    linea(x0, y0, x0, y1);
    linea(x1, y0, x1, y1);
}

function previewrectangulo(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    rectangulo(x0, y0, x1, y1);
}