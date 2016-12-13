/**
 * Created by jenbo on 16/11/29.
 */
$(document).ready(function(){
    $(".close_btn a").click(function(){
        $(".content_box").hide();
        $(".show_btn").show();
    });
    $(".show_btn").click(function(){
        $(".show_btn").hide();
        $(".content_box").show();
    });
});

/****************************************js无缝滚动代码***************************************/
function marquee(i, direction){
    var obj = document.getElementById("marquee" + i);
    var obj1 = document.getElementById("marquee" + i + "_1");
    var obj2 = document.getElementById("marquee" + i + "_2");
    if (direction == "up"){
        if (obj2.offsetTop - obj.scrollTop <= 0){
            obj.scrollTop -= (obj1.offsetHeight + 20);
        }else{
            var tmp = obj.scrollTop;
            obj.scrollTop++;
            if (obj.scrollTop == tmp){
                obj.scrollTop = 1;
            }
        }
    }else{
        if (obj2.offsetWidth - obj.scrollLeft <= 0){
            obj.scrollLeft -= obj1.offsetWidth;
        }else{
            obj.scrollLeft++;
        }
    }
}

function marqueeStart(i, direction){
    var obj = document.getElementById("marquee" + i);
    var obj1 = document.getElementById("marquee" + i + "_1");
    var obj2 = document.getElementById("marquee" + i + "_2");

    obj2.innerHTML = obj1.innerHTML;
    var marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);
    obj.onmouseover = function(){
        window.clearInterval(marqueeVar);
    }
    obj.onmouseout = function(){
        marqueeVar = window.setInterval("marquee("+ i +", '"+ direction +"')", 20);
    }
}

/**************************************jq轮播图********************************************/

var len = $(".num > li").length;
var index = 0;  //图片序号
var adTimer;
$(".num li").mouseover(function() {
    index = $(".num li").index(this);  //获取鼠标悬浮 li 的index
    showImg(index);
}).eq(0).mouseover();
//滑入停止动画，滑出开始动画.
$('#demo01').hover(function() {
    clearInterval(adTimer);
}, function() {
    adTimer = setInterval(function() {
        showImg(index);
        index++;
        if (index == len) {       //最后一张图片之后，转到第一张
            index = 0;
        }
    }, 3000);
}).trigger("mouseleave");

function showImg(index) {
    var adHeight = $("#demo01>ul>li:first").height();
    $(".slides").stop(true, false).animate({
        "marginTop": -adHeight * index + "px"    //改变 marginTop 属性的值达到轮播的效果
    }, 1000);
    $(".num li").removeClass("on")
        .eq(index).addClass("on");
}