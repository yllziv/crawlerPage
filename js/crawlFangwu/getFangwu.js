
//初始化页面
var initDouban = function() {
    $('#shclProgress').shCircleLoader({color:"blue"});
    getSummaryTable("order_type=0");
}



var getInformation = function () {
    var bangbangClass = [];//网站

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
        alert("请填写查询条件！")
        return;
    }else if(bangbangClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "order_type="+bangbangClass.toString();
    getSummaryTable(canshu);
}

var getSummaryTable = function (canshu) {
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_house_information?"+canshu, function (fangwuRawData) {//概要页面数据
        $("#shclProgress").hide();
        $("#bangbangList").empty();
        var fangwuData = JSON.parse(fangwuRawData);

        for (var i = 1; i < fangwuData.length; i++) {
            var bangbangImage = "";

            //if(fangwuData[i].bb_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang.jpg";
            //}else{
            //    bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang/"+ fangwuData[i].house_id +".jpg"
            //}

            var fangwuContent = fangwuData[i].house_newmessage;
            if(fangwuContent.length > 111){
                fangwuContent = fangwuContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + fangwuData[i].house_title +"</td>" +   //房屋信息标题
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + fangwuContent + "</td>" +   //房屋信息
                "<td style='height: 70px'>" + fangwuData[i].house_price + "</td>" +   //房屋价格
                "<td style='height: 70px;'>" + fangwuData[i].house_place + "</td>" +   //房屋地址
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + fangwuData[i].kiapantime_start + "</td>" +   //开盘时间
                "<td style='height: 70px;'>" + fangwuData[i].house_telephone + "</td>" +   //联系电话
                "<td style='height: 70px'><a target='_blank' href = '" + fangwuData[i].house_url + "'>点击查看详细信息</a></td>";    //详细信息
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

