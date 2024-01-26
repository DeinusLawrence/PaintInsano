var ModosDisp = ["linea", "lapiz", "borrar","Cuadrado"];
var PuntoInicio = null;
var PuntoFinal = null;
var ctx; 
var Modo = "";
var ColorTrazos = "#000000";
var GrosorTrazos = 2;


function CambiarModo(NuevoModo) {
    Modo = NuevoModo;
    PuntoInicio = null;
    PuntoFinal = null;
}


// CANVAS
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    var drawing = false; 
    ctx = canvas.getContext("2d");  // Asignar el contexto global aquí


    // Configurar color y grosor iniciales
    ctx.strokeStyle = ColorTrazos;
    ctx.lineWidth = GrosorTrazos;

    //Tamaño del canvas
    canvas.width = 1534;
    canvas.height = 650;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;



    //Obtener las cordenadas del cursor
    function obtenerCoordenadas(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function drawPixel(x, y) {
        var halfThickness = Math.floor(GrosorTrazos / 2);

        for (var i = -halfThickness; i <= halfThickness; i++) {
            for (var j = -halfThickness; j <= halfThickness; j++) {
                ctx.fillStyle = ColorTrazos;
                ctx.fillRect(x + i, y + j, 1, 1);
            }
        }
    }




    canvas.addEventListener("mousemove", function (event) {
        if (ModosDisp.includes(Modo)) {
            var coordenadas = obtenerCoordenadas(event);

            if (Modo === "lapiz" && drawing) {
                ctx.lineTo(coordenadas.x, coordenadas.y);
                ctx.stroke();
            } else if (Modo === "borrar" && drawing) {
                ctx.clearRect(coordenadas.x - 10, coordenadas.y - 10, 30, 30);
            }else if( Modo === "Cuadrado" && drawing ){
                

            }
        }
    });

    canvas.addEventListener("mousedown", function (event) {
        if (Modo === "linea") {
            if (!PuntoInicio) {
                PuntoInicio = obtenerCoordenadas(event);
            } else {
                PuntoFinal = obtenerCoordenadas(event);
                Algoritmo(PuntoInicio, PuntoFinal);
                PuntoInicio = null;
                PuntoFinal = null;
            }

        }else if(Modo === "Cuadrado"){
            if (!PuntoInicio) {
                PuntoInicio = obtenerCoordenadas(event);
            } else {
                PuntoFinal = obtenerCoordenadas(event);
                CuadradoDibujo(PuntoInicio, PuntoFinal);
                PuntoInicio = null;
                PuntoFinal = null;
            }

        } else if (ModosDisp.includes(Modo)) {
            if (Modo === "lapiz" || Modo === "borrar") {
                ctx.beginPath();
                var coordenadas = obtenerCoordenadas(event);
                ctx.moveTo(coordenadas.x, coordenadas.y);
                drawing = true;
            }
        }
    });

    canvas.addEventListener("mouseup", function () {
        drawing = false;  // Se desactiva la bandera de dibujo al soltar el botón del mouse
    });

    //y = mx + b (Pendiente ordenada al origen)
    function Algoritmo(Inicio, Final) {

        var dx = Final.x - Inicio.x;        // Delta x
        var dy = Final.y - Inicio.y;        // Delta y

        // Pendiente
        var m = dy / dx;
        var b = Inicio.y - m * Inicio.x;   // Ordenada en el origen

        // Intercambiar los puntos para que siempre se dibuje de izquierda a derecha
        if (Inicio.x > Final.x) {
            var temp = Inicio;
            Inicio = Final;
            Final = temp;
        }

        // Coordenada inicial
        var x = Inicio.x;
        var y = Inicio.y;

        // Determinar el cuadrante
        var xIncrement, yIncrement;

        if (Math.abs(m) <= 1) {
            xIncrement = 1;
            yIncrement = m;
        } else {
            xIncrement = 1 / Math.abs(m);
            yIncrement = m < 0 ? -1 : 1;
        }

        //Dibujar los puntos intermedios
        while (x <= Final.x) {
            drawPixel(Math.round(x), Math.round(y));
            x += xIncrement;
            y += yIncrement;
        }

        // Pintar el punto final
        drawPixel(Final.x, Final.y);
    }

    //LINEA  BRESENHAM
    function Algoritmo1(start, end) {

        var dx = Math.abs(end.x - start.x);
        var dy = Math.abs(end.y - start.y);
        
        var sx = (start.x < end.x) ? 1 : -1; 
        var sy = (start.y < end.y) ? 1 : -1;

        var err = dx - dy;

        while (true) {

            for (var i = 0; i < GrosorTrazos; i++) {
                for (var j = 0; j < GrosorTrazos; j++) {
                    ctx.fillStyle = ColorTrazos;
                    ctx.fillRect(start.x + i, start.y + j, 1, 1);
                }
            }

            if ((start.x === end.x) && (start.y === end.y)) {
                break;
            }

            var e2 = 2 * err;


            if (e2 > -dy) {
                err -= dy;
                start.x += sx;
            }

            if (e2 < dx) {
                err += dx;
                start.y += sy;
            }
        }
    }

    // DIGITAL DIFFERENTIAL ANALYZER
    function Algoritmo3(Inicio, Final) {
        // Algoritmo de DDA

        // Calcular la distancia entre los dos puntos
        var dx = Final.x - Inicio.x;
        var dy = Final.y - Inicio.y;

        // Calcular el numero de pasos
        var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);

        // Calcular el incremento para cada paso
        var xIncrement = dx / steps;
        var yIncrement = dy / steps;

        // Coordenada inicial
        var x = Inicio.x;
        var y = Inicio.y;

        // Dibujar cada punto
        for (var i = 0; i <= steps; i++) {

            // Redondear las coordenadas
            var roundedX = Math.round(x);
            var roundedY = Math.round(y);

            // Dependiendo del grosor, dibujar más píxeles alrededor del punto
            for (var k = 0; k < GrosorTrazos; k++) {
                for (var j = 0; j < GrosorTrazos; j++) {
                    ctx.fillStyle = ColorTrazos;
                    ctx.fillRect(roundedX + k, roundedY + j, 1, 1);
                }
            }

            // Actualizar las coordenadas con el incremento
            x += xIncrement;
            y += yIncrement;
        }
    }


    function CuadradoDibujo(Inicio, Final) {
        // Calcular el ancho y alto del cuadrado
        var width = Math.abs(Final.x - Inicio.x);
        var height = Math.abs(Final.y - Inicio.y);
    
        // Determinar el punto de inicio y el punto final para el cuadrado
        var cuadradoStart = {
            x: (Final.x > Inicio.x) ? Inicio.x : Final.x,
            y: (Final.y > Inicio.y) ? Inicio.y : Final.y
        };
    
        var cuadradoEnd = {
            x: cuadradoStart.x + Math.min(width, height),
            y: cuadradoStart.y + Math.min(width, height)
        };
    
        // Dibujar el contorno del cuadrado
        Algoritmo3(cuadradoStart, { x: cuadradoEnd.x, y: cuadradoStart.y });
        Algoritmo3({ x: cuadradoEnd.x, y: cuadradoStart.y }, cuadradoEnd);
        Algoritmo3(cuadradoEnd, { x: cuadradoStart.x, y: cuadradoEnd.y });
        Algoritmo3({ x: cuadradoStart.x, y: cuadradoEnd.y }, cuadradoStart);
    }
});
