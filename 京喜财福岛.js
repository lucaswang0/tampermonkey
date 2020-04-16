// ==UserScript==
// @name        京喜财福岛
// @namespace   https://greasyfork.org/zh-CN/scripts/400135-%E6%9F%90%E4%B8%9C-%E6%9F%90%E5%96%9C-%E6%94%B6%E5%8F%96%E7%94%B5%E5%8A%9B
// @match       https://wqs.jd.com/fortune_island/index.html*
// @match       https://wq.jd.com/webportal/event/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      lucas(xxxxx@qq.com)
// @update      lucas(xxxxx@qq.com)
// @description 京东财福岛.自动完成任务/自动偷钱币/自动收取打工仔的钱币 F12调试模式手机模式：https://wqs.jd.com/fortune_island/index.html#
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
    log('奥利给！！！京喜财富岛，开干~');
    log(new Date());

    var start_time = new Date();
    start_time=start_time.toLocaleString();
    GM_setValue("start_time",start_time);
    var i=0;

    let timeid = setInterval(function() {
        //岛主
        if (document.getElementsByClassName("is-has-money")[0]) {
            if (document.getElementsByClassName("is-has-money")[0].className=="is-has-money") {
                log("岛主收钱")
                document.getElementsByClassName("is-has-money")[0].click();
            }
        }

        //打工
        if (document.getElementsByClassName("head-icon has-money")[0]) {
            var worker=document.getElementsByClassName("head-icon has-money").length
            i=0
            log("共有打工仔：",worker)
            if(worker>0) {
                while (i<worker) {
                    //log(i);
                    if (document.getElementsByClassName("head-icon has-money")[i].className=="head-icon has-money") {
                        log("收打工仔:",i)
                        document.getElementsByClassName("head-icon has-money")[i].click();
                    }
                    i++
                }
            }
        }

        //好友圈
        if (document.getElementsByClassName("friend-circle")[0]) {
            document.getElementsByClassName("friend-circle")[0].click()
            setTimeout(function(){
                if (document.getElementsByClassName("pop-window")) {
                    var friends=document.getElementsByClassName("friends-content-detail").length;
                    i=0
                    log("共有好友:",friends)
                    if(friends>0) {
                        while (i<friends) {
                            //log(i);
                            var text=document.getElementsByClassName("friends-content-detail")[i].children[3].innerText
                            //log("好友",i,text)
                            if (text=="偷财富") {
                                log("好友",i,"可偷")
                                document.getElementsByClassName("friends-content-detail")[i].lastChild.click();
                            }
                            i++
                        };
                    };
                    document.getElementsByClassName("friends-layer-close")[0].click()
                };
            },1000);
        }

        //任务
        if (document.getElementsByClassName("main-btn")[0]) {
            document.getElementsByClassName("main-btn")[0].click();
            setTimeout(function(){
                var task=document.getElementsByClassName("target-list")[0].children.length;
                log("任务总数:",task);
                i=0;
                while(i<task) {
                    if (document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-award-btn")[0]) {
                        var text=document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-award-btn")[0].innerText
                        log("任务",i,text);
                        if (text=="去逛逛") {
                            document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-award-btn")[0].click();
                        }
                        if (text=="加购") {
                            document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-award-btn")[0].click();
                        }
                    }

                    if (document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-process-btn")[0]) {
                        var text1=document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-process-btn")[0].innerText
                        log("任务",i,text);
                        if (text1=="领奖励") {
                            document.getElementsByClassName("target-list")[0].children[i].children[0].getElementsByClassName("target-list-deatil-process-btn")[0].click();
                        }
                    }
                    i++
                };
                document.getElementsByClassName("target-close")[0].click();

            },1000);
            //完成加购任务
            if (document.getElementsByClassName("sku-list")[0]) {
                var mall=document.getElementsByClassName("sku-list")[0].children.length
                i=0;
                while (i<mall) {
                    var text2=document.getElementsByClassName("sku-list")[0].children[i].children[2].innerText;
                    if(text2=="加购"){
                        document.getElementsByClassName("sku-list")[0].children[i].children[2].click();
                    }
                    i++
                }
                document.getElementsByClassName("close")[0].click();
            }

        } else {
            //如果在其他岛主那里，那么是没有任务列表的，返回自家岛。
            setTimeout(function(){
                //document.getElementsByClassName("page-back-home-img")[0].click();
                window.location.replace("https://wqs.jd.com/fortune_island/index.html#");
            },6000);
        }


    }, 60000);
}