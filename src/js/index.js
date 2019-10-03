var $HistoryContent;

(function ($, window, document) {})(jQuery, window, document);

$(window).on("load", function () {
  $HistoryContent = $('p.content.History').get(0);
  var indexSlider = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  })


  //使用clamp.js效果
  //https://blog.csdn.net/chensonghuiyuan/article/details/49204747
  if ($(window).width() <= scrL && $(window).width() >= scrS) {
    $clamp($HistoryContent, {
      clamp: 5
    });
  } else if ($(window).width() < scrS) {
    $clamp($HistoryContent, {
      clamp: 3
    });
  }
});
$(window).on("resize", function () {

  //使用clamp.js效果
  //https://blog.csdn.net/chensonghuiyuan/article/details/49204747
  if ($(window).width() <= scrL && $(window).width() >= scrS) {
    $clamp($HistoryContent, {
      clamp: 5
    });
  } else if ($(window).width() < scrS) {
    $clamp($HistoryContent, {
      clamp: 3
    });
  }
});