function deleteJSON(link) {
    $.ajax({
        url: "/delete",
        type: "delete",
        data: {
            link: link
        }
    })
        .done(function () {
            location.replace('http://localhost:3000/');
        });
}