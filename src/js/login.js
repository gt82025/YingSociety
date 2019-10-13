var $login = $('#loginTab');
var $register = $('#registerTab');

(function ($, window, document) {




})(jQuery, window, document);

$(window).on("load", function () {
  $('.registeredBox').slideUp(0);
  switchTab();
  $('#Terms').click(function () {
    $('.popup.popupContent.terms').removeClass('moveOut');
    $('.popup.popupContent.terms').removeClass('op0');
  })
  $('.close#close').click(function () {

    $('.popup.popupContent.terms').addClass('op0');
    setTimeout(function () {
      $('.popup.popupContent.terms').addClass('moveOut');



    }, 500)
  })



});
$(window).on("resize", function () {

});


function switchTab() {
  $('#tabBox a').click(function () {
    if ($(this).index() == 0) {
      $('.registeredBox').slideUp(400);
      $('.loginBox').slideDown(400);
      $('#tabBox a').eq(0).addClass('active');
      $('#tabBox a').eq(1).removeClass('active');
    } else {
      $('.registeredBox').slideDown(400);
      $('.loginBox').slideUp(400);
      $('#tabBox a').eq(0).removeClass('active');
      $('#tabBox a').eq(1).addClass('active');
    }
  });
  $('.joinMember').click(function () {
    $('.registeredBox').slideDown(400);
    $('.loginBox').slideUp(400);
    $('#tabBox a').eq(0).removeClass('active');
    $('#tabBox a').eq(1).addClass('active');
  });
  $('.loginNow').click(function () {
    $('.registeredBox').slideUp(400);
    $('.loginBox').slideDown(400);
    $('#tabBox a').eq(0).addClass('active');
    $('#tabBox a').eq(1).removeClass('active');
  });
}