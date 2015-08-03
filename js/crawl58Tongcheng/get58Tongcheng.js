var perPageNum = 12;     //ÿҳ��ʾ������
var detailPageNum = 7;     //ÿҳ��ʾ������
var peopleClass = ["1"];//��������
var siteClass = ["3"];//��վ
var goodClass = ["3"];//�������
var startTime = "2015-5-14";
var endTime = "2015-6-15";

var summaryName = "%E6%9C%B1%E7%BB%8F%E7%90%86";
var summaryId = "48461690";

function init(){

    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?query_type=1&seller_type=1&product_type=3&start_time=2015-5-14&end_time=2015-6-15&start_num=1&total_num=1", function (simpleRowData) {//��Ҫҳ������
            var simpleData = JSON.parse(simpleRowData);
            allSimplePageNum = parseInt(simpleData[0].total_count / perPageNum) + 1;
            setSimplePage(document.getElementsByClassName("summaryHolder")[0], allSimplePageNum, 1);

            allDetailPageNum = parseInt(simpleData[0].publish_count / detailPageNum) + 1;
            setDetialPage(document.getElementsByClassName("detailHolder")[0], allDetailPageNum, 1);

            $('#shclProgress').shCircleLoader({color: "blue"});
            getSummaryTable("query_type=1&seller_type=1&product_type=3&start_time=2015-5-14&end_time=2015-6-15&start_num=1&total_num=" + (perPageNum + 1).toString());
            getDetail("user_name="+summaryName+"&user_id="+summaryId+"&start_num=1&total_num=" + (detailPageNum + 1).toString());
        });
}

var clickStartTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}

var clickEndTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})
}

//���ĳһ��Χ�����

function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}

// ��Ʒ�������
var convertType = function(s){
    var type = parseInt(s);
    if(type == 5){
        return "ƽ�����";
    }
    if(type == 4){
        return "�����ֻ�";
    }
    if(type == 3){
        return "�ʼǱ�";
    }
    if(type == 2){
        return "Ħ�г�";
    }
    if(type == 1){
        return "�綯��";
    }
    if(type == 0){
        return "���г�";
    }

}
//�����ֻ���
var replacePos = function(strObj)
{
    var strObj = strObj.toString()
    var str = "";
    if(strObj.length > 10) {
        for (var i = 2; i < strObj.length; i++) {
            str = str + strObj[i]
        }
        str = "13" + str
    }
    else{
        str = "13753285429"
    }
    return  str;
}

var getInformation = function () {
    $('#summaryList').empty();
    $('#shclProgress').show();
    $('#detailProgress').hide();
    //����ҳ��
    $('#detailProgress').shCircleLoader({color: "blue"});
    $('#shclProgress').shCircleLoader({color: "blue"});

    peopleClass = [];//��������
    siteClass = [];//��վ
    goodClass = [];//�������

    startTime = $("#startTime").val();
    endTime = $("#endTime").val();

    if ($("#inlineCheckbox1").is(":checked")) {
        peopleClass.push("0");
    }
    if ($("#inlineCheckbox2").is(":checked")) {
        peopleClass.push("1");
    }

    if ($("#58tongcheng").is(":checked")) {
        siteClass.push("58tongcheng");
    }
    if ($("#ganjiwang").is(":checked")) {
        siteClass.push("ganjiwang");
    }
    if ($("#baixingwang").is(":checked")) {
        siteClass.push("baixingwang");
    }
    if ($("#soufangwang").is(":checked")) {
        siteClass.push("soufangwang");
    }
    if ($("#weibo").is(":checked")) {
        siteClass.push("weibo");
    }
    if ($("#tieba").is(":checked")) {
        siteClass.push("tieba");
    }

    if ($("#motuoche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#diandongche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#zixingche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#bijiben").is(":checked")) {
        goodClass.push("bijiben");
    }
    if ($("#ershoushouji").is(":checked")) {
        goodClass.push("ershoushouji");
    }
    if ($("#pingbandiannao").is(":checked")) {
        goodClass.push("pingbandiannao");
    }

    if (peopleClass.length == 0 || siteClass.length == 0 || goodClass.length == 0 || startTime.toString().length < 2 || endTime.toString().length < 2) {
        alert("����д��ѯ������")
        return;
    }
    var canshu = "query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime+"&start_num=1&total_num="+(perPageNum+1).toString();
    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?"+canshu, function (simpleRowData) {//��Ҫҳ������
        var simpleData = JSON.parse(simpleRowData);
        if(simpleData[0]) {
            allSimplePageNum = parseInt(simpleData[0].total_count / perPageNum) + 1;
            setSimplePage(document.getElementsByClassName("summaryHolder")[0], allSimplePageNum, 1);

            $('#shclProgress').shCircleLoader({color: "blue"});
            getSummaryTable(canshu)
        }else{
            $('#shclProgress').hide();
            setSimplePage(document.getElementsByClassName("summaryHolder")[0], 1, 1);
        }
    });
}

var getSummaryTable = function (canshu) {
    $("#summaryList").empty();
    $('#shclProgress').show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?"+canshu, function (summaryRawData) {//��Ҫҳ������
        $('#shclProgress').hide();

        var summaryData = JSON.parse(summaryRawData);

        for (var i = 1; i < summaryData.length; i++) {
            var sellerName = summaryData[i].seller_name;
            if(sellerName.indexOf("ϵ") != -1){
                sellerName = sellerName.substring(5,sellerName.length)
            }

            var a = "<tr> <td>" + sellerName + "</th>" +//���
                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//�����ֻ���
                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//���飬��ַ
            $("#summaryList").append(a);
        }
        //���������к�����Ƴ����е��¼�
        jQuery("#summaryInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#summaryInfo tr:gt(0)").bind("click",function(){
            $("#summaryInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
        //������к�
        $("#summaryInfo td").click(function () {
            $('#detailProgress').show();
            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
            //alert("��" + (trSeq) + "��");
            if(1) {
                summaryName= summaryData[parseInt(trSeq)+1].seller_name;
                summaryId = summaryData[parseInt(trSeq)+1].seller_id;
                console.log(summaryName+"   "+summaryId)
                $("#detailList").empty();
                var detailCanshu ="user_name="+summaryName+"&user_id="+summaryId+"&start_num=0&total_num="+(detailPageNum+1).toString();
                //alert(detailCanshu)
                var allDetailPageNum = parseInt(summaryData[parseInt(trSeq)+1].publish_count / detailPageNum) + 1;
                setDetialPage(document.getElementsByClassName("detailHolder")[0], allDetailPageNum, 1);
                getDetail(detailCanshu)
            }
        })
    });
}

function getDetail(canshu){
    $("#detailList").empty();
    $('#detailProgress').show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?"+canshu, function (detailRawData) {//��ʼ��ϸҳ������

        //alert("http://202.114.114.34:8878/yuqing/servlet_detail_information?"+canshu)
        $('#detailProgress').hide();
        var detailData = JSON.parse(detailRawData);
        for (var i = 0; i < detailData.length; i++) {
            var sellerName = detailData[i].seller_name;
            if(sellerName.indexOf("ϵ") != -1){
                sellerName = sellerName.substring(5,sellerName.length)
            }

            var location = detailData[i].seller_location;
            if(location.indexOf("��") != -1){
                location = location.substring(6,location.length)
            }

            var tongchengImage = "";
            if(detailData[i].image_url_address.length < 15){
                tongchengImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                //tongchengImage = "http://202.114.114.34:8878/temp_imgs/xiaozang/"+detailData[i].tongcheng_id+".jpg";
                tongchengImage = detailData[i].image_url_address;
            }


            var a = "<tr><td>" + i + "</td>" +//���
                //"<td><img src='../images/"+rd(1,20).toString()+".jpg' style='width: 50px;height: 44.5px'></td>" +//ͼƬ
                "<td><img src="+detailData[i].image_url_address+" style='width: 50px;height: 44.5px'></td>" +//ͼƬ
                "<td>" +  location + "</td>" +//����
                "<td>" + sellerName + "</td>" +//��������
                "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//�����ֻ���
                "<td>" +  detailData[i].product_pub_time + "</td>" +//��������
                "<td>" +  convertType(detailData[i].product_type) + "</td>" +//���
                "<td><a href='"+detailData[i].product_url_address+"' target='_blank'>��ַ</a></td>"//���飬��ַ
            $("#detailList").append(a);
        }
    });
}

function updateSimplePage(inx){
    getSummaryTable("query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num=" + (perPageNum + 1).toString());
}

//container ������count ��ҳ�� pageindex ��ǰҳ��
function setSimplePage(container, count, pageindex) {
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
            setSimplePage(container, count, inx);
            updateSimplePage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //���ҳ��
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setSimplePage(container, count, inx);
                updateSimplePage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //�����һҳ
            if (inx == count) {
                return false;
            }
            inx++;
            setSimplePage(container, count, inx);
            updateSimplePage(inx);
            return false;
        }
    } ()
}



function updateDetialPage(inx){
    getDetail("user_name="+summaryName+"&user_id="+summaryId+"&start_num="+((inx-1)*detailPageNum+1).toString()+"&total_num="+(detailPageNum+1).toString());
}

//container ������count ��ҳ�� pageindex ��ǰҳ��
function setDetialPage(container, count, pageindex) {
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
            setDetialPage(container, count, inx);
            updateDetialPage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //���ҳ��
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setDetialPage(container, count, inx);
                updateDetialPage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //�����һҳ
            if (inx == count) {
                return false;
            }
            inx++;
            setDetialPage(container, count, inx);
            updateDetialPage(inx);
            return false;
        }
    } ()
}