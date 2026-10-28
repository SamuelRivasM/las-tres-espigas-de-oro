(function ($) {
    "use strict";

    $("#menuSearchInput").on("input", function () {
        var term = $(this).val().toLowerCase().trim();
        var visibleCount = 0;

        $(".menu-category").each(function () {
            var $category = $(this);
            var categoryVisible = 0;

            $category.find(".menu-card").each(function () {
                var name = ($(this).data("name") || "").toString().toLowerCase();
                var match = term === "" || name.indexOf(term) !== -1;
                $(this).toggle(match);
                if (match) categoryVisible++;
            });

            $category.toggle(categoryVisible > 0);
            visibleCount += categoryVisible;
        });

        $(".menu-no-results").toggle(term !== "" && visibleCount === 0);
    });

})(jQuery);
