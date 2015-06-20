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
    if(s == 2){
        return "摩托车";
    }
    if(s == 1){
        return "电动车";
    }
    if(s == 0){
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
    var peopleClass = [];//卖家类型
    var siteClass = [];//网站
    var goodClass = [];//销赃类别
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();


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
    //alert(peopleClass.toString() + "  " + siteClass.toString() + "  " + goodClass.toString() + "  " + startTime + "  " + endTime)
    var canshu = "query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime
    //alert(canshu)
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://192.168.2.113:8080/yuqing/servlet_simple_information?"+canshu, function (summaryRawData) {//概要页面数据
        $("#summaryList").empty();
        var summaryData = JSON.parse(summaryRawData);
        for (var i = 1; i < summaryData.length; i++) {
            var a = "<tr> <td><input type='button' style='background-color: transparent; border: 0; background: none' value=" + summaryData[i].seller_name + "></th>" +//编号
                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//卖家手机号
                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//详细信息，网址
            $("#summaryList").append(a);
        }
        //设置分页
        $("div.summaryHolder").jPages({
            containerID: "summaryList", //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 14,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画
        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#summaryInfo tr").mouseover(function(){
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
            var tdSeq = $(this).parent().find("td").index($(this));
            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
            //alert("第" + (trSeq) + "行，第" + (tdSeq + 1) + "列");
            if(tdSeq == 0) {
                var summaryName= summaryData[parseInt(trSeq)+1].seller_name;
                var summaryId = summaryData[parseInt(trSeq)+1].seller_id;
                console.log(summaryName+"   "+summaryId)
                $("#detailList").empty();
                $.post("http://192.168.2.113:8080/yuqing/servlet_detail_information?user_name="+summaryName+"&user_id="+summaryId, function (detailRawData) {//初始详细页面数据
                    var detailData = JSON.parse(detailRawData);
                    for (var i = 1; i < detailData.length; i++) {
                        var a = "<tr><td>" + i + "</td>" +//编号
                            "<td><img src='../images/"+rd(1,20).toString()+".jpg' style='width: 50px;height: 44.5px'></td>" +//图片
                            "<td>" +  detailData[i].seller_location + "</td>" +//区域
                            "<td>" + detailData[i].seller_name + "</td>" +//卖家姓名
                            "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//卖家手机号
                            "<td>" +  detailData[i].product_pub_time + "</td>" +//发布日期
                            "<td>" +  convertType(detailData[i].product_type) + "</td>" +//类别
                            "<td><a href='"+detailData[i].product_url_address+"' target='_blank'>网址</a></td>"//详细信息，网址
                        $("#detailList").append(a);
                    }
                    $("div.detailHolder").jPages({
                        containerID: "detailList", //存放表格的窗口标签ID
                        previous: "上一页", //指示首页的按钮
                        next: "下一页",//指示尾页的按钮
                        perPage: 8,//每页显示表格的行数
                        delay: 10 //分页时动画持续时间，0表示无动画
                    });
                });
            }
        })
    });
}

