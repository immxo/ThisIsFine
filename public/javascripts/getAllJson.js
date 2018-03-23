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