// ==UserScript==
// @name        京东到家-仙豆庄园
// @namespace   https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @updateURL   https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @downloadURL https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @match       https://daojia.jd.com/taroh5/h5dist/*
// @grant       none
// @version     1.3
// @author      Lucas(?????????@qq.com)
// @update      Lucas(?????????@qq.com)
// @description 京东到家的仙豆庄园，每天自动收水，浇水。 F12调试模式手机模式： https://daojia.jd.com/
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
    log('奥利给！！！仙豆庄园领水滴了，开干~');
    log(new Date());
    let timeid = setInterval(function() {
        var myDate = new Date();
        var hours=myDate.getHours();
        var mins=myDate.getMinutes();
        var secs=myDate.getSeconds();

        //0:0:0~0:0:10刷新一次
        if (hours==0&&mins==0&&(secs>=0&&secs<=10)) {
            window.location.reload();
        }

        if (document.getElementsByClassName("index-module__dropNum___2l8LP")) {
            var num = document.getElementsByClassName("index-module__dropNum___2l8LP")[0].innerText;
            //log("水滴 ->> " + num);
            num = parseFloat(num);
            //log("水滴 ->> " + num);
            if (num >= 100) {
                log("水滴到100啦")
                //document.getElementById("alternator").click();
                document.getElementsByClassName("index-module__dropNum___2l8LP")[0].click();
                //document.getElementsByClassName('close')[0].click();
                //clearInterval(timeid);
                //setTimeout(function() {
                //document.querySelector(".simple_dialog_btn").click();
                //lifecycle();
                //}, 1000)
            };
            //=======================================================
            var num1 = document.getElementsByClassName("index-module__num___3PYky")[1].innerText;
            //log("总水滴 ->> " + num1);
            num1 = parseFloat(num1);
            //log("总水滴 ->> " + num1);
            if (num1 >= 100) {
                log("开始浇水啦");
                //document.getElementById("alternator").click();
                document.getElementsByClassName("taro-img index-module__bubble_new___1kUb6")[0].click()

            };

            if (document.getElementsByClassName("index-module__levelUpBtn___12Gn0")[0]) {
                log("关闭升级窗口");
                document.getElementsByClassName("index-module__levelUpBtn___12Gn0")[0].click();
            };

            if (document.getElementsByClassName("index-module__bean___NYhSu")) {
                //log("点点树偶尔获取水滴");
                //document.getElementsByClassName("index-module__bean___NYhSu")[0].click();

            };

            //             if (document.getElementsByClassName("index-module__closeBtn___PN4wM")) {
            //                log("点点树关闭");
            //                document.getElementsByClassName("index-module__closeBtn___PN4wM")[0].click()
            //             };
        };
    },4000);
}