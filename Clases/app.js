//contexto del canvas
var canvas = document.getElementById('canvas');
var ctx =canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();

var canvaslimpio = document.getElementById('canvaslimpio')
var ctxlimpio = canvaslimpio.getContext('2d')

//variables globales
var cont, capacont = 0
var flag = false;

//variables de coordenadas
var x=0, y=0, inicialX = 0, inicialY = 0, finalX = 0, finalY = 0, clicX = 0, clicY = 0;

//variables de herramientas inicializadas
var tool = "lapiz";
var color = "#000000";
var grosor = 3;
var lados = 3;

//array guardar posiciones
let SavPosiciones = []

//array de capas
let capas = [
    {
        capa: 0,  //identificador
        figura: [{
            "tipo": "", //tipo figura
            "Color": "",    //grosor de trazo
            "Grosor": 0,    //color de la figura
            "lados": 0, //numero de lados para el poligono
            "x0": 0, //coordenadas de la figura
            "y0": 0,
            "x1": 0,
            "y1": 0 
        }],
        posiciones: [] //todas las posiciones X y Y de la figura
    }
]

//array de capas cache y aux
let capascache = []
let capasaux = []

//guardar coordenadas iniciales
canvas.addEventListener('mousedown', e=>{
    inicialX = x = e.clientX - rect.left;
    inicialY = y = e.clientY - rect.top;
    flag = true;
});

//guarda coordenadas para crear preview
canvas.addEventListener('mousemove', e=>{
    
    if (flag == true){
        switch(tool){
            case "cuadrado":
                previewcuadrado(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
                break;
            case "circulo":
                previewcirculo(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
                break;
            case "lapiz":
                dibujarline(x, y, e.clientX - rect.left, e.clientY - rect.top); 
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
                break;
            case "elipse":
                previewelipse(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
                break;
            case "poligono":
                previewpoligono(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
                break;
            case "linea":
                previewlinea(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
                break;
            case "rectangulo":
                previewrectangulo(inicialX, inicialY, e.clientX - rect.left, e.clientY - rect.top)
        }
    }   
    
});

//guardar coordenadas finales y seleccionar herramienta (que fue previamente seleccionada)
canvas.addEventListener('mouseup', e=>{
    finalX = e.clientX - rect.left;
    finalY = e.clientY - rect.top;
    flag = false;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (tool) {
        case "cuadrado":
            cuadrado(inicialX, inicialY, finalX, finalY)
            capacont++;
            nuevacapa()
            break;
        case "circulo":
            circulo(inicialX,inicialY,finalX, finalY);
            capacont++;
            nuevacapa()
            break;
        case "poligono":
            poligono(inicialX, inicialY, finalX, finalY)
            capacont++;
            nuevacapa()
            break;
        case "rectangulo":
            rectangulo(inicialX, inicialY, finalX, finalY)
            capacont++;
            nuevacapa()
            break;
        case "elipse":
            elipse(inicialX, inicialY, finalX, finalY)
            capacont++;
            nuevacapa()
            break;
        case "linea":
            linea(inicialX, inicialY, finalX, finalY)
            capacont++;
            nuevacapa()
            break;
        case "lapiz":
            dibujarline(finalX, finalY, e.clientX - rect.left, e.clientY - rect.top); 
            capacont++;
            nuevacapa()
            break;
    }

    SavPosiciones = []
    
    capascache = []

});

//
canvas.addEventListener("click", e=>{
    clicX = e.clientX - rect.left;
    clicY = e.clientY - rect.top;
    if(tool=="borrador"){
        borrador(clicX, clicY)
    }
});

//seleccion de herramienta (en mi logica se elige la herramienta de dibujar antes de dibujar)
function herramientaseleccionada(herramienta) {
    switch (herramienta) {
        case "cuadrado":
            tool = herramienta
            break;
        case "circulo":
            tool = herramienta
            break;
        case "poligono":
            lados = prompt("Dame el numero de lados")
            tool = herramienta
            break;
        case "rectangulo":
            tool = herramienta
            break;
        case "elipse":
            tool = herramienta
            break;
        case "linea":
            tool = herramienta
            break;
        case "lapiz":
            tool = herramienta
            break;       
        case "borrador":
            tool = herramienta
            break;
    };
}

//grosor
function tamaño_grosor(){
    grosor=prompt("Dame tu grosor")
}

//color
function pintura(pintura){
    color = pintura
}

//funcion de dibujar, usada en la mayoria de las figuras
function dibujar(x, y) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), grosor, grosor);
    ctx.fill();
    if(flag==false){
        registrarposicion(x,y) //envia los datos x & y para registrar la posicion
        ctxlimpio.beginPath();
        ctxlimpio.fillStyle = color;
        ctxlimpio.fillRect(Math.round(x), Math.round(y), grosor, grosor);
        ctxlimpio.fill();
    }
}

//funcion de dibujar, usada para el lapiz
function dibujarline(x1, y1, x2, y2){
    ctxlimpio.beginPath();
    ctxlimpio.strokeStyle=color;
    ctxlimpio.lineWidth=grosor;
    ctxlimpio.moveTo(x1,y1)
    ctxlimpio.lineTo(x2,y2)
    ctxlimpio.stroke();
    ctxlimpio.closePath();
    registrarposicion(x1, y1)   //envia los datos x & y para registrar la posicion
    registrarposicion(x2, y2)
}

//guarda los datos de la figura hecha, utilizado para el tema de capas
function nuevacapa(){
    let nuevacapa = {
        "capa" : capacont,
        "figura": tool,
        "grosor": grosor,
        "color": color,
        "lados": lados,
        "x0": inicialX,
        "y0": inicialY,
        "x1": finalX,
        "y1": finalY,
        "posiciones": SavPosiciones 
    }
    capas.push(nuevacapa)
}

//registra las posiciones que al final tendra la figura despues de soltar el mouse
function registrarposicion(x, y){
    let posicion = {
        "x": x,
        "y": y
    }
    SavPosiciones.push(posicion)
}