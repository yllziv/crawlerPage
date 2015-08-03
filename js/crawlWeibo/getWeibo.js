var perPageNum = 7; //ÿҳ��ʾ������
var orderType = 0;      // ����ʽ

//��ʼ��ҳ��
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_weibo_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//��Ҫҳ������
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
}


var getInformation = function () {
    var weiboClass = [];//��վ

    if ($("#moren").is(":checked")) {
        weiboClass.push("0");
    }
    if ($("#pinglunrenshu").is(":checked")) {
        weiboClass.push("1");
    }
    if ($("#dianzanrenshu").is(":checked")) {
        weiboClass.push("2");
    }
    if ($("#zhuanfarenshu").is(":checked")) {
        weiboClass.push("3");
    }

    if (weiboClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(weiboClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    orderType = weiboClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#weiboList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_weibo_information?"+canshu, function (weiboRawData) {//��Ҫҳ������
        $("#shclProgress").hide();
        var weiboData = JSON.parse(weiboRawData);
        for (var i = 1; i < weiboData.length; i++) {
            var weiboImage = "";
            var weiboTitle = "";
            if(weiboData[i].image_url.length < 2){
                weiboImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                //weiboImage =  "http://202.114.114.34:8878/temp_imgs/city_news/"+weiboData[i].weibo_id+".jpg";
                weiboImage =  weiboData[i].image_url
            }
            if(weiboData[i].weibo_title.length < 2 &&weiboData[i].weibo_content.length > 21){
                weiboData[i].weibo_title = weiboData[i].weibo_content.substring(0,20)
            }
            var weiboContent = weiboData[i].weibo_content;
            if(weiboContent.length > 41){
                weiboContent = weiboContent.substr(0,40)
                weiboContent = weiboContent + "......";
            }
            var a = "";
            if(weiboData[i]) {
                a =
                    "<tr></tr><td style='height: 70px'>" + weiboData[i].weibo_title + "</td>" +   //΢������
                    "<td style='height: 70px'><img src= " + weiboImage + " style='width: 70px;height: 50px'></td>" +   //ͼƬ
                    "<td style='height: 70px'>" + weiboContent + "</td>" +   //΢������
                    "<td style='height: 70px'>" + "2015��" + weiboData[i].pub_time.month + "��" + +weiboData[i].pub_time.day + "��" + weiboData[i].pub_time.hours + "ʱ" + +weiboData[i].pub_time.minutes + "��" + weiboData[i].pub_time.seconds + "��" + "</td>" +   //����ʱ��
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].comment_number + "</td>" +   //��������
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].relay_number + "</td>" +   //ת������
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].support_number + "</td>";    //��������
            }else{
                a =
                    "<tr></tr><td style='height: 70px'></td>" +   //΢������
                    "<td style='height: 70px'></td>" +   //ͼƬ
                    "<td style='height: 70px'></td>" +   //΢������
                    "<td style='height: 70px'></td>" +   //����ʱ��
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>" +   //��������
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>" +   //ת������
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>";    //��������
            }
            $("#weiboList").append(a);
        }
        //���������к�����Ƴ����е��¼�
        jQuery("#weiboInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#weiboInfo tr:gt(0)").bind("click",function(){
            $("#weiboInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
    });
}


function updatePage(inx){
    getSummaryTable("order_type="+orderType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());
}

//container ������count ��ҳ�� pageindex ��ǰҳ��
function setPage(container, count, pageindex) {
    var container = container;
    var count = count;
    var pageindex = pageindex;
    var a = [];
    //��ҳ������10 ȫ����ʾ,����10 ��ʾǰ3 ��3 �м�3 ����....
    if (pageindex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">��һҳ</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">��һҳ</a>";
    }
    function setPageList() {
        if (pageindex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }
    //��ҳ��С��10
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    //��ҳ������10ҳ
    else {
        if (pageindex <= 4) {
            for (var i = 1; i <= 5; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        } else if (pageindex >= count - 3) {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = count - 4; i <= count; i++) {
                setPageList();
            }
        }
        else { //��ǰҳ���м䲿��
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageindex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">��һҳ</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">��һҳ</a>";
    }
    container.innerHTML = a.join("");
    //�¼����
    var pageClick = function() {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageindex; //��ʼ��ҳ��
        oAlink[0].onclick = function() { //�����һҳ
            if (inx == 1) {
                return false;
            }
            inx--;
            setPage(container, count, inx);
            updatePage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //���ҳ��
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setPage(container, count, inx);
                updatePage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //�����һҳ
            if (inx == count) {
                return false;
            }
            inx++;
            setPage(container, count, inx);
            updatePage(inx);
            return false;
        }
    } ()
}