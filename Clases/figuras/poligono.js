//Funcion para poligono
function poligono(x1, y1, x2, y2){
   if(lados > 2){
     let cos=0, sin=0, r=0, angulo=0, lado=0, antx=0, anty=0;
     lado = 360/lados;
     r=x2-x1;
     console.log(r)
     angulo=gradosARadianes(0);
     antx=Math.round((Math.cos(angulo))*r);
     anty=Math.round((Math.sin(angulo))*r);
     for(let i=lado ; i<360+lado ; i+=lado){
       angulo=gradosARadianes(i);
       cos=Math.round((Math.cos(angulo))*r);
       sin=Math.round((Math.sin(angulo))*r);
       dibujar_linea(antx+x1,anty+y1,cos+x1,sin+y1);
       antx=cos;anty=sin;
     }
   }
}

const gradosARadianes = grados => (grados * Math.PI)/180.0;  

function previewpoligono(x0, y0, x1, y1){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    poligono(x0, y0, x1, y1);
}

var cont = 0;

    let dibujar_linea = (x1, y1, x2, y2) => {    
        let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;  
        dx = x2 - x1;
        dy = y2 - y1;    
        dx1 = Math.abs(dx);
        dy1 = Math.abs(dy);   
        px = 2 * dy1 - dx1;
        py = 2 * dx1 - dy1;   
        if (dy1 <= dx1) {       
            if (dx >= 0) {
                x = x1; y = y1; xe = x2;
            }
            else {                
                x = x2; y = y2; xe = x1;
            }
            dibujar(x, y); 
            for (i = 0; x < xe; i++) {
                x = x + 1;           
                if (px < 0) {
                    px = px + 2 * dy1;
                } else {
                    if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                        y = y + 1;
                    } else {
                        y = y - 1;
                    }
                    px = px + 2 * (dy1 - dx1);
                }            
                            
                dibujar(x, y);
            }
        } else { 
            if (dy >= 0) {
                x = x1; y = y1; ye = y2;
            } else { 
                x = x2; y = y2; ye = y1;
            }
            dibujar(x, y); 
            for (i = 0; y < ye; i++) {
                y = y + 1;          
                if (py <= 0) {
                    py = py + 2 * dx1;
                } else {
                    if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                        x = x + 1;
                    } else {
                        x = x - 1;
                    }
                    py = py + 2 * (dx1 - dy1);
                }           
                            
                dibujar(x, y);
            }
        }
        cont++;
    }
