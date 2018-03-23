$(document).ready(function () {
    getAllJson();

    $(".inputFile").change(function () {
        let file = $(".inputFile").prop('files')[0];
        $('.fileName__label').empty().append(file.name);
    });
});

function editJSON() {
    $('.textarea').removeAttr('readonly');
}

function linkGenerator() {
    let link = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 8; i++)
        link += possible.charAt(Math.floor(Math.random() * possible.length));

    return link;
}

function handlebars(template, entry, empty, data) {
    var templateScript = $(template).html();
    var template = Handlebars.compile(templateScript);
    if (empty) {
        $(entry).empty().append(template(data));
    }
    else {
        $(entry).append(template(data));
    }
}

Handlebars.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});