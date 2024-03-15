//guarda en un archivo .json los datos de las capas
function guardar(){
    const o_texto = JSON.stringify(capas);
    console.log(o_texto);
    download(o_texto, 'dibujo.json', 'application/json');
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}