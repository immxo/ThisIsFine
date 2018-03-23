function saveJSON() {
    $('.errorMessage').empty();
    validateFileName();

    if ($('.fileName__form').valid()) {
        let data = $('.textarea').val();
        if (data) {
            try {
                let dataParse = JSON.parse(data);
                var deleteCheck = 'false';
                var tokenCheck = 'false';
                if ($('.deleteCheck').prop('checked')) {
                    deleteCheck = 'true';
                }
                if ($('.privateCheck').prop('checked')) {
                    tokenCheck = 'true';
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
                        tokenCheck: tokenCheck,
                        fileName: fileName
                    }
                })
                    .done(function (data) {
                        handlebars('.linkTemplate', '.linkEntry', true, {
                            link: link, token: data.token,
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
        else {
            $('.errorMessage').empty().append('Необходимо что то ввести');
        }
    }
}