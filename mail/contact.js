$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-success')
                    .append($("<strong>").text("¡Gracias " + name + "! Tu mensaje ha sido enviado, te responderemos a la brevedad."));
            $('#success > .alert-success')
                    .append('</div>');
            $('#contactForm').trigger("reset");

            setTimeout(function () {
                $this.prop("disabled", false);
            }, 1000);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
