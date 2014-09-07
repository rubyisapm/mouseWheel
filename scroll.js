/**
 * Created by ruby on 2014/9/6.
 */



window.onload = function () {
    var stopEvent = function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }

        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    };
    var pageUp = function () {
        var top = $(window).scrollTop();
        /*find the next ppt and position to it.*/
        for(var i=6;i>=1;i--){
            if(top-$("#ppt"+i).offsetTop()>0){
                $(window).animate({style:"scrollTop",arm:$("#ppt"+i).offsetTop()},true,300);
                break;
            }
        }
    };
    var pageDown = function () {
        var top = $(window).scrollTop();
        /*find the next ppt and position to it.*/
        for(var i=1;i<=6;i++){
            if($("#ppt"+i).offsetTop()-top>0){
                $(window).animate({style:"scrollTop",arm:$("#ppt"+i).offsetTop()},true,300);
                break;
            }
        }
    };
    var mousewheel = $.browser().indexOf("firefox")>-1 ? "DOMMouseScroll" : "mousewheel";
    $(document).bind(mousewheel,function (event) {
        /*经测试，如果将事件绑定在window上，IE7&8均无效果*/
        var delta = 0;
        event = window.event || event;
        stopEvent(event);
        delta = event.wheelDelta ? (event.wheelDelta) : (-event.detail);
        delta > 0 ? pageUp() : pageDown();
    }, false);


}


