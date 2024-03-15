//Funcion para hacer el circulo meidante el punto de medio
function circulo(x0, y0, x1, y1){
    var DX=Math.abs(x1-x0)
    var DY=Math.abs(y1-y0)

    Valor=(Math.pow(DX,2))+(Math.pow(DY,2))

    r=Math.sqrt(Valor)

    var x,y,p;

    x=0;
    y=r;

    p=(5 / 4)-r;

    while(x<=y){

        dibujar( x+x0, y+y0 )
        dibujar( y+x0, x+y0 )
        dibujar( -x+x0, -y+y0 )
        dibujar( -y+x0, -x+y0 )
        dibujar( x+x0, -y+y0 )
        dibujar( -y+x0, x+y0 )
        dibujar( -x+x0, y+y0 )
        dibujar( y+x0, -x+y0 )

        x++;
        if(p<=0){
            p= p + (2*x) + 1;
        }else{
            y=y-1;
            p= p + (2*x) - (2*y) + 1;
        }

    }
}

function previewcirculo(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    circulo(x0, y0, x1, y1);
}