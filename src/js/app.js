var scrXL = 1500;
var scrL = 1025;
var scrM = 780;
var scrS = 580;
var $menuMenu;
var $menuTurn;
var $touchScop;

(function ($, window, document) {})(jQuery, window, document);

$(window).on("load", function () {
  console.log(_uac.browser);
  console.log(_uac.device);
  $menuTurn = $('.menuTurnBtn');
  $menuMenu = $('#mainmenu');
  $touchScop = $('.touchScop');
  menuActive();
});
$(window).on("resize", function () {
  if ($(window).width() <= scrXL) {} else if ($(window).width() <= scrL) {} else if ($(window).width() <= scrM) {} else if ($(window).width() <= scrS) {}
});

function menuActive() {
  $menuTurn.click(function () {
    $menuMenu.toggleClass('close');
    $touchScop.toggleClass('close');
  });
  $touchScop.click(function () {
    $menuMenu.addClass('close');
    $touchScop.addClass('close');
  });
}