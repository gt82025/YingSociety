var limit = [];
var Text = [];
var Pox = document.getElementsById('nowTrack');
(function($, window, document) {




})(jQuery, window, document);

$(window).on("load", function() {
    $('body#Style2').addClass('news');
    for (var i = 0; i < Pox.length; i) {
        if (Pox[i].getAttribute("limit")) {
            limit[i] = Pox[i].getAttribute("limit");
            Text[i] = Pox[i].innerHTML;
            if (limit[i] < Text[i].length) {
                Pox[i].innerHTML = Text[i].substring(0, limit[i])
                "...";
            }
        }
    }




});
$(window).on("resize", function() {

});