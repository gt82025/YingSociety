(function($, window, document) {




})(jQuery, window, document);

$(window).on("load", function() {

    $('#nowTrack').each(function(index, ele) {
        let text = $(this).get(0);
        $clamp(text, {
            clamp: 1
        });
    });

});
$(window).on("resize", function() {

});