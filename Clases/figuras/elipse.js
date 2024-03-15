//algoritmo del punto medio para elipses
function elipse(cx,cy,fx,fy){

    var DA,DB,DX,DY, initink,aux;
    DX=Math.abs(fx - cx)
    DY=Math.abs(fy - cy)

    if(DX > DY){
        DA=DX
        
        for (let i = 0; DA > DY/2; i++) {
            DA= Math.round(Math.sqrt((1 - (Math.pow(i,2) / Math.pow(DX,2)))* Math.pow(DY,2)));
            
            dibujar( i+cx , DA+cy)
            dibujar( -i+cx , DA+cy)
            dibujar( -i+cx , -DA+cy)
            dibujar( i+cx , -DA+cy)

            
        }

        for(DA; DA>=0; DA--){
            initink=Math.round( Math.sqrt((1 - (Math.pow(DA,2) / Math.pow(DY,2)))* Math.pow(DX,2)));
            dibujar( initink+cx , DA+cy)
            dibujar( -initink+cx , DA+cy)
            dibujar( -initink+cx , -DA+cy)
            dibujar( initink+cx , -DA+cy)
        }
    }

    if( DX < DY ){
        aux=DX;
        DX=DY;
        DY=aux;
        DB=DY;

        for(let i=0; i <= DY/2; i++){
            DB=Math.round(Math.sqrt( (1- (Math.pow(i,2) / Math.pow(DY,2)))* Math.pow(DX,2)));

            dibujar( i+cx , DB+cy);
            dibujar( -i+cx , DB+cy);
            dibujar( -i+cx , -DB+cy);
            dibujar( i+cx , -DB+cy);
        }
        for(DB;DB>=0;DB--){
            initink=Math.round(Math.sqrt( (1 - (Math.pow(DB,2) / Math.pow(DX,2))) * Math.pow(DY,2)));

            dibujar( initink+cx , DB+cy);
            dibujar( -initink+cx , DB+cy);
            dibujar( -initink+cx , -DB+cy);
            dibujar( initink+cx , -DB+cy);

        }

    }
}

function previewelipse(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    elipse(x0, y0, x1, y1);
}