
(function ($, window, document) {



})(jQuery, window, document);
$(window).on("load", function () {
   $('p.profile').each(function(index,ele){
    let text = $(this).get(0);
    //console.log(text);
      if ($(window).width() <= scrL && $(window).width() >= scrS) {
    $clamp(text, {
      clamp: 5
    });
  } else if ($(window).width() < scrS) {
    $clamp(text, {
      clamp: 3
    });
  }
   })

 });

  //使用clamp.js效果
  //https://blog.csdn.net/chensonghuiyuan/article/details/49204747
//   if ($(window).width() <= scrL && $(window).width() >= scrS) {
//     $clamp($profileContent, {
//       clamp: 5
//     });
//   } else if ($(window).width() < scrS) {
//     $clamp($profileContent, {
//       clamp: 3
//     });
//   }

// });
$(window).on("resize", function () {

})