$( document ).ready(function() {
    getAllJson();

    $(".inputFile").change(function() {
        let file = $(".inputFile").prop('files')[0];
        $('.fileName__label').empty().append(file.name);
    });
});

function getAllJson() {
    $.ajax({
        url: "/getAllJson",
        type: 'get',
    })
        .done(function (data) {
            $('.AllJsonEntry').empty();
            let totalSize = 0;
            let token = "";
            data.item.forEach(function (item) {
                if(item.tokenCheck == true){
                    token = localStorage.getItem('token');
                }
                totalSize += item.size;
                let size = ' '+ (item.size/1024).toFixed(2) + 'kB';
                handlebars('.AllJsonTemplate','.AllJsonEntry',false, {link: item.link, size: size,
                    fileName: item.fileName, token: token, tokenCheck: item.tokenCheck});
        });
            $('.AllJsonEntry').append("<p class='text'>Общий объем: "+ (totalSize/1024).toFixed(2) + "kB</p>");
    });
}

function saveJSON(){
    $('.errorMessage').empty();
    let data = $('.textarea').val();
    if(data) {
        try {
            let dataParse = JSON.parse(data);

            if ($('.deleteCheck').prop('checked')) {
                var deleteCheck = true;
            }

            if ($('.privateCheck').prop('checked')) {
                var privateCheck = true;
            }

            let dataStr = JSON.stringify(dataParse, null, 4);
            let link = linkGenerator();
            let fileName = $('.fileName__input').val();
            if (fileName == '') {
                fileName = link;
            }

            $.ajax({
                url: "/save",
                type: 'post',
                data: {
                    link: link,
                    dataJSON: dataStr,
                    deleteCheck: deleteCheck,
                    privateCheck: privateCheck,
                    fileName: fileName
                }
            })
                .done(function (data) {
                    handlebars('.linkTemplate', '.linkEntry', true, {link: link, token: data.token,
                        tokenCheck: data.tokenCheck
                    });
                    getAllJson();
                    localStorage.setItem('token', data.token);
                });
        }

        catch (err) {
            $('.errorMessage').empty().append('Это не JSON');
        }
    }
    else{
        $('.errorMessage').empty().append('Необходимо что то ввести');
    }

}

function updateJSON(link) {
    let data = $('.textarea').val();
    try {
        var dataParse = JSON.parse(data);
    }
    catch(err) {
        $('.errorMessage').empty().append('Это не JSON');
    }

    if($('.checkbox').prop('checked')){
        var deleteCheck = true;
    }
    let dataStr = JSON.stringify(dataParse, null, 4);
    let fileName = $('.fileName__input').val();
    if(fileName == ''){
        fileName = link;
    }

    $.ajax({
        url: "/update",
        type: 'post',
        data: {
            link: link,
            dataJSON: dataStr,
            deleteCheck: deleteCheck,
            fileName: fileName
        }
    })
        .done(function (data) {
            handlebars('.linkTemplate','.linkEntry',false, {link: link});
            getAllJson();
        });
}

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

function deleteJSON(link){
    $.ajax({
        url: "/delete",
        type: "delete",
        data: {
            link: link
        }
    })
        .done(function (data) {
            location.href= '/';
        });
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