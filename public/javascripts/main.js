$( document ).ready(function() {
    getAllJson();

    $(".inputFile").change(function() {
        let file = $(".inputFile").prop('files')[0];
        $('.fileName__label').empty().append(file.name);
    });
});

function editJSON(){
    $('.textarea').removeAttr('readonly');
}

function linkGenerator() {
    let link = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
        link += possible.charAt(Math.floor(Math.random() * possible.length));

    return link;
}

function uploadFile() {
    let file = $(".inputFile").prop('files')[0];
    let nameFile = file.name;
    let size = file.size;
    let sizeStr =(size/1024).toFixed(2) + 'kB';

    let reader = new FileReader();
    reader.onload = function(event) {
        let dataFile = event.target.result;
        handlebars('.textareaTemplate','.textareaEntry',true, {data: dataFile, sizeStr: sizeStr, nameFile: nameFile});
        $('.fileName__label').empty().append('Выберите файл...');
    };
    reader.readAsText(file);

}

function handlebars(template, entry, empty, data){
    var templateScript = $(template).html();
    var template = Handlebars.compile(templateScript);
    if(empty){
        $(entry).empty().append(template(data));
    }
    else{
        $(entry).append(template(data));
    }
}

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});