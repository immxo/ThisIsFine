$( document ).ready(function() {
    getAllJson();
});

function getAllJson() {
    $.ajax({
        url: "/getAllJson",
        type: 'get',
    })
        .done(function (data) {
            console.log(data);
            data.item.forEach(function (item) {
            handlebars('.AllJsonTemplate','.AllJsonEntry',false, {link: item.link});

        });
    });
}

function saveJSON(){
    if($('.deleteCheckBox').prop('checked')){
        var deleteCheck = true;
        console.log(deleteCheck);
    }
    let data = $('.textarea').val();
    try{
        let dataParse = JSON.parse(data);
        let dataStr = JSON.stringify(dataParse, null, 4);

        $.ajax({
            url: "/save",
            type: 'post',
            data: {
                link:linkGenerator(),
                dataJSON: dataStr,
                deleteCheck: deleteCheck
            }
        })
            .done(function (data) {

                handlebars('.linkTemplate','.linkEntry',false, {link: data.link});

            });
    }
    catch(err) {
        alert("Это не JSON");
    }
}

function getJSON(link){
    $.ajax({
        url: "/getJSON/"+link,
        type: 'get',

    })
        .done(function (data) {
            handlebars('.getJSON','.entryJSON',true, {dataJSON:data.dataJSON});
        });
}

function editJSON(){
    $('.textarea').removeAttr('readonly');
}

function linkGenerator() {
    let link = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++)
        link += possible.charAt(Math.floor(Math.random() * possible.length));

    return link;
}

function convertToXml() {
    let data = $('.textarea').val();
    try{
        let dataParse = JSON.parse(data);
        let dataStr = JSON.stringify(dataParse, null, 4);

        $.ajax({
            url: "/convertToXml",
            type: 'post',
            data: {
                dataJSON:dataStr
            }
        })
            .done(function (data) {

                handlebars('.textareaTemplate','.textareaEntry',true, {data: data.dataXml});

            });
    }
    catch(err) {
        alert("Это не JSON");
    }
}

function uploadFile() {
    let file = $(".inputFile").prop('files')[0];

    let size = file.size;
    let sizeStr = 'Размер: ' + (size/1024).toFixed(1) + 'kB';



    let reader = new FileReader();
    reader.onload = function(event) {
        let dataFile = event.target.result;
        handlebars('.textareaTemplate','.textareaEntry',true, {data: dataFile, sizeStr: sizeStr});
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