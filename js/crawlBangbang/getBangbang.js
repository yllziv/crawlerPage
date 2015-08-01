
var perPageNum = 6; //ÿҳ��ʾ������
var orderType = 0;      // ����ʽ

//��ʼ��ҳ��
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_bangbang_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//��Ҫҳ������
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
}



var getInformation = function () {
    var bangbangClass = [];//��վ

    if ($("#moren").is(":checked")) {
        bangbangClass.push("0");
    }
    if ($("#yueducishu").is(":checked")) {
        bangbangClass.push("1");
    }
    if ($("#pingluncishu").is(":checked")) {
        bangbangClass.push("2");
    }

    if (bangbangClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(bangbangClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    orderType = bangbangClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#bangbangList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_bangbang_information?"+canshu, function (bangbangRawData) {//��Ҫҳ������
        $("#shclProgress").hide();

        var bangbangData = JSON.parse(bangbangRawData);
        for (var i = 1; i < bangbangData.length; i++) {
            var bangbangImage = "";

            if(bangbangData[i].bb_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang.jpg";
            }else{
                bangbangImage = bangbangData[i].bb_img_url;
            }

            var bangbangContent = bangbangData[i].bb_content;
            if(bangbangContent.length > 111){
                bangbangContent = bangbangContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].bangbang_title +"</td>" +   //���ű���
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + bangbangContent + "</td>" +   //��������
                "<td style='height: 70px'>" + "2015��"+ bangbangData[i].bb_pub_time.month+"��"+
                + bangbangData[i].bb_pub_time.day+"��"+ bangbangData[i].bb_pub_time.hours+"ʱ"+
                + bangbangData[i].bb_pub_time.minutes+"��"+ bangbangData[i].bb_pub_time.seconds+"��"+"</td>" +   //����ʱ��
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_read_times + "</td>" +   //�Ķ�����
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_response_times + "</td>" +   //���۴���
                "<td style='height: 70px'><a target='_blank' href = '" + bangbangData[i].bangbang_url + "'>����鿴����</a></td>";    //����
            $("#bangbangList").append(a);
        }
        //���������к�����Ƴ����е��¼� :gt(0)
        jQuery("#bangbangInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#bangbangInfo tr:gt(0)").bind("click",function(){
            $("#bangbangInfo tr:gt(0)").removeClass("click");
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