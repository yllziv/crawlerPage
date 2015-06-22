
//初始化页面
var initDouban = function() {
    getSummaryTable("order_type=0");
}



var orderInformation = function () {
    var tuniuClass = [];//网站

    if ($("#moren").is(":checked")) {
        tuniuClass.push("0");
    }
    if ($("#goumaicishu").is(":checked")) {
        tuniuClass.push("1");
    }
    if ($("#pingluncishu").is(":checked")) {
        tuniuClass.push("2");
    }
    if (tuniuClass.length == 0) {
        alert("请填写查询条件！")
        return;
    }else if(tuniuClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "order_type="+tuniuClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://localhost:8080/yuqing/servlet_tuniu_information?" + canshu, function (tuniuRawData) {//概要页面数据
        $("#tuniuList").empty();
        var tuniuData = JSON.parse(tuniuRawData);
        for (var i = 1; i < tuniuData.length; i++) {

            //途牛标题
            var tuniuTitle = tuniuData[i].tuniu_title;
            var stastTuniuTile = tuniuTitle.indexOf("<")+1;
            var endTuniuTile = tuniuTitle.indexOf(">");
            tuniuTitle = tuniuTitle.substring(stastTuniuTile,endTuniuTile);


            // 途牛图片
            var tuniuImage = "";
            if(tuniuData[i].tuniu_img_url.length < 20){
                tuniuImage = "http://localhost:8080/temp_imgs/tuniu.jpg";
            }else{
                tuniuImage = "http://localhost:8080/temp_imgs/tuniu/"+ tuniuData[i].tuniu_id +".jpg"
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + tuniuTitle +"</td>" +   //景点名称
                "<td style='height: 70px'><img src= " + tuniuImage + " style='width: 70px;height: 50px'></td>" +   //图片
                "<td style='height: 70px'>" + tuniuData[i].tuniu_type + "</td>" +   //类型
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_place + "</td>" +   //景点地址
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_opentime + "</td>" +   //景点开放时间
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_buy_num + "</td>" +   //购买次数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_comment_num + "</td>" +   //评论次数
                "<td style='height: 70px'><a href = '" + tuniuData[i].tuniu_url + "'>点击查看详细信息</a></td>";    //详细信息
            $("#tuniuList").append(a);
        }
        //设置分页
        $("div.activeHolder").jPages({
            containerID: "tuniuList", //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 12,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画
        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#tuniuInfo tr").mouseover(function(){
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

