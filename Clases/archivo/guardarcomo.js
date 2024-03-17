//guarda el canvas en una imagen .png
function guardarcomo(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let dataURL = canvaslimpio.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href',url);
    downloadLink.click();
}

function guardarcomo1() {
    // Captura el contenido del canvas como una imagen en formato PNG
    let imgData = canvaslimpio.toDataURL('image/png');

    // Configura el documento PDF
    let pdf = new jsPDF();
    let imgWidth = pdf.internal.pageSize.getWidth();
    let imgHeight = canvaslimpio.height * imgWidth / canvaslimpio.width;

    // Agrega la imagen al documento PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Guarda el PDF
    pdf.save('CanvasAsPDF.pdf');
}