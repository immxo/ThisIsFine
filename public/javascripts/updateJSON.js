function updateJSON(link) {
    $('.errorMessage').empty();
    validateFileName();
    if ($('.fileName__form').valid()) {
        let data = $('.textarea').val();
        if (data) {
            try {
                let dataParse = JSON.parse(data);

                if ($('.deleteCheck').prop('checked')) {
                    var deleteCheck = true;
                }
                if ($('.privateCheck').prop('checked')) {
                    var tokenCheck = true;
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
                        tokenCheck: tokenCheck,
                        fileName: fileName,
                        token: token
                    }
                })
                    .done(function (data) {
                        handlebars('.linkTemplate', '.linkEntry', true, {
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
        else {
            $('.errorMessage').empty().append('Необходимо что то ввести');
        }
    }
}