var $loadingScreen = $('.loaderContainer');
var items = [];
var $windowHeight
var $docHeight

(function($, window, document) {})(jQuery, window, document);

$(window).on("load", function() {
    $windowHeight = $(window).height();
    $docHeight = $(document).height();
    //讀取更多大事記-按鈕觸發

    //大事記內容popup
    if ($('.popupContent').length > 0 && $('a.popup').length > 0) {
        historyPopup();
    }

});
$(window).on("resize", function() {

});


function historyPopup() {
    console.log('historyPoput');
    $('a.popup').on("click", function() {
        var Style = $(this).find('.bg').attr('style');
        let regex = /\(([^)]+)\)/;
        let options = Style.match(regex)
        let imgSrc = options[0].substring(1, options[0].length - 1)
        //let dis = $(this).find('p').html();
        console.log(imgSrc);
        //console.log(dis);
        $('.popupContent').removeClass(['op0', 'moveOut']);
        $('.popupContent img').attr('src', imgSrc)
        //$('.popupContent p').text(dis)
    })
    $('.popupContent .close').on("click", function() {
        $('.popupContent').addClass('op0');
        window.setTimeout(function() {
            $('.popupContent').addClass('moveOut');
            $('.popupContent img').attr('src', '');
            //$('.popupContent p').text('');
        }, 800)

    })


}