//abrir archivo, abre el archivo .json guardado y redibuja
function abrir(){
    //funcion para poder abrir el archivo
    document.getElementById("abrir_ar").click();

    const ar_entrada = document.getElementById('abrir_ar');
    ar_entrada.addEventListener('change', function (e){
        const reader = new FileReader()

        reader.onload = function () {
       
            capas = JSON.parse(reader.result);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctxlimpio.clearRect(0, 0, canvas.width, canvas.height);

            redibujar(capas);
        }
        reader.readAsText(ar_entrada.files[0])
    }, false);
}

//funcion de redibujar el archivo guardado
function redibujar(capas){
    capas.forEach(capa => {
        figura = capa.figura
        inicialX = capa.x0
        inicialY = capa.y0
        finalX = capa.x1
        finalY = capa.y1
        color = capa.color
        grosor = capa.grosor
        lados = capa.lados
        SavPosiciones = capa.posiciones
        switch(figura){
            case "cuadrado":
                cuadrado(inicialX, inicialY, finalX, finalY)
                break;
            case "circulo":
                circulo(inicialX, inicialY, finalX, finalY)
                break;
            case "elipse":
                elipse(inicialX, inicialY, finalX, finalY)
                break;
            case "poligono":
                poligono(inicialX, inicialY, finalX, finalY)
                break;
            case "rectangulo":
                rectangulo(inicialX, inicialY, finalX, finalY)
                break;
            case "linea":
                linea(inicialX, inicialY, finalX, finalY)
                break;
            case "lapiz":
                SavPosiciones.forEach(posiciones => {
                    finalX = inicialX
                    finalY = inicialY
                    inicialX = posiciones.x
                    inicialY = posiciones.y
                    dibujarline(inicialX, inicialY, finalX, finalY)
                })
                break;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}



