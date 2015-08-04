var perPageNum = 7; //每页显示的条数
var orderType = 0;      // 排序方式

//初始化页面
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//概要页面数据
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTableTuniu("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
}



var orderInformation = function () {
    var tuniuClass = [];// 网站

    if ($("#moren").is(":checked")) {
        tuniuClass.push("0");
    }
    if ($("#goumaicishu").is(":checked")) {
        tuniuClass.push("2");
    }
    if ($("#pingluncishu").is(":checked")) {
        tuniuClass.push("1");
    }
    if (tuniuClass.length == 0) {
        alert("请填写查询条件！")
        return;
    }else if(tuniuClass.length > 1) {
        alert("请填写一种类别！")
        return;
    }
    orderType = tuniuClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTableTuniu(canshu)
}

var getSummaryTableTuniu = function (canshu) {
    $("#tuniuList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?" + canshu, function (tuniuRawData) {//概要页面数据
        $("#shclProgress").hide();
        //alert("http://202.114.114.34:8878/yuqing/servlet_tuniu_information?" + canshu);
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
                tuniuImage = "http://202.114.114.34:8878/temp_imgs/tuniu.jpg";
            }else{
                //tuniuImage = "http://202.114.114.34:8878/temp_imgs/travel/"+tuniuData[i].tuniu_id+".jpg";
                tuniuImage = tuniuData[i].tuniu_img_url;
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + tuniuTitle +"</td>" +   //景点名称
                "<td style='height: 70px'><img src= " + tuniuImage + " style='width: 70px;height: 50px'></td>" +   //图片
                "<td style='height: 70px'>" + tuniuData[i].tuniu_type + "</td>" +   //类型
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_place + "</td>" +   //景点地址
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_opentime + "</td>" +   //景点开放时间
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_buy_num + "</td>" +   //购买次数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_comment_num + "</td>" +   //评论次数
                "<td style='height: 70px'><a target='_blank' href = '" + tuniuData[i].tuniu_url + "'>点击查看详情</a></td>";    //详情
            $("#tuniuList").append(a);
        }
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#tuniuInfo tr:gt(0)").mouseover(function(){
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


function updatePage(inx){
    getSummaryTableTuniu("order_type="+orderType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());
}

//container 容器，count 总页数 pageindex 当前页数
function setPage(container, count, pageindex) {
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
            setPage(container, count, inx);
            updatePage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //点击页码
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setPage(container, count, inx);
                updatePage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //点击下一页
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