(function ($) {
    "use strict";

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showFeedback($after, $existing, message, type) {
        var $box = $("<div>").addClass("alert alert-" + type + " mt-3 mb-0").text(message);
        if ($existing && $existing.length) {
            $existing.replaceWith($box.addClass("form-feedback"));
        } else {
            $box.addClass("form-feedback");
            $after.after($box);
        }
    }

    // Newsletter / subscribe forms (offer section and footers)
    $(".subscribe-form").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $email = $form.find('input[type="email"]');
        var email = $email.val().trim();
        var $existing = $form.siblings(".form-feedback");

        if (!emailPattern.test(email)) {
            showFeedback($form, $existing, "Por favor ingresa un correo electrónico válido.", "danger");
            return;
        }

        showFeedback($form, $existing, "¡Gracias por suscribirte! Te enviaremos nuestras novedades a " + email + ".", "success");
        $form.trigger("reset");
    });

    // Reservation / pre-order forms (home page and reservation page)
    $("#reservationForm").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this);
        var name = $form.find('input[type="text"]').first().val().trim();
        var email = $form.find('input[type="email"]').val().trim();
        var date = $form.find("#date input").val().trim();
        var time = $form.find("#time input").val().trim();
        var people = $form.find("select").val();
        var $existing = $form.find(".form-feedback");

        if (!name || !emailPattern.test(email) || !date || !time || !people) {
            showFeedback($form.find(".form-group").first(), $existing, "Por favor completa tu nombre, email, fecha, hora y número de personas para reservar.", "danger");
            return;
        }

        var parsedDate = (typeof moment !== "undefined") ? moment(date, "L", true) : null;
        if (parsedDate && !parsedDate.isValid()) {
            showFeedback($form.find(".form-group").first(), $existing, "La fecha ingresada no es válida. Usa el calendario para seleccionarla.", "danger");
            return;
        }

        if (parsedDate && parsedDate.isBefore(moment(), "day")) {
            showFeedback($form.find(".form-group").first(), $existing, "No puedes reservar en una fecha pasada. Elige una fecha a partir de hoy.", "danger");
            return;
        }

        if (parsedDate && parsedDate.isSame(moment(), "day")) {
            var parsedTime = moment(time, "LT", true);
            if (parsedTime.isValid() && parsedTime.isBefore(moment())) {
                showFeedback($form.find(".form-group").first(), $existing, "La hora elegida ya pasó. Elige una hora más adelante para hoy.", "danger");
                return;
            }
        }

        showFeedback($form.find(".form-group").first(), $existing, "¡Gracias " + name + "! Tu pedido quedó reservado para el " + date + " a las " + time + ". Te confirmaremos al correo " + email + ".", "success");
        $form.trigger("reset");
    });

})(jQuery);
