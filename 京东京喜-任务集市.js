// ==UserScript==
// @name        京东京喜-任务集市
// @namespace  aaaa
// @match       https://wqsh.jd.com/pingou/taskcenter/index.html*
// @match       https://wqsh.jd.com/pingou/task_center/task/index.html?tasktype=3
// @match       https://wqitem.jd.com/item/view?sku=*
// @match       https://wqsh.jd.com/pingou/taskcenter/clock/index.html
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// @author      lucas(xxxxx@qq.com)
// @update      lucas(xxxxx@qq.com)
// @description 京东惊喜梦工厂. F12调试模式手机模式：https://wqsh.jd.com/pingou/task_center/task/index.html?tasktype=3
// ==/UserScript==
(function() {
    setTimeout(function(){lifecycle();},4000);
    //setTimeout(function(){tasklist();},4000);
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
    log('奥利给！！！京喜任务集市，开干~');
    log(new Date());

    //初始化加电状态
    var reload = GM_getValue("reload");
    if (typeof(reload)=="undefined") {
        GM_setValue("reload","start");
    }
    var jobs = GM_getValue("jobs");
    if (typeof(jobs)=="undefined") {
        GM_setValue("jobs","start");
    }
    var signcard = GM_getValue("signcard");
    if (typeof(signcard)=="undefined") {
        GM_setValue("signcard","start");
    }

    var start_time = new Date();
    start_time=start_time.toLocaleString();
    GM_setValue("start_time",start_time);

    let timeid = setInterval(function() {

        var myDate = new Date();
        var hours=myDate.getHours();
        var mins=myDate.getMinutes();
        var secs=myDate.getSeconds();
        var url=window.location.href;


        reload = GM_getValue("reload");
        jobs = GM_getValue("jobs");
        signcard = GM_getValue("signcard");

        if (hours>=0&&hours<=5) {
            GM_setValue("reload","start");
            GM_setValue("jobs","start");
            GM_setValue("signcard","start");
        }

        if (hours>=6&&hours<=8&&signcard=="start") {
            log("sign");
            GM_setValue("signcard","stop");
            window.location.href='https://wqsh.jd.com/pingou/taskcenter/clock/index.html';
            setTimeout(function() {
                window.location.href='https://wqsh.jd.com/pingou/taskcenter/index.html';
            }, 2000)

        }


        //判断是否在任务中心
        var reg = RegExp(/\wqsh.jd.com\/pingou\/taskcenter\/index.html/);
        if (url.match(reg)){
            log("任务集市")
            //document.getElementsByClassName("title")[0] ;
            //0:0:0~0:0:0重置
            if (reload=="start") {
                window.location.reload();
                GM_setValue("reload","stop");
            }
            if (reload=="stop"&&jobs=="start") {
                window.location.href='https://wqsh.jd.com/pingou/task_center/task/index.html?tasktype=3';
            }
        }

        //判断是否在做任务页面
        reg = RegExp(/\wqsh.jd.com\/pingou\/task_center\/task/);
        if (url.match(reg)){
            log("任务页面")
            if (document.getElementsByClassName("nav_item cur")[0]) {
                var i=0;
                //初始化完成任务数
                var j=0;
                var tasklist=document.getElementsByClassName("sku_list")[0].children.length;
                while(i<tasklist) {
                    if(document.getElementsByClassName("sku_list")[0].children[i].children[2].className=="task_btn red") {
                        document.getElementsByClassName("sku_list")[0].children[i].children[2].click();
                    } else {
                        j++;
                    }
                    i++;
                    if (j==tasklist) {
                        log("任务已全部完成")
                        GM_setValue("jobs","stop");
                        setTimeout(function() {
                            window.location.href='https://wqsh.jd.com/pingou/taskcenter/index.html';
                        }, 2000)
                    }
                }
            }

            if (document.getElementsByClassName("modal_close")[0]) {
                log("close")
                document.getElementsByClassName("modal_close")[0].click()
            }
        }

        //判断是否在完成任务页面
        reg = RegExp(/wqitem.jd.com\/item\/view/);
        if (url.match(reg)){
            log("正在完成任务")
            //延时2秒，返回到上一页
            setTimeout(function() {
                log("go back")
                window.history.back();
            }, 2000)
        }

    }, 60000);
}


