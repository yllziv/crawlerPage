
//初始化页面
var initDouban = function() {
    getSummaryTable();
}



var getInformation = function () {
    var bangbangClass = [];//网站

    if ($("#all").is(":checked")) {
        bangbangClass.push("-1");
    }
    if ($("#yinyue").is(":checked")) {
        bangbangClass.push("0");
    }
    if ($("#xiju").is(":checked")) {
        bangbangClass.push("1");
    }
    if ($("#jiangzuo").is(":checked")) {
        bangbangClass.push("2");
    }
    if ($("#juhui").is(":checked")) {
        bangbangClass.push("3");
    }
    if ($("#dianying").is(":checked")) {
        bangbangClass.push("4");
    }
    if ($("#zhanlan").is(":checked")) {
        bangbangClass.push("5");
    }
    if ($("#yundong").is(":checked")) {
        bangbangClass.push("6");
    }
    if ($("#gongyi").is(":checked")) {
        bangbangClass.push("7");
    }
    if ($("#lvyou").is(":checked")) {
        bangbangClass.push("8");
    }
    if ($("#qita").is(":checked")) {
        bangbangClass.push("9");
    }

    if (bangbangClass.length == 0) {
        alert("请填写查询条件！")
        return;
    }else if(bangbangClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "douban_type="+bangbangClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function () {
    $.post("http://localhost:8080/yuqing/servlet_bangbang_information", function (bangbangRawData) {//概要页面数据
        $("#bangbangList").empty();
        var bangbangData = JSON.parse(bangbangRawData);
        for (var i = 1; i < bangbangData.length; i++) {
            var bangbangImage = "";

            if(bangbangData[i].bb_img_url.length < 2){
                bangbangImage = "http://localhost:8080/temp_imgs/bangbang.jpg";
            }else{
                bangbangImage = "http://localhost:8080/temp_imgs/bangbang/"+ bangbangData[i].bangbang_id +".jpg"
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].bangbang_title +"</td>" +   //新闻标题
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + bangbangData[i].bb_content + "</td>" +   //新闻内容
                "<td style='height: 70px'>" + "2015年"+ bangbangData[i].bb_pub_time.month+"月"+
                + bangbangData[i].bb_pub_time.day+"日"+ bangbangData[i].bb_pub_time.hours+"时"+
                + bangbangData[i].bb_pub_time.minutes+"分"+ bangbangData[i].bb_pub_time.seconds+"秒"+"</td>" +   //发布时间
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_read_times + "</td>" +   //阅读次数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_response_times + "</td>" +   //评论次数
                "<td style='height: 70px'><a href = '" + bangbangData[i].bb_img_url + "'>点击查看详细信息</a></td>";    //详细信息
            $("#bangbangList").append(a);
        }
        //设置分页
        $("div.activeHolder").jPages({
            containerID: "bangbangList", //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 10,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画
        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#bangbangInfo tr").mouseover(function(){
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

