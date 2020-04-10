// ==UserScript==
// @name        京东金融--小游戏
// @namespace   Violentmonkey Scripts
// @match       https://*.jr.jd.com/uc-fe-wxgrowing/cloudpig/index/*
// @match       https://*.jr.jd.com/uc-fe-wxgrowing/moneytree/index/*
// @match       https://active.jd.com/forever/btgoose/*
// @grant        GM_getValue
// @grant        GM_setValue
// @version     1.2
// @author      Lucas(?????????@qq.com)
// @update      Lucas(?????????@qq.com)
// @description 2020/3/28 下午4:51:41
// ==/UserScript==

(function() {
    console.log('奥利给！！！仙豆庄园领水滴了，开干~');
    GM_setValue("sign","签到")
    setTimeout(function(){
        lifecycle();
    }, 4000);
})();

function lifecycle() {
    let timeid = setInterval(function() {
        var myDate = new Date();

        //金果==========================================
        if (document.getElementsByClassName("modal-btn")[0]) {
            console.log("需要APP,退出");
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
                console.log("金果 ->> " + num + "/" + numup );
                if (num >= 100) {
                    console.log("金果到400啦")
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
            console.log("小猪礼盒1");
            document.getElementsByClassName("precious precious-one precious-pos-1 springback")[0].click();
        };
        if (document.getElementsByClassName("precious precious-one precious-pos-2 springback")[0]) {
            console.log("小猪礼盒2");
            document.getElementsByClassName("precious precious-one precious-pos-2 springback")[0].click();
        };
        //签到

        var sign=GM_getValue("sign");
        var hours=myDate.getHours();
        if (hours>=7&&hours<=8&&sign=="签到") {
            document.getElementsByClassName("main-icon main-icon-sign")[0].click();
            if (document.getElementsByClassName("sign-btn")[0]) {
                document.getElementsByClassName("sign-btn")[0].click();
                GM_setValue("sign","已签");
            }
        } else if(hours<7||hours>8) {
            GM_setValue("sign","签到")
        }
        //定时抽奖
        var Min=parseInt(myDate.getMinutes());
        if ( Min%30 === 0&&document.getElementsByClassName("cloud-foot")[0] ) {
            document.getElementsByClassName("cloud-foot")[0].children[0].click();

            setTimeout(function() {
                var str = document.getElementsByClassName("luck-btngroup")[0].children[0].innerText;
                var reg = RegExp(/免费/);
                var reg1 = RegExp(/金币/);
                if(str.match(reg)){
                    console.log("免费抽");
                    document.getElementsByClassName("luck-btngroup")[0].children[0].click();
                }
                else if (str.match(reg1)){
                    console.log("要金币，退出");
                    document.getElementsByClassName("luck-close")[0].click();
                }

            },2000);
        }
        if (document.getElementsByClassName("precious-btn")[0]) {
            document.getElementsByClassName("precious-btn")[0].click();
        };


        //小猪吃完了么,看看能否喂食了
        if (document.getElementsByClassName("draw-feed-btn")[0]) {
            console.log("猪喂食啦！");
            setTimeout(function() {
                document.getElementsByClassName("draw-feed-btn")[0].children[0].click();
                document.getElementsByClassName("feed-item-btn")[0].click();
                document.getElementsByClassName("feed-close")[0].click();
            },2000);
        };


        //鹅=========================================
        if (document.getElementsByClassName("stage-num udc-bold")[0]) {
            var egg=document.getElementsByClassName("stage-num udc-bold")[0].innerText
            egg=parseFloat(egg);
            console.log("鹅蛋->>" + egg );
            if (egg>=30) {
                console.log("收鹅蛋了");
                setTimeout(function() {
                    if (document.getElementsByClassName("main-stage")[0].children[0]) {
                        document.getElementsByClassName("main-stage")[0].children[0].click();
                    };
                },2000);
            };
        };



    }, 2000);
}