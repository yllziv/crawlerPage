
var perPageNum = 6; //每页显示的条数
var orderType = 0;      // 排序方式

//初始化页面
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_bangbang_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//概要页面数据
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
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
    orderType = bangbangClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#bangbangList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_bangbang_information?"+canshu, function (bangbangRawData) {//概要页面数据
        $("#shclProgress").hide();

        var bangbangData = JSON.parse(bangbangRawData);
        for (var i = 1; i < bangbangData.length; i++) {
            var bangbangImage = "";

            if(bangbangData[i].bb_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang.jpg";
            }else{
                bangbangImage = bangbangData[i].bb_img_url;
            }

            var bangbangContent = bangbangData[i].bb_content;
            if(bangbangContent.length > 111){
                bangbangContent = bangbangContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].bangbang_title +"</td>" +   //新闻标题
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + bangbangContent + "</td>" +   //新闻内容
                "<td style='height: 70px'>" + "2015年"+ bangbangData[i].bb_pub_time.month+"月"+
                + bangbangData[i].bb_pub_time.day+"日"+ bangbangData[i].bb_pub_time.hours+"时"+
                + bangbangData[i].bb_pub_time.minutes+"分"+ bangbangData[i].bb_pub_time.seconds+"秒"+"</td>" +   //发布时间
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_read_times + "</td>" +   //阅读次数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_response_times + "</td>" +   //评论次数
                "<td style='height: 70px'><a target='_blank' href = '" + bangbangData[i].bangbang_url + "'>点击查看详情</a></td>";    //详情
            $("#bangbangList").append(a);
        }
        //鼠标移入该行和鼠标移除该行的事件 :gt(0)
        jQuery("#bangbangInfo tr:gt(0)").mouseover(function(){
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


function updatePage(inx){
    getSummaryTable("order_type="+orderType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());
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