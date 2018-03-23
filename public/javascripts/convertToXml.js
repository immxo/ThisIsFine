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