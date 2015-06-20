
//初始化页面
var initDouban = function() {
    getSummaryTable("douban_type=-1");
}
//获得某一范围随机数
function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
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
    }else if(activeClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    var canshu = "douban_type="+activeClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://192.168.2.113:8080/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//概要页面数据
        $("#activeList").empty();
        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length; i++) {
            var a =
                "<tr></tr><td style='height: 70px'>" + activeData[i].douban_id +"</td>" +   //ID
                "<td style='height: 70px'><img src= " + activeData[i].douban_img + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + activeData[i].douban_title + "</td>" +   //标题
                "<td style='height: 70px'>" + activeData[i].douban_date + "</td>" +   //活动时间
                "<td style='height: 70px'>" + activeData[i].douban_pos + "</td>" +   //活动地址
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_interest_times + "</td>" +   //感兴趣人数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_join_times + "</td>" +   //参加人数
                "<td style='height: 70px'><a href='"+ activeData[i].douban_url +"' target='_blank'>网址</a></td>";    //网址
            $("#activeList").append(a);
        }
        //设置分页
        $("div.activeHolder").jPages({
            containerID: "activeList", //存放表格的窗口标签ID
            previous: "上一页", //指示首页的按钮
            next: "下一页",//指示尾页的按钮
            perPage: 12,//每页显示表格的行数
            delay: 10 //分页时动画持续时间，0表示无动画
        });
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#activeInfo tr").mouseover(function(){
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

