var perPageNum = 7;     //每页显示的条数
var orderType = -1;      // 排序方式
var activeType =0;      // 活动类型

//初始化页面
var initDouban = function() {
    $.post("http://202.114.114.34:8878/yuqing/servlet_douban_information?"+"douban_type=-1&order_type=0&start_num=1&total_num="+(perPageNum+1).toString(), function (weiboRawData) {//概要页面数据
        var weiboData = JSON.parse(weiboRawData);
        allPageNum = parseInt(weiboData[1].total_count/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
        $('#shclProgress').shCircleLoader({color:"blue"});
        getSummaryTable("douban_type=-1&order_type=0&start_num=1&total_num="+(perPageNum+1).toString());
    });
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
    var oderType = [];//排序方式
    if ($("#moren").is(":checked")) {
        oderType.push("0");
    }
    if ($("#canjiarenshu").is(":checked")) {
        oderType.push("1");
    }
    if ($("#ganxingqurenshu").is(":checked")) {
        oderType.push("2");
    }
    if (oderType.length == 0) {
        alert("请填写查询条件！")
        return;
    }else if(oderType.length > 1) {
        alert("请填写一种类别！")
        return;
    }

    activeType = oderType.toString();
    orderType = activeClass.toString();

    var canshu = "douban_type="+activeClass.toString()+"&order_type="+oderType.toString()+"&start_num=1&total_num="+(perPageNum+1).toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $("#activeList").empty();
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//概要页面数据
        $("#shclProgress").hide();

        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length; i++) {

            var bangbangImage = "";

            if(activeData[i].douban_img.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/douban.jpg";
            }else{
                //bangbangImage = "http://202.114.114.34:8878/temp_imgs/show/"+activeData[i].douban_id+".jpg";
                bangbangImage = activeData[i].douban_img
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + activeData[i].douban_id +"</td>" +   //ID
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //图片
                "<td style='height: 70px'>" + activeData[i].douban_title + "</td>" +   //标题
                "<td style='height: 70px'>" + activeData[i].douban_date + "</td>" +   //活动时间
                "<td style='height: 70px'>" + activeData[i].douban_pos + "</td>" +   //活动地址
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_interest_times + "</td>" +   //感兴趣人数
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_join_times + "</td>" +   //参加人数
                "<td style='height: 70px'><a href='"+ activeData[i].douban_url +"' target='_blank'>网址</a></td>";    //网址
            $("#activeList").append(a);
        }

        //鼠标移入该行和鼠标移除该行的事件
        jQuery("#activeInfo tr:gt(0)").mouseover(function(){
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


function updatePage(inx){
    getSummaryTable("douban_type="+orderType+"&order_type="+activeType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+(perPageNum+1).toString());

    //setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
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