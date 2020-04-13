// ==UserScript==
// @name        京东金融-小游戏
// @namespace   Violentmonkey Scripts
// @match       https://*.jr.jd.com/uc-fe-wxgrowing/cloudpig/index/*
// @match       https://*.jr.jd.com/uc-fe-wxgrowing/moneytree/index/*
// @match       https://active.jd.com/forever/btgoose/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.3
// @author      Lucas(?????????@qq.com)
// @update      Lucas(?????????@qq.com)
// @description 2020/4/12 下午4:51:41
// ==/UserScript==

(function() {
    setTimeout(function(){
        lifecycle();
    }, 4000);
})();

function log(text1,text2,text3) {
    if (typeof(text2) == "undefined") {text2=""};
    if (typeof(text3) == "undefined") {text3=""};
    var text='%c ' + text1 + text2 + text3
    console.log(text, 'color: #43bb88;font-size: 14px;font-weight: bold;text-decoration: underline;');
}

function lifecycle() {

    log('奥利给！！！小游戏聚合，开干~');
    GM_setValue("sign","签到")

    let timeid = setInterval(function() {
        var myDate = new Date();
        var hours=myDate.getHours();
        var mins=myDate.getMinutes();
        var secs=myDate.getSeconds();

        //0:0:0~0:0:10刷新一次
        if (hours==0&&mins==0&&(secs>=0&&secs<=10)) {
            window.location.reload();
        }

        //金果==========================================
        if (document.getElementsByClassName("modal-btn")[0]) {
            log("需要APP,退出");
            setTimeout(function() {
                document.getElementsByClassName("modal-close")[0].click();
            },4000);
        }
        else {
            if (document.getElementsByClassName("tree-volume")[0]) {
                var s = document.getElementsByClassName("tree-volume")[0].innerText;
                var num = document.getElementsByClassName("tree-curnum")[0].innerText;
                var numup= s.replace(/[^0-9]/ig,"");
                numup = parseFloat(numup);
                num = parseFloat(num);
                log("金果 ->> " + num + "/" + numup );
                if (num >= 2000) {
                    log("金果到" + num);
                    //document.getElementById("alternator").click();
                    document.getElementsByClassName("tree-btn")[0].children[0].click()
                    //document.getElementsByClassName('close')[0].click();
                    //clearInterval(timeid);
                    //setTimeout(function() {
                    //document.querySelector(".simple_dialog_btn").click();
                    //lifecycle();
                    //}, 1000)
                };
            };
        }
        //小猪======================================
        if (document.getElementsByClassName("precious precious-one precious-pos-1 springback")[0]) {
            log("小猪礼盒1");
            document.getElementsByClassName("precious precious-one precious-pos-1 springback")[0].click();
        };
        if (document.getElementsByClassName("precious precious-one precious-pos-2 springback")[0]) {
            log("小猪礼盒2");
            document.getElementsByClassName("precious precious-one precious-pos-2 springback")[0].click();
        };
        //签到

        var sign=GM_getValue("sign");
        if (hours==7&&sign=="签到") {

            if ( document.getElementsByClassName("main-icon main-icon-sign")[0]) {
                document.getElementsByClassName("main-icon main-icon-sign")[0].click();
            };
            if (document.getElementsByClassName("sign-btn-disable")[0]) {
                GM_setValue("sign","已签");
            }

            if (document.getElementsByClassName("sign-btn")[0]) {
                document.getElementsByClassName("sign-btn")[0].click();
                GM_setValue("sign","已签");
            };
            if ( document.getElementsByClassName("sign-close")[0]) {
                document.getElementsByClassName("sign-close")[0].click();
            };

        } else if(hours!=7) {
            GM_setValue("sign","签到")
        }
        //定时抽奖
        var Min=parseInt(myDate.getMinutes());
        if ( Min%30 === 0&&document.getElementsByClassName("cloud-foot")[0] ) {
            document.getElementsByClassName("cloud-foot")[0].children[0].click();


            var str = document.getElementsByClassName("luck-btngroup")[0].children[0].innerText;
            var reg = RegExp(/免费/);
            var reg1 = RegExp(/金币/);
            if(str.match(reg)){
                log("免费抽");
                document.getElementsByClassName("luck-btngroup")[0].children[0].click();
            }
            else if (str.match(reg1)){
                log("要金币，退出");
                document.getElementsByClassName("luck-close")[0].click();
            }

        }
        if (document.getElementsByClassName("precious-btn")[0]) {
            document.getElementsByClassName("precious-btn")[0].click();
        };


        //小猪吃完了么,看看能否喂食了
        if (document.getElementsByClassName("draw-feed-btn")[0]) {
            log("猪喂食啦！");
            document.getElementsByClassName("draw-trough-img")[0].click();
            //document.getElementsByClassName("feed-list")[0].children[0].click();
            document.getElementsByClassName("feed-item-btn")[0].click();
            document.getElementsByClassName("feed-close")[0].click();
        };


        //鹅=========================================
        if (document.getElementsByClassName("stage-num udc-bold")[0]) {
            var egg=document.getElementsByClassName("stage-num udc-bold")[0].innerText
            egg=parseFloat(egg);
            log("鹅蛋->>" + egg );
            if (egg>=30) {
                log("收鹅蛋了");

                if (document.getElementsByClassName("main-stage")[0].children[0]) {
                    document.getElementsByClassName("main-stage")[0].children[0].click();
                };

            };
        };



    }, 2000);
}