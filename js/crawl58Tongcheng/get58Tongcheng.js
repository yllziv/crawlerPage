var perPageNum = 12;     //每页显示的条数
var detailPageNum = 7;     //每页显示的条数
var peopleClass = ["1"];//卖家类型
var siteClass = ["3"];//网站
var goodClass = ["3"];//销售类别
var startTime = "2015-5-14";
var endTime = "2015-6-15";

var summaryName = "%E6%9C%B1%E7%BB%8F%E7%90%86";
var summaryId = "48461690";

function init(){

    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?query_type=1&seller_type=1&product_type=3&start_time=2015-5-14&end_time=2015-6-15&start_num=1&total_num=1", function (simpleRowData) {//概要页面数据
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

//获得某一范围随机数

function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}

// 商品类别索引
var convertType = function(s){
    var type = parseInt(s);
    if(type == 5){
        return "平板电脑";
    }
    if(type == 4){
        return "二手手机";
    }
    if(type == 3){
        return "笔记本";
    }
    if(type == 2){
        return "摩托车";
    }
    if(type == 1){
        return "电动车";
    }
    if(type == 0){
        return "自行车";
    }

}
//处理手机号
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
    //加载页面
    $('#detailProgress').shCircleLoader({color: "blue"});
    $('#shclProgress').shCircleLoader({color: "blue"});

    peopleClass = [];//卖家类型
    siteClass = [];//网站
    goodClass = [];//销售类别

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
        alert("请填写查询条件！")
        return;
    }
    var canshu = "query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime+"&start_num=1&total_num="+(perPageNum+1).toString();
    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?"+canshu, function (simpleRowData) {//概要页面数据
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
    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?"+canshu, function (summaryRawData) {//概要页面数据
        $('#shclProgress').hide();

        var summaryData = JSON.parse(summaryRawData);

        for (var i = 1; i < summaryData.length; i++) {
            var sellerName = summaryData[i].seller_name;
            if(sellerName.indexOf("系") != -1){
                sellerName = sellerName.substring(5,sellerName.length)
            }

            var a = "<tr> <td>" + sellerName + "</th>" +//编号
                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//卖家手机号
                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//详情，网址
            $("#summaryList").append(a);
        }
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#summaryInfo tr:gt(0)").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#summaryInfo tr:gt(0)").bind("click",function(){
            $("#summaryInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
        //获得行列号
        $("#summaryInfo td").click(function () {
            $('#detailProgress').show();
            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
            //alert("第" + (trSeq) + "行");
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
    $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?"+canshu, function (detailRawData) {//初始详细页面数据

        //alert("http://202.114.114.34:8878/yuqing/servlet_detail_information?"+canshu)
        $('#detailProgress').hide();
        var detailData = JSON.parse(detailRawData);
        for (var i = 0; i < detailData.length; i++) {
            var sellerName = detailData[i].seller_name;
            if(sellerName.indexOf("系") != -1){
                sellerName = sellerName.substring(5,sellerName.length)
            }

            var location = detailData[i].seller_location;
            if(location.indexOf("易") != -1){
                location = location.substring(6,location.length)
            }

            var tongchengImage = "";
            if(detailData[i].image_url_address.length < 15){
                tongchengImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                //tongchengImage = "http://202.114.114.34:8878/temp_imgs/xiaozang/"+detailData[i].tongcheng_id+".jpg";
                tongchengImage = detailData[i].image_url_address;
            }


            var a = "<tr><td>" + i + "</td>" +//编号
                //"<td><img src='../images/"+rd(1,20).toString()+".jpg' style='width: 50px;height: 44.5px'></td>" +//图片
                "<td><img src="+detailData[i].image_url_address+" style='width: 50px;height: 44.5px'></td>" +//图片
                "<td>" +  location + "</td>" +//区域
                "<td>" + sellerName + "</td>" +//卖家姓名
                "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//卖家手机号
                "<td>" +  detailData[i].product_pub_time + "</td>" +//发布日期
                "<td>" +  convertType(detailData[i].product_type) + "</td>" +//类别
                "<td><a href='"+detailData[i].product_url_address+"' target='_blank'>网址</a></td>"//详情，网址
            $("#detailList").append(a);
        }
    });
}

function updateSimplePage(inx){
    getSummaryTable("query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num=" + (perPageNum + 1).toString());
}

//container 容器，count 总页数 pageindex 当前页数
function setSimplePage(container, count, pageindex) {
    var container = container;
    var count = count;
    var pageindex = pageindex;
    var a = [];
    //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
    if (pageindex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">上一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">上一页</a>";
    }
    function setPageList() {
        if (pageindex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }
    //总页数小于10
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    //总页数大于10页
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
        else { //当前页在中间部分
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageindex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">下一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">下一页</a>";
    }
    container.innerHTML = a.join("");
    //事件点击
    var pageClick = function() {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageindex; //初始的页码
        oAlink[0].onclick = function() { //点击上一页
            if (inx == 1) {
                return false;
            }
            inx--;
            setSimplePage(container, count, inx);
            updateSimplePage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setSimplePage(container, count, inx);
                updateSimplePage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //点击下一页
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

//container 容器，count 总页数 pageindex 当前页数
function setDetialPage(container, count, pageindex) {
    var container = container;
    var count = count;
    var pageindex = pageindex;
    var a = [];
    //总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
    if (pageindex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">上一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">上一页</a>";
    }
    function setPageList() {

        if (pageindex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }
    //总页数小于10
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    //总页数大于10页
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
        else { //当前页在中间部分
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageindex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">下一页</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">下一页</a>";
    }
    container.innerHTML = a.join("");
    //事件点击
    var pageClick = function() {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageindex; //初始的页码
        oAlink[0].onclick = function() { //点击上一页
            if (inx == 1) {
                return false;
            }
            inx--;
            setDetialPage(container, count, inx);
            updateDetialPage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setDetialPage(container, count, inx);
                updateDetialPage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //点击下一页
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