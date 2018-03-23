function validateFileName() {
    jQuery.validator.addMethod("accept", function (value, element, param) {
        return value.match(new RegExp("." + param + "$"));
    });

    $(".fileName__form").validate({
        rules: {
            fileName__input: {
                accept: "[а-яА-ЯёЁ+\\w+.+\\s]"
            }
        },

        messages: {
            fileName__input: {
                accept: "Только буквы,цифры, '.' , '_'"
            }
        }
    });
}