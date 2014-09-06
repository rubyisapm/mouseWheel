/**
 * Created by ruby on 2014/9/6.
 */
(function(window){
    var $=function(selector){
        return new $.prototype.init(selector);
    };
    $.browser=function(){
        var userAgent=window.navigator.userAgent.toLowerCase();
        if(userAgent.indexOf("msie 6.0")>-1){
            return "ie6";
        }
        if(userAgent.indexOf("msie 7.0")>-1){
            return "ie7";
        }
        if(userAgent.indexOf("msie 8.0")>-1){
            return "ie8";
        }
        if(userAgent.indexOf("msie 9.0")>-1){
            return "ie9";
        }
        if(userAgent.indexOf("msie 10.0")>-1){
            return "ie10";
        }
        if(userAgent.indexOf("firefox")>-1){
            return "firefox";
        }
        if(userAgent.indexOf("chrome")>-1){
            return "chrome";
        }
    }
    $.prototype={
        constructor:$,
        init:function(selector){
            if(typeof selector!="undefined"){
                if(selector==window){
                    this.dom=window;
                }else if(selector==document){
                    this.dom=document.documentElement;
                }else if(selector.indexOf("#")==0){
                    this.dom=document.getElementById(selector.substring(1));
                }
                return this;
            }
        },
        scrollTop:function(){
            if(!arguments.length){
                if(this.dom==window){
                    if($.browser().indexOf("ie")>-1){
                        return document.documentElement.scrollTop;
                    }else{
                        return window.pageYOffset;
                    }
                }
            }else{

                this.dom.scrollTo(0,arguments[0])
            }
        },
        offsetTop:function(){
            /*doesn't include border*/
            return this.dom.offsetTop;
        },
        bind:function (event,callback,capture) {
            if (window.addEventListener) {
                this.dom.addEventListener(event, callback,capture);
            } else if (window.attachEvent) {
                this.dom.attachEvent("on" + event, callback);
            }
        },
        animate:function(trend,slowFastSlow,time){
            /*trend:{
                style:
                arm:
            }*/
            var i;
            if(slowFastSlow){
                var ele=this;
                var style=trend.style;
                var before=ele[style].call(this);
                if( typeof ele[style]=="function"){
                        var total=parseFloat(trend.arm-before),
                            A=4*total/Math.pow(time*1/1000,2),
                            begin= 0,
                            go=0;
                    clearInterval(i);
                    i = setInterval(function(){
                        begin+=time/100;

                        if(begin<=(time/2)){
                            go=(1/2)*A*Math.pow((begin/1000),2)+before;
                        }else{
                            if(begin>(time/2) && begin<time){
                                go=(1/2)*A*Math.pow((time/1000)/2,2)+A*((time/1000)/2)*((begin/1000)-(time/1000)/2)-(1/2)*A*Math.pow((begin/1000)-(time/1000)/2,2)+before;
                            }else{
                                if(begin>=time){
                                    go=total+before;
                                    clearInterval(i);
                                }
                            }
                        }
                        ele[style].call(ele,go);
                    },time/100);
                }

            }



        }



    };
    $.prototype.init.prototype= $.prototype;
    window.$=$;
})(window);
