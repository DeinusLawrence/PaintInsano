function cuadrado(x0, y0, x1, y1){
    var DX=0, DY=0;

    var Lado=0;
    DX=x1-x0;
    DY=y1-y0;
    Lado=(DX>=DY)?DY:DX;
    
    linea(x0,y0,Lado+x0,y0);

    linea(Lado+x0,y0,Lado+x0,Lado+y0);

    linea(Lado+x0,Lado+y0,x0,Lado+y0);

    linea(x0,y0,x0,Lado+y0);
}

function previewcuadrado(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    cuadrado(x0, y0, x1, y1);
}