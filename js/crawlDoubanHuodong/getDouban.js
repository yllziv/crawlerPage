var perPageNum = 7;     //ÿҳ��ʾ������
var orderType = -1;      // ����ʽ
var activeType =0;      // �����

//��ʼ��ҳ��
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_douban_information?"+"douban_type=-1&order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//��Ҫҳ������
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("douban_type=-1&order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
}
//���ĳһ��Χ�����
function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}


var getInformation = function () {
    var activeClass = [];//��վ

    if ($("#all").is(":checked")) {
        activeClass.push("-1");
    }
    if ($("#yinyue").is(":checked")) {
        activeClass.push("0");
    }
    if ($("#xiju").is(":checked")) {
        activeClass.push("1");
    }
    if ($("#jiangzuo").is(":checked")) {
        activeClass.push("2");
    }
    if ($("#juhui").is(":checked")) {
        activeClass.push("3");
    }
    if ($("#dianying").is(":checked")) {
        activeClass.push("4");
    }
    if ($("#zhanlan").is(":checked")) {
        activeClass.push("5");
    }
    if ($("#yundong").is(":checked")) {
        activeClass.push("6");
    }
    if ($("#gongyi").is(":checked")) {
        activeClass.push("7");
    }
    if ($("#lvyou").is(":checked")) {
        activeClass.push("8");
    }
    if ($("#qita").is(":checked")) {
        activeClass.push("9");
    }

    if (activeClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(activeClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var oderType = [];//����ʽ
    if ($("#moren").is(":checked")) {
        oderType.push("0");
    }
    if ($("#canjiarenshu").is(":checked")) {
        oderType.push("1");
    }
    if ($("#ganxingqurenshu").is(":checked")) {
        oderType.push("2");
    }
    if (oderType.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(oderType.length > 1) {
        alert("����дһ�����")
        return;
    }

    activeType = oderType.toString();
    orderType = activeClass.toString();

    var canshu = "douban_type="+activeClass.toString()+"&order_type="+oderType.toString()+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#activeList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//��Ҫҳ������
        $("#shclProgress").hide();

        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length; i++) {

            var bangbangImage = "";

            if(activeData[i].douban_img.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/douban.jpg";
            }else{
                //bangbangImage = "http://202.114.114.34:8878/temp_imgs/show/"+activeData[i].douban_id+".jpg";
                bangbangImage = activeData[i].douban_img
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + activeData[i].douban_id +"</td>" +   //ID
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + activeData[i].douban_title + "</td>" +   //����
                "<td style='height: 70px'>" + activeData[i].douban_date + "</td>" +   //�ʱ��
                "<td style='height: 70px'>" + activeData[i].douban_pos + "</td>" +   //���ַ
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_interest_times + "</td>" +   //����Ȥ����
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_join_times + "</td>" +   //�μ�����
                "<td style='height: 70px'><a href='"+ activeData[i].douban_url +"' target='_blank'>��ַ</a></td>";    //��ַ
            $("#activeList").append(a);
        }

        //���������к�����Ƴ����е��¼�
        jQuery("#activeInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#activeInfo tr:gt(0)").bind("click",function(){
            $("#activeInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
    });
}


function updatePage(inx){
    getSummaryTable("douban_type="+orderType+"&order_type="+activeType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());

    //setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
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