var perPageNum = 7; //ÿҳ��ʾ������
var orderType = 0;      // ����ʽ

//��ʼ��ҳ��
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//��Ҫҳ������
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTableTuniu("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
}



var orderInformation = function () {
    var tuniuClass = [];// ��վ

    if ($("#moren").is(":checked")) {
        tuniuClass.push("0");
    }
    if ($("#goumaicishu").is(":checked")) {
        tuniuClass.push("2");
    }
    if ($("#pingluncishu").is(":checked")) {
        tuniuClass.push("1");
    }
    if (tuniuClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(tuniuClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    orderType = tuniuClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTableTuniu(canshu)
}

var getSummaryTableTuniu = function (canshu) {
    $("#tuniuList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?" + canshu, function (tuniuRawData) {//��Ҫҳ������
        $("#shclProgress").hide();
        //alert("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?" + canshu);
        var tuniuData = JSON.parse(tuniuRawData);
        for (var i = 1; i < tuniuData.length; i++) {

            //;ţ����
            var tuniuTitle = tuniuData[i].tuniu_title;
            var stastTuniuTile = tuniuTitle.indexOf("<")+1;
            var endTuniuTile = tuniuTitle.indexOf(">");
            tuniuTitle = tuniuTitle.substring(stastTuniuTile,endTuniuTile);


            // ;ţͼƬ
            var tuniuImage = "";
            if(tuniuData[i].tuniu_img_url.length < 20){
                tuniuImage = "http://202.114.114.34:8878/temp_imgs/tuniu.jpg";
            }else{
                //tuniuImage = "http://202.114.114.34:8878/temp_imgs/travel/"+tuniuData[i].tuniu_id+".jpg";
                tuniuImage = tuniuData[i].tuniu_img_url;
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + tuniuTitle +"</td>" +   //��������
                "<td style='height: 70px'><img src= " + tuniuImage + " style='width: 70px;height: 50px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + tuniuData[i].tuniu_type + "</td>" +   //����
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_place + "</td>" +   //�����ַ
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_opentime + "</td>" +   //���㿪��ʱ��
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_buy_num + "</td>" +   //�������
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_comment_num + "</td>" +   //���۴���
                "<td style='height: 70px'><a target='_blank' href = '" + tuniuData[i].tuniu_url + "'>����鿴����</a></td>";    //����
            $("#tuniuList").append(a);
        }
        //���������к�����Ƴ����е��¼�
        jQuery("#tuniuInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#tuniuInfo tr:gt(0)").bind("click",function(){
            $("#tuniuInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
    });
}


function updatePage(inx){
    getSummaryTableTuniu("order_type="+orderType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());
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