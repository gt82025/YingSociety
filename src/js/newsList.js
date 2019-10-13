

(function($, window, document) {})(jQuery, window, document);

$(window).on("load", function() {
    $('.newsContent').each(function(index,ele){
        let text = $(this).get(0);
            if ($(window).width() <= scrL && $(window).width() >= scrS) {
        $clamp(text, {
            clamp: 3
        });
    } else if ($(window).width() < scrS) {
        $clamp(text, {
            clamp: 2
        });
    }




    })
    



});
$(window).on("resize", function() {

    $('.newsContent').each(function(index,ele){
        let text = $(this).get(0);
            if ($(window).width() <= scrL && $(window).width() >= scrS) {
        $clamp(text, {
            clamp: 3
        });
    } else if ($(window).width() < scrS) {
        $clamp(text, {
            clamp: 2
        });
    }




    })
});