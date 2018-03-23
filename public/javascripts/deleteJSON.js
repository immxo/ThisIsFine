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