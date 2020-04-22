// ==UserScript==
// @name        ������ϲ-������
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
// @description ������ϲ�ι���. F12����ģʽ�ֻ�ģʽ��https://wqsh.jd.com/pingou/task_center/task/index.html?tasktype=3
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
    log('��������������ϲ�����У�����~');
    log(new Date());

    //��ʼ���ӵ�״̬
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


        //�ж��Ƿ�����������
        var reg = RegExp(/\wqsh.jd.com\/pingou\/taskcenter\/index.html/);
        if (url.match(reg)){
            log("������")
            //document.getElementsByClassName("title")[0] ;
            //0:0:0~0:0:0����
            if (reload=="start") {
                window.location.reload();
                GM_setValue("reload","stop");
            }
            if (reload=="stop"&&jobs=="start") {
                window.location.href='https://wqsh.jd.com/pingou/task_center/task/index.html?tasktype=3';
            }
        }

        //�ж��Ƿ���������ҳ��
        reg = RegExp(/\wqsh.jd.com\/pingou\/task_center\/task/);
        if (url.match(reg)){
            log("����ҳ��")
            if (document.getElementsByClassName("nav_item cur")[0]) {
                var i=0;
                //��ʼ�����������
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
                        log("������ȫ�����")
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

        //�ж��Ƿ����������ҳ��
        reg = RegExp(/wqitem.jd.com\/item\/view/);
        if (url.match(reg)){
            log("�����������")
            //��ʱ2�룬���ص���һҳ
            setTimeout(function() {
                log("go back")
                window.history.back();
            }, 2000)
        }

    }, 60000);
}


