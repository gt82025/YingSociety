
(function ($, window, document) {



})(jQuery, window, document);
$(window).on("load", function () {
   $('p.profile').each(function(index,ele){
    let text = $(this).get(0);
    //console.log(text);
      if ($(window).width() <= scrL && $(window).width() >= scrS) {
    $clamp(text, {
      clamp: 1
    });
  } else if ($(window).width() < scrS) {
    $clamp(text, {
      clamp: 1
    });
  }
   })

 });


$(window).on("resize", function () {
    $('p.profile').each(function(index,ele){
        let text = $(this).get(0);
        //console.log(text);
          if ($(window).width() <= scrL && $(window).width() >= scrS) {
        $clamp(text, {
          clamp: 1
        });
      } else if ($(window).width() < scrS) {
        $clamp(text, {
          clamp: 1
        });
      }
       })

})