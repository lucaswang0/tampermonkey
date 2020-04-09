// ==UserScript==
// @name        京东到家-仙豆庄园
// @namespace   Violentmonkey Scripts
// @match       https://daojia.jd.com/taroh5/h5dist/*
// @grant       none
// @version     1.0
// @author      Lucas(?????????@qq.com)
// @update      Lucas(?????????@qq.com)
// @description 2020/3/28 下午4:51:41
// ==/UserScript==

(function() {
    console.log('奥利给！！！仙豆庄园领水滴了，开干~');
    setTimeout(function(){
        lifecycle();
    }, 4000);
})();

function lifecycle() {
    let timeid = setInterval(function() {
        var now = new Date();
     
        if (document.getElementsByClassName("index-module__dropNum___2l8LP")) {
            var num = document.getElementsByClassName("index-module__dropNum___2l8LP")[0].innerText;
            //console.log("水滴 ->> " + num);
            num = parseFloat(num);
            console.log("水滴 ->> " + num);
            if (num >= 100) {
                console.log("水滴到100啦")
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
            //console.log("总水滴 ->> " + num1);
            num1 = parseFloat(num1);
            console.log("总水滴 ->> " + num1);
            if (num1 >= 100) {
                console.log("开始浇水啦");
                //document.getElementById("alternator").click();
                setTimeout(function() {
                    document.getElementsByClassName("index-module__num___3PYky")[1].click();
                           },3000);
            };

            if (document.getElementsByClassName("index-module__levelUpBtn___12Gn0")[0]) {
                console.log("关闭升级窗口");
                document.getElementsByClassName("index-module__levelUpBtn___12Gn0")[0].click();
            };

            if (document.getElementsByClassName("index-module__bean___NYhSu")) {
               console.log("点点树偶尔获取水滴");
               setTimeout(function() {
                   document.getElementsByClassName("index-module__bean___NYhSu")[0].click();
                  },4000);
            };

//             if (document.getElementsByClassName("index-module__closeBtn___PN4wM")) {
//                console.log("点点树关闭");
//                document.getElementsByClassName("index-module__closeBtn___PN4wM")[0].click()
//             };
};
	},2000);
}