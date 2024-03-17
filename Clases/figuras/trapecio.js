function trapecio(x0, y0, x1, y1){
    
    var altura = 0;
    var dis = 0;
    var calculo = 0;

    altura = y1-y0;
    dis = x1-x0;
    calculo = dis /2;

    linea(x0, y1, x1, y1);

    linea(x0-calculo, y1-altura, x1 + calculo, y1-altura);

    linea(x0, y1, x0-calculo, y1-altura);

    linea(x1, y1, x1 + calculo, y1-altura);

}

function previewtrapecio(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    rectangulo(x0, y0, x1, y1);
}
