// ==UserScript==
// @name        某东,某喜-收取电力
// @namespace   Violentmonkey Scripts
// @match       https://wqs.jd.com/pingou/dream_factory/*.html
// @match       https://wqs.jd.com/pingou/dream_factory/*.html?*
// @match       https://wqs.jd.com/pingou/dream_factory/market.html
// @match       https://wqs.jd.com/pingou/dream_factory/market.html?*
// @grant        GM_getValue
// @grant        GM_setValue
// @version     1.5
// @author      zhangdaren(375890534@qq.com)
// @update      smilewind(385071602@qq.com)
// @description 2020/3/28 下午4:51:41
// ==/UserScript==
(function() {
    console.log('奥利给！！！京喜工厂自动收取电力，开干~');
    console.log('每天7～21点之间自动加电~');
    GM_setValue("add_dream","加电");
    GM_setValue("all_num",0);
    setTimeout(function(){lifecycle();},1000);
})();

function sleep(ms) {
    var start = new Date().getTime()
    while (new Date().getTime() < start + ms);
}

function log(text) {
    text='%c ' + text
    console.log(text, 'color: #43bb88;font-size: 18px;font-weight: bold;text-decoration: underline;');
}

function lifecycle() {
    let timeid = setInterval(function() {
        //自动加电力
        var add_dream = GM_getValue("add_dream");
        var myDate = new Date();
        var hours=myDate.getHours();
        var mytime=myDate.toLocaleString();
        //console.log(mytime + " add_dream:" + add_dream);
        if (hours>=7&&hours<=20&&add_dream=="加电") {
            log("工作时间，加电力。")
            document.getElementsByClassName("icon icon_add")[0].click();
            sleep(500);
            if (document.getElementsByClassName("g_error_body")[0]) {
                var reg = RegExp(/加电上限/);
                var ERR = document.getElementsByClassName("g_error_body")[0].innerText;
                if (ERR.match(reg)){
                    log("已达加电上限");
                    GM_setValue("add_dream","满电");
                }
            }
        } else if (hours<7||hours>20) {
            log("未在加电时间，恢复变量.");
            GM_setValue("add_dream","加电");
        }
        if (document.getElementsByClassName("g_error_btn")[0]) {
            document.getElementsByClassName("g_error_btn")[0].click();
        }

        //自动获取电力
        if (document.querySelector(".alternator-num-n")) {
            var num = document.querySelector(".alternator-num-n").innerText;
            //console.log("监测电力值 ->> " + num);
            num = parseFloat(num);
            if (num >= 300) {
                //log(mytime + " 电力值到" + num + "啦!!!");
                var all_num = GM_getValue("all_num");
                all_num = parseFloat(all_num) + num;
                GM_setValue("all_num",all_num);
                log(mytime + " 领取" + num + "，刷新后已累计收取电力：" + all_num);
                document.getElementById("alternator").click();
                sleep(500)
                if (document.getElementsByClassName('simple_dialog_txt_btn_txt')[0]) {
                    document.getElementsByClassName('simple_dialog_txt_btn_txt')[0].click();
                }

                if (document.getElementsByClassName("close")[0]) {
                    document.getElementsByClassName("close")[0].click();
                }
            }
        } else if (document.querySelector(".floating_title===========")) {
            var secStr = document.querySelector(".floating_title").innerText;
            console.log("监测倒计时 ->> " + secStr);
            if (secStr === "已完成") {
                console.log("完成啦")
                document.querySelector(".floating_title").click();
                clearInterval(timeid);
                setTimeout(function() {
                    lifecycle();
                }, 2000)
            } else if (secStr === "30s") {
                console.log("滑动页面")
                document.querySelector(".scroll-view").scrollTo(0, 800);
            }
        }
    }, 4000);
}