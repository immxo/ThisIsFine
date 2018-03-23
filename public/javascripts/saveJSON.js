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