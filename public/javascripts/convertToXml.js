function convertToXml() {
    let data = $('.textarea').val();
    if (data) {
        try {
            let dataParse = JSON.parse(data);
            let dataStr = JSON.stringify(dataParse, null, 4);

            $.ajax({
                url: "/convertToXml",
                type: 'post',
                data: {
                    dataJSON: dataStr
                }
            })
                .done(function (data) {
                    handlebars('.textareaTemplate', '.textareaEntry', true, {data: data.dataXml});
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