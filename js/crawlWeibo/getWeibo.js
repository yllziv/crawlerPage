
//初始化页面
var initDouban = function() {
    getSummaryTable("order_type=0");
}



var getInformation = function () {
    var weiboClass = [];//网站

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
        alert("请填写查询条件！")
        return;
    }else if(weiboClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "order_type="+weiboClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://localhost:8080/yuqing/servlet_weibo_information?"+canshu, function (weiboRawData) {//概要页面数据
        $("#weiboList").empty();
        var weiboData = JSON.parse(weiboRawData);
        for (var i = 1; i < weiboData.length; i++) {
            var weiboImage = "";
            var weiboTitle = "";
            if(weiboData[i].image_url.length < 2){
                weiboImage = "http://localhost:8080/temp_imgs/weibo.jpg";
            }else{
                weiboImage = "http://localhost:8080/temp_imgs/weibo/"+ weiboData[i].weibo_id +".jpg"
            }
            if(weiboData[i].weibo_title.length < 2 &&weiboData[i].weibo_content.length > 21){
                weiboData[i].weibo_title = weiboData[i].weibo_content.substring(0,20)
            }
            var weiboContent = weiboData[i].weibo_content;
            if(weiboContent.length > 111){
                weiboContent = weiboContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + weiboData[i].weibo_title +"</td>" +   //微博标题
                "<td style='height: 70px'><img src= " + weiboImage + " style='width: 70px;height: 50px'></td>" +   //图片
                "<td style='height: 70px'>" + weiboContent + "</td>" +   //微博内容
                "<td style='height: 70px'>" + "2015年"+ weiboData[i].pub_time.month+"月"+
                + weiboData[i].pub_time.day+"日"+ weiboData[i].pub_time.hours+"时"+
                + weiboData[i].pub_time.minutes+"分"+ weiboData[i].pub_time.seconds+"秒"+"</td>" +   //发布时间
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].comment_number + "</td>" +   //评论条数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].relay_number + "</td>" +   //转发条数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].support_number + "</td>";    //点赞人数
            $("#weiboList").append(a);
        }
        //设置分页
        $("div.activeHolder").jPages({
            containerID: "weiboList", //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 12,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画
        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#weiboInfo tr").mouseover(function(){
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

