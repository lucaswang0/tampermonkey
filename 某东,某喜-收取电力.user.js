// ==UserScript==
// @name        京东京喜-收取电力
// @namespace   https://greasyfork.org/zh-CN/scripts/400135-%E6%9F%90%E4%B8%9C-%E6%9F%90%E5%96%9C-%E6%94%B6%E5%8F%96%E7%94%B5%E5%8A%9B
// @match       https://wqs.jd.com/pingou/dream_factory/*.html
// @match       https://wqs.jd.com/pingou/dream_factory/*.html?*
// @match       https://wqs.jd.com/pingou/dream_factory/market.html
// @match       https://wqs.jd.com/pingou/dream_factory/market.html?*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.9
// @author      lucas(xxxxx@qq.com)
// @update      lucas(xxxxx@qq.com)
// @description 京东惊喜梦工厂. F12调试模式手机模式：https://wqs.jd.com/pingou/dream_factory/index.html
// ==/UserScript==
(function() {

    setTimeout(function(){lifecycle();},4000);
})();

function sleep(ms) {
    var start = new Date().getTime()
    while (new Date().getTime() < start + ms);
}

function log(text1,text2,text3) {
    if (typeof(text2) == "undefined") {text2=""};
    if (typeof(text3) == "undefined") {text3=""};
    var text='%c ' + text1 + text2 + text3
    console.log(text, 'color: #43bb88;font-size: 14px;font-weight: bold;text-decoration: underline;');
}

function lifecycle() {
    log('奥利给！！！京喜工厂自动收取电力，开干~');
    log('每天7～21点之间自动加电~');
    log(new Date());
    //初始化加电状态
    var add_dream = GM_getValue("add_dream");
    if (typeof(add_dream)=="undefined") {
        GM_setValue("add_dream","加电");
    }

    var start_time = new Date();
    start_time=start_time.toLocaleString();
    GM_setValue("start_time",start_time);


    let timeid = setInterval(function() {

        //获取当前电量
        var start_count=GM_getValue("start_count");
        if (typeof(start_count)=="undefined"||start_count==0) {
            start_count= document.getElementsByClassName("top-l-info-n")[0].innerText;
            GM_setValue("start_count",start_count);
        }

        //自动加电力
        add_dream = GM_getValue("add_dream");
        var myDate = new Date();
        var now_time=myDate.toLocaleString();
        var hours=myDate.getHours();
        //console.log(mytime + " add_dream:" + add_dream);
        if (hours>=7&&hours<=20&&add_dream=="加电") {
            log("工作时间，加电力。")
            document.getElementsByClassName("icon icon_add")[0].click();
            if (document.getElementsByClassName("g_error_body")[0]) {
                var reg = RegExp(/加电上限/);
                var ERR = document.getElementsByClassName("g_error_body")[0].innerText;
                if (ERR.match(reg)){
                    log("已达加电上限");
                    GM_setValue("add_dream","满电");
                }
            }
        } else if (hours<7||hours>20) {
            //log("未在加电时间，恢复变量.");
            GM_setValue("add_dream","加电");
        }
        if (document.getElementsByClassName("g_error_btn")[0]) {
            document.getElementsByClassName("g_error_btn")[0].click();
        }

        //自动获取电力
        if (document.querySelector(".alternator-num-n")) {
            var num = document.querySelector(".alternator-num-n").innerText;
            num = parseFloat(num);
            //console.log("监测电力值 ->> " + num);
            if (num >= 200) {
                document.getElementById("alternator").click();
                if (document.getElementsByClassName('simple_dialog_txt_btn_txt')[0]) {
                    document.getElementsByClassName('simple_dialog_txt_btn_txt')[0].click();
                }

                if (document.getElementsByClassName("close")[0]) {
                    document.getElementsByClassName("close")[0].click();
                }

                setTimeout(function() {
                    var now_count= document.getElementsByClassName("top-l-info-n")[0].innerText;
                    log("开始时间：" + start_time + " 开始电力：" + start_count,'\n'," 当前时间: " + now_time + " 现在电力：" + now_count);},5000);
            }
        } //else if (document.querySelector(".floating_title===========")) {
        //     var secStr = document.querySelector(".floating_title").innerText;
        //     console.log("监测倒计时 ->> " + secStr);
        //     if (secStr === "已完成") {
        //         console.log("完成啦")
        //         document.querySelector(".floating_title").click();
        //         clearInterval(timeid);
        //         setTimeout(function() {
        //             lifecycle();
        //         }, 2000)
        //     } else if (secStr === "30s") {
        //         console.log("滑动页面")
        //         document.querySelector(".scroll-view").scrollTo(0, 800);
        //     }
        // }
    }, 4000);
}