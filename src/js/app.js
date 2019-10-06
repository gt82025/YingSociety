var scrXL = 1500;
var scrL = 1025;
var scrM = 780;
var scrS = 580;
var $menuMenu;
var $menuTurn;
var $touchScop;
var $BodyOutside;
var $Device
  // console.log(_uac.browser)     // returns browser name - ie. chrome, safari, ie10, edge, iemobile, etc.
  // console.log(_uac.device)     // returns device name  - ie. iphone, ipad, android, windows_phone
  // console.log(_uac.isiOS)      // returns if it's ios (boolean)
  // console.log(_uac.isAndroid)  // returns if it's ios (boolean)
  // console.log(_uac.isMobile)   // returns if it's a mobile device (boolean)
  // console.log(_uac.isTablet)   // returns if it's a tablet device (boolean)
  // console.log(_uac.isTouch)    // returns if it's a touch device (boolean)
  // console.log(_uac.isModern)   // returns if it's a modern browser (boolean)
(function ($, window, document) {




})(jQuery, window, document);

$(window).on("load", function () {
  console.log(_uac.browser);
  console.log(_uac.device);
  $Device = ['ie', 'iphone', 'ipad', 'android', 'windows_phone'];
  $menuTurn = $('.menuTurnBtn');
  $menuMenu = $('#mainmenu');
  $touchScop = $('.touchScop');
  $BodyOutside = document.getElementsByTagName("html");
  menuActive();
  //smoothScroll();
  //console.log($Device.indexOf(_uac.device));
  if($Device.indexOf(_uac.device) == -1){

    smoothScroll()

    
  }else{

  }






});
$(window).on("resize", function () {
  if ($(window).width() <= scrXL) {} else if ($(window).width() <= scrL) {} else if ($(window).width() <= scrM) {} else if ($(window).width() <= scrS) {}
});
//主選單功能
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
function smoothScroll(){
  $("html").easeScroll({
    frameRate: 40,
    animationTime: 800,
    stepSize: 120,
    pulseAlgorithm: !0,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: !0,
    arrowScroll: 50
  });
}

