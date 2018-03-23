function updateJSON(link) {
    $('.errorMessage').empty();
    let data = $('.textarea').val();
    if(data) {
        try {
            var dataParse = JSON.parse(data);

            if ($('.deleteCheck').prop('checked')) {
                var deleteCheck = true;
            }
            let dataStr = JSON.stringify(dataParse, null, 4);
            let fileName = $('.fileName__input').val();
            if (fileName == '') {
                fileName = link;
            }
            let token = localStorage.getItem('token');

            $.ajax({
                url: "/update",
                type: 'post',
                data: {
                    link: link,
                    dataJSON: dataStr,
                    deleteCheck: deleteCheck,
                    fileName: fileName,
                    token: token
                }
            })
                .done(function (data) {
                    handlebars('.linkTemplate', '.linkEntry', false, {
                        link: link,
                        tokenCheck: data.tokenCheck,
                        token: token
                    });
                    getAllJson();
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