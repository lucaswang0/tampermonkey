// ==UserScript==
// @name         京东金融-大家都在玩
// @namespace   https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @updateURL   https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @downloadURL https://greasyfork.org/zh-CN/scripts/400137-%E4%BA%AC%E4%B8%9C%E5%88%B0%E5%AE%B6-%E4%BB%99%E8%B1%86%E5%BA%84%E5%9B%AD
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://prodev.m.jd.com/jdjr/active/4VE6AewA8CFAiLtykFc2wEjbWaVy/index.html?utm_source=Android*url*1586136923412&utm_medium=jrappshare&utm_term=wxfriends&from=singlemessage
// @grant        none
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
    log(new Date());

    let timeid = setInterval(function() {
        var myDate = new Date();
        var hours=myDate.getHours();
        var mins=myDate.getMinutes();
        var secs=myDate.getSeconds();




        var uua="https://uua.jr.jd.com/uc-fe-wxgrowing/moneytree/index/?Channel=jhy&utm_source=Android%2aurl%2a1586136923412&utm_medium=jrappshare&utm_term=wxfriends&from=singlemessage"
        var u="https://u.jr.jd.com/uc-fe-wxgrowing/moneytree/index/?channelLV=dao"

        //每3小时跳转到金果页面看看
        var jump=(hours%3);
        if (jump==0&&mins==0&&secs<10) {
            window.location.replace(uua);

        };





    }, 2000);
}