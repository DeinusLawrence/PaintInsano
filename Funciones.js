document.addEventListener("DOMContentLoaded", function () {

    //Declaracion del pizarron y el formato 2d-----------------------------------------------------------------
    var canvas = document.getElementById("Pizarra");
    var ctx = canvas.getContext("2d");
    var Coordenadas = [0, 0, 0, 0];

    //Tamaño del canvas----------------------------------------------------------------------------------------
    canvas.width = 1500;
    canvas.height = 650;


    //Funcion para ver que figura esa seleccionada-------------------------------------------------------------
    var Seleccionar_Figura = null;
    var Figura_Elegida = document.querySelectorAll('.Boton_Seleccion');
    var Grosor = document.getElementById("Grosor");
    var Movimiento = false;

    //Elegir Figura--------------------------------------------------------------------------------------------
    Figura_Elegida.forEach(function (button) {
        button.addEventListener('click', function () {
            button.classList.add('selected');
            Figura_Elegida.forEach(function (otherButton) {
                if (otherButton !== button) {
                    otherButton.classList.remove('selected');
                }
            });
            Seleccionar_Figura = button;
        });
    });


    //Primeras coordenadas al dar clik-------------------------------------------------------------------------
    canvas.addEventListener("mousedown", function (e) {
        Movimiento = true;
        var X1 = parseInt( e.clientX - canvas.getBoundingClientRect().left);
        var Y1 = parseInt(e.clientY - canvas.getBoundingClientRect().top);
        Coordenadas[0]= X1;
        Coordenadas[1]= Y1;
    });


    //Segundas coordenadas al soltar clik----------------------------------------------------------------------
    canvas.addEventListener("mouseup", function (e) {
        Movimiento = false;
            var X2 = parseInt(e.clientX - canvas.getBoundingClientRect().left);
            var Y2 = parseInt(e.clientY - canvas.getBoundingClientRect().top);
            Coordenadas[2]= X2;
            Coordenadas[3]= Y2;
            Figura();
    });


    canvas.addEventListener("mousemove", function (e) {
        if (Movimiento == true && Seleccionar_Figura.id == "Lapiz") {
            var Contorno = Grosor.value;
            ctx.lineWidth = Contorno;
            var Code_Color = document.getElementById('Color');
            var Aplic_Color = Code_Color.value;
            ctx.strokeStyle = Aplic_Color; 
            var x2 = parseInt(e.clientX - canvas.getBoundingClientRect().left);
            var y2 = parseInt(e.clientY - canvas.getBoundingClientRect().top);
            ctx.beginPath();
            ctx.moveTo(Coordenadas[0], Coordenadas[1]);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            Coordenadas[0] = x2;
            Coordenadas[1] = y2;
        }
    });


    //Funcion para elegir color--------------------------------------------------------------------------------
    function ColorContorno(){
        var Codigo_Color = document.getElementById('Color');
         var Aplicar_Color = Codigo_Color.value;
     ctx.fillStyle = Aplicar_Color;
     }


    //Funcion para escojer una figura--------------------------------------------------------------------------
    function Figura() {
        if (Seleccionar_Figura) {
            switch (Seleccionar_Figura.id) {
                case "Lapiz":
                    //Lapiz
                    Lapiz();
                    break;
                case "Limpiar":
                    BorrarCanvas(ctx)
                    break;
                case "Linea":
                    //Algoritmo Punto Pendiente
                    Linea_Algoritmo3();
                    break;
                case "Cuadro":
                    //Algoritmo para crear un cuadrado
                    Cuadrado();
                    break;
                case "Circulo":
                    //Algoritmo para crear un circulo
                    Circulo();
                    break;
                case "Poligono":
                    //Algoritmo para Poligonos
                    Poligono();
                    break;
                case "Elipse":
                    //Algoritmo para Elipse
                    Elipse();
                    break;
                default:
                    break;
            }
        }
    }

    //Funcion Lapiz -------------------------------------------------------------------------------------------
    function Lapiz() {
        ColorContorno();
        var Contorno = Grosor.value;
    }

    //Funcion Limpiar Pizarron---------------------------------------------------------------------------------
    function BorrarCanvas(ctx) {
        // Borra el lienzo completo
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }


    //Punto Pendiente------------------------------------------------------------------------------------------
    function Linea_Algoritmo1() {
        var Y = 0;
        var X = 0;
        var M = 0;

        ColorContorno();
        //Invierte las coordenadas si x2 es menor que x1
        if (Coordenadas[2] < Coordenadas[0]) {
            var temp = Coordenadas[0];
            Coordenadas[0] = Coordenadas[2];
            Coordenadas[2] = temp;
        
            temp = Coordenadas[1];
            Coordenadas[1] = Coordenadas[3];
            Coordenadas[3] = temp;
        }
        var dy = (Coordenadas[3] - Coordenadas[1]);
        var dx = (Coordenadas[2] - Coordenadas[0]);
        var b = Coordenadas[1] - (Coordenadas[0] * (dy) / (dx));
        M = dy / dx;

        X = Coordenadas[0];
        Y = Coordenadas[1];

        console.log(Coordenadas[0],Coordenadas[1]);
        console.log(Coordenadas[2],Coordenadas[3]);

        if (Math.abs(dx) > Math.abs(dy)) {
            if (Coordenadas[2] < Coordenadas[0]) {
                //decresientes en x
                while (X > Coordenadas[2]) {
                    ctx.fillRect(X, Y, 2, 2);
                    Y = M * X + b;
                    X--;
                }
            } else {
                //cresientes en x
                while (X < Coordenadas[2]) {
                    ctx.fillRect(X, Y, 1, 1);
                    Y = M * X + b;
                    X++;
                }
            }
        } else { 
            if (Coordenadas[3] < Coordenadas[1]) {
                //decrecientes en y
                while (Y > Coordenadas[3]) {
                    ctx.fillRect(X, Y, 1, 1);
                    X = (Y - b) / M;
                    Y--;
                }
            } else {
                //crecientes en y
                while (Y < Coordenadas[3]) {
                    ctx.fillRect(X, Y, 1, 1);
                    X = (Y - b) / M;
                    Y++;
                }
            } 
        }
        Coordenadas = [0, 0, 0, 0]
        
    }


    //Algoritmo de Bresenham-----------------------------------------------------------------------------------
    function Linea_Algoritmo2(){
        ColorContorno();

        var Dy = (Coordenadas[3] - Coordenadas[1]);
        var Dx = (Coordenadas[2] - Coordenadas[0]);
        let Start_Xr, Start_Yr;
        let Start_Yi, Start_Xi;

        if (Dy >= 0) {
            Start_Yi = 1;
        } else {
            Dy = -Dy;
            Start_Yi = -1;
        }

        if (Dx >= 0) {
            Start_Xi = 1;
        } else {
            Dx = -Dx;
            Start_Xi = -1;
        }

        if (Dx >= Dy) {
            Start_Yr = 0;
            Start_Xr = Start_Xi;
        } else {
            Start_Xr = 0;
            Start_Yr = Start_Yi;
            let k = Dx;
            Dx = Dy;
            Dy = k;
        }

        let x = Coordenadas[0];
        let y = Coordenadas[1];
        
        let avR = 2 * Dy;
        let av = avR - Dx;
        let avI = av - Dx;

        do {
            ctx.fillRect(x, y, 1, 1);
            if (av >= 0) {
                x = x + Start_Xi; 
                y = y + Start_Yi; 
                av = av + avI; 
            } else {
                x = x + Start_Xr; 
                y = y + Start_Yr; 
                av = av + avR; 
            }
        } while (!(x == Coordenadas[2] && y == Coordenadas[3])); 
    }


    //Algoritmo DDA--------------------------------------------------------------------------------------------
    function Linea_Algoritmo3() {
        ColorContorno();
        var Contorno = Grosor.value;
        var X1, X2, Y1, Y2;
        X1 = Coordenadas[0];
        Y1 = Coordenadas[1];
        X2 = Coordenadas[2];
        Y2 = Coordenadas[3];
        var S;
        var AX;
        var AY;

        let Dx= X2 - X1;
        let Dy = Y2 - Y1;

        if (Math.abs(Dx) >= Math.abs(Dy)) {
            S = Math.abs(Dx);
        } else if (Math.abs(Dx) <= Math.abs(Dy)) {
            S = Math.abs(Dy);
        }

        AX = Dx / S;
        AY = Dy / S;

        let PX = X1; 
        let PY = Y1; 

        for (var St = 1; St <= S; St++) {
            PX += AX;
            PY += AY;
            ctx.fillRect(PX, PY, Contorno, Contorno);
        }
    }


    //Cuadrado-------------------------------------------------------------------------------------------------
    function Cuadrado(){
        ColorContorno();
        var X = Coordenadas[0];
        var Y = Coordenadas[1];
        var Lado_x = Math.abs(Coordenadas[2] - Coordenadas[0]); // Calcula la longitud del lado del cuadrado
        var Lado_y = Math.abs(Coordenadas[3] - Coordenadas[1]); // Calcula la longitud del lado del cuadrado

        // Dibuja el perímetro del cuadro
        if (Lado_x > Lado_y) {
            ctx.strokeRect(X, Y, Lado_x, Lado_x);
        } else {
            ctx.strokeRect(X, Y, Lado_y, Lado_y);
        }
        
    }


    //Circulo--------------------------------------------------------------------------------------------------
    function Circulo() {
        ColorContorno();
        var Contorno = Grosor.value;
        var X1, Y1, X2, Y2;
        X1 = Coordenadas[0];
        Y1 = Coordenadas[1];
        X2 = Coordenadas[2];
        Y2 = Coordenadas[3];

        let Radio = Math.sqrt(Math.pow(X2 - X1, 2) + Math.pow(Y2 - Y1, 2));
        let X = Radio;
        let Y = 0;
        let P = 1 - Radio;

        while (X > Y) {
            ctx.fillRect(X1 + X, Y1 - Y, Contorno, Contorno);
            ctx.fillRect(X1 - X, Y1 - Y, Contorno, Contorno);
            ctx.fillRect(X1 + X, Y1 + Y, Contorno, Contorno);
            ctx.fillRect(X1 - X, Y1 + Y, Contorno, Contorno);
            ctx.fillRect(X1 + Y, Y1 - X, Contorno, Contorno);
            ctx.fillRect(X1 - Y, Y1 - X, Contorno, Contorno);
            ctx.fillRect(X1 + Y, Y1 + X, Contorno, Contorno);
            ctx.fillRect(X1 - Y, Y1 + X, Contorno, Contorno);
            Y++;

            if (P <= 0) {
                P = P + 2 * Y + 1;
            } else {
                X--;
                P = P + 2 * Y - 2 * X + 1;
            }
        }
    }


    //Poligono-------------------------------------------------------------------------------------------------
    function Poligono() {
        ColorContorno();
        var X1, Y1, X2, Y2;
        X1 = Coordenadas[0];
        Y1 = Coordenadas[1];
        X2 = Coordenadas[2];
        Y2 = Coordenadas[3];
        var X = X1;
        var Y = Y1;
        let radio = Math.sqrt(Math.pow(X2 - X1, 2) + Math.pow(Y2 - Y1, 2));
        var num = parseInt(document.getElementById("Lados").value);
        var angulo = Math.PI * 2 / num;

            for (let i = 1; i <= num; i++) {
                X1 = X + radio * Math.cos(angulo * i);
                Y1 = Y + radio * Math.sin(angulo * i);
                X2 = X + radio * Math.cos(angulo * (i + 1));
                Y2 = Y + radio * Math.sin(angulo * (i + 1));

                Coordenadas[0] = X1;
                Coordenadas[1] = Y1;
                Coordenadas[2] = X2;
                Coordenadas[3] = Y2;
                Linea_Algoritmo3();
            }
    }


    function  Elipse() {
        ColorContorno();
        var Contorno = Grosor.value;
        var X1, Y1, X2, Y2;
        X1 = Coordenadas[0];
        Y1 = Coordenadas[1];
        X2 = Coordenadas[2];
        Y2 = Coordenadas[3];

        var A = Math.abs(X2 - X1);
        var B = Math.abs(Y2 - Y1);
        var B1 = B & 1;
        var Dx = 4 * (1 - A) * B * B;
        var Dy = 4 * (B1 + 1) * A * A;
        var Err = Dx + Dy + B1 * A * A;
        var E2;
        

        if (X1 > X2) {
            X1 = X2;
            X2 += A;
        }
        if (Y1 > Y2)
            Y1 = Y2;
        Y1 += (B + 1) / 2;
        Y2 = Y1 - B1;
        A *= 8 * A;
        B1 = 8 * B * B;

        do {
        ctx.fillRect(X2, Y1, Contorno, Contorno);
        ctx.fillRect(X1, Y1, Contorno, Contorno); 
        ctx.fillRect(X1, Y2, Contorno, Contorno); 
        ctx.fillRect(X2, Y2, Contorno, Contorno); 
            E2 = 2 * Err;
            if (E2 <= Dy) {
                Y1++;
                Y2--;
                Err += Dy += A;
            } /* y step */
            if (E2 >= Dx || 2 * Err > Dy) {
                X1++;
                X2--;
                Err += Dx += B1;
            } /* x step */
        } while (X1 <= X2);
    }


});