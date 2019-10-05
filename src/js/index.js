var $HistoryContent;
var $scroll_top;
var $Quantity;
var $ParallaxRate;
var $BGArray;


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

  bgParallax();
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

function bgParallax(){

  $Quantity = $('.bg .BG').length;
  $ParallaxRate = [];
  $BGArray = [];
  for (var i = 0; i < $Quantity; i++) {
    var Rate = (Math.random() * 2000 + 600) / $('html').height()
    $ParallaxRate.push(Rate.toFixed(2));
    $BGArray.push($('.bg .BG').eq(i));

  }
  console.log($ParallaxRate);
  $(window).scroll(function(event) {
    $scroll_top = $(window).scrollTop();
        for (var f = 0; f < $Quantity; f++) {
        var moveY = $scroll_top * $ParallaxRate[f] * -1;
        $BGArray[f].css({
            '-webkit-transform': 'translateY(' + moveY + 'px)',
            '-o-transform': 'translateY(' + moveY + 'px)',
            'transform': 'translateY(' + moveY + 'px)'
        });
    }



  })



}

