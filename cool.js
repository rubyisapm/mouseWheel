/**
 * Created by ruby on 2014/9/6.
 */
(function (window) {
    var $ = function (selector) {
        return new $.prototype.init(selector);
    };
    $.browser = function () {
        var userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("msie 6.0") > -1) {
            return "ie6";
        }
        if (userAgent.indexOf("msie 7.0") > -1) {
            return "ie7";
        }
        if (userAgent.indexOf("msie 8.0") > -1) {
            return "ie8";
        }
        if (userAgent.indexOf("msie 9.0") > -1) {
            return "ie9";
        }
        if (userAgent.indexOf("msie 10.0") > -1) {
            return "ie10";
        }
        if (userAgent.indexOf("firefox") > -1) {
            return "firefox";
        }
        if (userAgent.indexOf("chrome") > -1) {
            return "chrome";
        }
    };
    $.stopEvent = function (event) {
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
    $.prototype = {
        constructor: $,
        init: function (selector) {
            if (typeof selector === "string") {
                if (selector.indexOf("#") == 0) {
                    this.dom = document.getElementById(selector.substring(1));
                } else if (selector.indexOf("." == 0)) {
                    var nodeList = [];
                    var className = selector.substring(1);
                    var nodes = document.body.getElementsByTagName("*");
                    for (var i in nodes) {
                        if(nodes[i].nodeType){
                            if ($(nodes[i]).hasClass(className)) {
                                nodeList.push($(nodes[i]))
                            }
                        }
                    }
                    this.nodeList = nodeList;
                }


            } else if (selector.nodeType) {
                this.dom = selector;
            }else if (selector == window) {
                this.dom = window;
            } else if (selector == document) {
                this.dom = document.documentElement;
            }
            return this;
        },
        hasClass: function (className) {
            var classes=this.dom.getAttribute("class") ? this.dom.getAttribute("class") : this.dom.className;
            if (classes.length > 0) {
                var classesToArray = classes.split(" ");
                for (var i in classesToArray) {
                    if (classesToArray[i] == className) {
                        return true;
                    }
                }
            }
            return false;
        },
        scrollTop: function () {
            if (!arguments.length) {
                if (this.dom == window) {
                    if ($.browser().indexOf("ie") > -1) {
                        return document.documentElement.scrollTop;
                    } else {
                        return window.pageYOffset;
                    }
                }
            } else {

                this.dom.scrollTo(0, arguments[0])
            }
        },
        offsetTop: function () {
            /*doesn't include border*/
            return this.dom.offsetTop;
        },
        bind: function (event, callback, capture) {
            if (window.addEventListener) {
                this.dom.addEventListener(event, callback, capture);
            } else if (window.attachEvent) {
                this.dom.attachEvent("on" + event, callback);
            }
        },
        animate: function (trend, slowFastSlow, time) {
            if (slowFastSlow) {
                var ele = this;
                var style = trend.style;
                var before = ele[style].call(this);
                var timeSlice=time/10;
                if (typeof ele[style] == "function") {
                    var total = parseFloat(trend.arm - before),
                        A = 4 * total / Math.pow(time / 1000, 2),
                        begin = 0,
                        go = 0;
                    clearInterval(window.i);
                    window.i = setInterval(function () {
                        begin += timeSlice;
                        if (begin <= (time / 2)) {
                            go = (1 / 2) * A * Math.pow((begin / 1000), 2) + before;
                        } else {
                            if (begin > (time / 2) && begin < time) {
                                go = (1 / 2) * A * Math.pow((time / 1000) / 2, 2) + A * ((time / 1000) / 2) * ((begin / 1000) - (time / 1000) / 2) - (1 / 2) * A * Math.pow((begin / 1000) - (time / 1000) / 2, 2) + before;
                            } else {
                                if (begin >= time) {
                                    go = total + before;
                                    clearInterval(window.i);
                                }
                            }
                        }
                        ele[style].call(ele, go);
                    }, timeSlice);

                }

            }
        },
        css:function(stylename,property){
            var ele=this.dom;
            if(arguments.length==1){
                if(window.getComputedStyle){
                    return ele.ownerDocument.defaultView.getComputedStyle(ele,null)[stylename];
                }else{
                    return ele.currentStyle["position"];
                }
            }
            if(property){
                ele.style[stylename]=property;
            }

        },
        html:function(str){
            if(str){
                this.dom.innerHTML=str;
            }else{
                return this.dom.innerHTML;
            }
        },
        show:function(){
            this.css("display","block");
        },
        hide:function(){
            this.css("display","none");
        }




    };
    $.prototype.init.prototype = $.prototype;
    window.$ = $;
})(window);
