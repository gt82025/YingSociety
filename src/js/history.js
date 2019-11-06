var $loadingScreen = $('.loaderContainer');
var items = [];
var $windowHeight
var $docHeight

(function ($, window, document) { })(jQuery, window, document);

$(window).on("load", function () {
    var $num = 2;

    clampSub();//截斷多餘文字

    

    
    if ($('.popupContent').length > 0 && $('a.popup').length > 0) {
        historyPopup();//大事記內容popup
    }
    

    $('.moreStory').on("click", function () {
        //讀取更多大事記-按鈕觸發
        loadMoreStory();//讀取更多大事記
    });
    $windowHeight = $(window).height();
    $docHeight = $(document).height();

    $.ajax({
        //讀取json
        url: cataurl,
        type: 'POST',
        // data: {
        //     page: $num ++,
        // },
        dataType:'json',
        success: function (json) {
            console.log(json);
            items = json;
            console.log(items);

        },
        error: function(e) {
            console.log('error');
            console.log(e);
        }
    })

});
$(window).on("resize", function () {

});
$(window).on("scroll", function () {
    if ($('.era').length > 0) {
        if ($(window).scrollTop() == $docHeight - $windowHeight) {
            //判斷畫面是否到底

            var TimeOutID = window.setTimeout(function () {
                loadMoreStory();//讀取更多大事記
                window.clearTimeout(TimeOutID);
            }, 400)
        }
    }
});

//讀取更多大事記-到底觸發
function loadMoreStory() {
    console.log('loadMoreStory!!');

    if (items.length > 0) {
        $loadingScreen.removeClass('opacity0');
        $loadingScreen.removeClass('MoveOut');
        updateList();
    } else {

    }


}

function clampSub() {
    $('p.sub').each(function (index, ele) {
        let text = $(this).get(0);
        $clamp(text, {
            clamp: 3
        });
    });
}


function historyPopup() {
    //console.log('historyPoput');
    $('a.popup').on("click", function () {
        var Style = $(this).find('.bg').attr('style');
        let regex = /\(([^)]+)\)/;
        let options = Style.match(regex)
        let imgSrc = options[0].substring(1, options[0].length - 1)
        //let dis = $(this).find('p').html();
        //console.log(imgSrc);
        //console.log(dis);
        $('.popupContent').removeClass(['op0', 'moveOut']);
        $('.popupContent img').attr('src', imgSrc)
        //$('.popupContent p').text(dis)
    })
    $('.popupContent .close').on("click", function () {
        $('.popupContent').addClass('op0');
        window.setTimeout(function () {
            $('.popupContent').addClass('moveOut');
            $('.popupContent img').attr('src', '');
            //$('.popupContent p').text('');
        }, 800)

    })


}



function updateList() {
    //更新大事記列表內容
    var $node = $('.historyContent.main');
    $('.moreStory').remove();
    if (items.length >= 5) {
        for (var i = 0; i < 5; i++) {

            var item = `
              <div class="era">
              <div class="year"> 
                  <p class="Y">${items[i].year.substr(0,4)}</p>
                  <p class="M">${items[i].year.substr(5,2)}</p>
              </div>    
              <a class="StoryContent" href="${items[i].code}">
                  <div class="littleBall"></div>
                  <div class="separateLine"></div>
                  <div class="Story">
                    <h4>${items[i].title}</h4>
                    <p class="sub">${items[i].content}</p>
                  </div>
                  <div class="Pic">
                    <div class="imgContainer" style="background-image:url(upload/time/${items[i].main_image})"></div>
                  </div>
              </a>
              </div>
              `
            var itemEl = $(item)
            $node.append(itemEl);

        }


    } else {
        for (var i = 0; i < items.length; i++) {

            var item = `
            <div class="era">
            <div class="year"> 
            <p class="Y">${items[i].year.substr(0,4)}</p>
            <p class="M">${items[i].year.substr(5,2)}</p>
            </div>    
            <a class="StoryContent" href="${items[i].code}">
                <div class="littleBall"></div>
                <div class="separateLine"></div>
                <div class="Story">
                  <h4>${items[i].title}</h4>
                  <p class="sub">${items[i].content}</p>
                </div>
                <div class="Pic">
                  <div class="imgContainer" style="background-image:url(upload/time/${items[i].main_image})"></div>
                </div>
            </a>
            </div>
            `
            var itemEl = $(item)
            $node.append(itemEl);

        }





    }

    items.splice(0, 5);
    console.log(items);
    $node.append(`
        <a class="moreStory" href="javascript:;">
          <p class="more">更多</p><img src="images/dot.png" alt=""></a>
        `)
    if (items.length == 0) {
        $('.moreStory').addClass('end');
    }


    window.setTimeout(function () {
        $loadingScreen.addClass('opacity0');
        clampSub();

    }, 800);
    window.setTimeout(function () {
        $loadingScreen.addClass('MoveOut');
        $windowHeight = $(window).height();
        $docHeight = $(document).height();
        var scrollTopBack = $(window).scrollTop() - 800;
        $(window).scrollTop(scrollTopBack);
        $('.moreStory').on("click", function () {
            loadMoreStory();
        });
    }, 1000);

}