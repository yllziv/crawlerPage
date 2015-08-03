var perPageNum = 7; //每页显示的条数
var orderType = 0;      // 排序方式

//初始化页面
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_weibo_information?"+"order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//概要页面数据
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
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
    orderType = weiboClass.toString();
    var canshu = "order_type="+orderType+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#weiboList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_weibo_information?"+canshu, function (weiboRawData) {//概要页面数据
        $("#shclProgress").hide();
        var weiboData = JSON.parse(weiboRawData);
        for (var i = 1; i < weiboData.length; i++) {
            var weiboImage = "";
            var weiboTitle = "";
            if(weiboData[i].image_url.length < 2){
                weiboImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                //weiboImage =  "http://202.114.114.34:8878/temp_imgs/city_news/"+weiboData[i].weibo_id+".jpg";
                weiboImage =  weiboData[i].image_url
            }
            if(weiboData[i].weibo_title.length < 2 &&weiboData[i].weibo_content.length > 21){
                weiboData[i].weibo_title = weiboData[i].weibo_content.substring(0,20)
            }
            var weiboContent = weiboData[i].weibo_content;
            if(weiboContent.length > 41){
                weiboContent = weiboContent.substr(0,40)
                weiboContent = weiboContent + "......";
            }
            var a = "";
            if(weiboData[i]) {
                a =
                    "<tr></tr><td style='height: 70px'>" + weiboData[i].weibo_title + "</td>" +   //微博标题
                    "<td style='height: 70px'><img src= " + weiboImage + " style='width: 70px;height: 50px'></td>" +   //图片
                    "<td style='height: 70px'>" + weiboContent + "</td>" +   //微博内容
                    "<td style='height: 70px'>" + "2015年" + weiboData[i].pub_time.month + "月" + +weiboData[i].pub_time.day + "日" + weiboData[i].pub_time.hours + "时" + +weiboData[i].pub_time.minutes + "分" + weiboData[i].pub_time.seconds + "秒" + "</td>" +   //发布时间
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].comment_number + "</td>" +   //评论条数
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].relay_number + "</td>" +   //转发条数
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].support_number + "</td>";    //点赞人数
            }else{
                a =
                    "<tr></tr><td style='height: 70px'></td>" +   //微博标题
                    "<td style='height: 70px'></td>" +   //图片
                    "<td style='height: 70px'></td>" +   //微博内容
                    "<td style='height: 70px'></td>" +   //发布时间
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>" +   //评论条数
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>" +   //转发条数
                    "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'></td>";    //点赞人数
            }
            $("#weiboList").append(a);
        }
        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#weiboInfo tr:gt(0)").mouseover(function(){
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