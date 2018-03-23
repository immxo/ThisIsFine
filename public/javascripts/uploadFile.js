function uploadFile() {
    let file = $(".inputFile").prop('files')[0];
    let nameFile = file.name;
    let size = file.size;
    let sizeStr = (size / 1024).toFixed(2) + 'kB';

    let reader = new FileReader();
    reader.onload = function (event) {
        let dataFile = event.target.result;
        handlebars('.textareaTemplate', '.textareaEntry', true, {data: dataFile, sizeStr: sizeStr, nameFile: nameFile});
        $('.fileName__label').empty().append('Выберите файл...');
    };
    reader.readAsText(file);
}