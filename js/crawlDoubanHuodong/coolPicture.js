var initCoolPicture = function () {

    getSummaryTable("douban_type=-1");//初始化页面
}


var getInformation = function () {
    var activeClass = [];//网站

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
        alert("请填写查询条件！")
        return;
    } else if (activeClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "douban_type=" + activeClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://192.168.2.113:8080/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//概要页面数据
        $("#coolPicture").empty();
        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length / 6-1; i++) {
            var tableString = "<tr>";
            for (var j = 0; j < 6; j++) {
                if(activeData[i + j].douban_title.length >15 ){
                    activeData[i + j].douban_title  = activeData[i + j].douban_title.substring(0,15);
                }
                if(activeData[i + j].douban_date.length >15 ){
                    activeData[i + j].douban_date  = activeData[i + j].douban_date.substring(0,15);
                }
                if(activeData[i + j].douban_pos.length >15 ){
                    activeData[i + j].douban_pos  = activeData[i + j].douban_pos.substring(0,15);
                }
                tableString += "<td><LI class='brand_item'><A class='brand_name' href='#' >" +
                    //"<IMG src='" + activeData[i*6 + j].douban_img + "' style='width:148px; height:210px;'/>" + //图片
                    "<IMG src='" + "http://localhost:8080/temp_imgs/douban/"+activeData[i*6 + j].douban_id+".jpg" + "' style='width:148px; height:210px;'/>" + //图片
                    "<h5 style='padding-top: 3px'>" + activeData[i + j].douban_title + "</h5></A><A class='brand_detail' " + //标题
                    "href='" + activeData[i + j].douban_url + "' target='_blank'><table class='table table-bordered'><tbody><tr><td style='font-size: 15px ; font-weight:bold;'>" +
                    "" + activeData[i + j].douban_title + "</td></tr><tr><td style='font-size: 10px'>" +
                    "地点：" + activeData[i + j].douban_pos + "</td></tr><tr><td style='font-size: 10px'>" + //活动地址
                    "时间：" + activeData[i + j].douban_date + "</td></tr><tr><td style='font-size: 10px'>" +//活动时间
                    "" + activeData[i + j].douban_interest_times + "人感兴趣</td></tr><tr><td style='font-size: 10px'>" +
                    "" + activeData[i + j].douban_join_times + "人想参加</td></tr></tbody></table></A></LI></td>";
            }
            $("#coolPicture").append(tableString);
        }
            $(document).ready(function () {
        $(".brand_detail").hide();
        $(".brand_item").hover(
            function () {
                $(this).children(".brand_name").hide();
                $(this).children(".brand_detail").show();
            }
            , function () {
                $(this).children(".brand_detail").hide();
                $(this).children(".brand_name").show();
            }
        );
    });
    //设置分页
    $("#coolPage").jPages({
        containerID: "coolPicture", //存放表格的窗口标签ID
        previous: "上一页", //指示首页的按钮
        next: "下一页",//指示尾页的按钮
        perPage: 2,//每页显示表格的行数
        delay: 10 //分页时动画持续时间，0表示无动画
    });
    });
}
