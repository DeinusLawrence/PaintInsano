//guarda el canvas en una imagen .png
function guardarcomo(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let dataURL = canvaslimpio.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href',url);
    downloadLink.click();
}