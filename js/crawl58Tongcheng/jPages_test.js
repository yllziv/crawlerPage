////初始化页面
////$("#detailList").ajaxStop(function(){
////    alert("所有 AJAX 请求已完成");
////});
//function init() {
//    $('#shclProgress').show();
//    $('#detailProgress').hide();
//    //加载页面
//    $('#detailProgress').shCircleLoader({color: "blue"});
//    $('#shclProgress').shCircleLoader({color: "blue"});
//
//    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?query_type=1&seller_type=1&product_type=3&start_time=2015-5-10&end_time=2015-6-15&start_num=1&total_num=80", function (summaryRawData) {//概要页面数据
//        $('#shclProgress').hide();
//        $("#summaryList").empty();
//        var summaryData = JSON.parse(summaryRawData);
//        for (var i = 1; i < summaryData.length; i++) {
//            var a = "<tr> <td><input type='button' style='background-color: transparent; border: 0; background: none' value=" + summaryData[i].seller_name + "></th>" +//编号
//                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//卖家手机号
//                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//详细信息，网址
//            $("#summaryList").append(a);
//        }
//        //设置分页
//        $("div.summaryHolder").jPages({
//            containerID: "summaryList", //存放表格的窗口标签ID
//            previous: "上一页", //指示首页的按钮
//            next: "下一页",//指示尾页的按钮
//            perPage: 11,//每页显示表格的行数
//            delay: 10 //分页时动画持续时间，0表示无动画
//        });
//        //鼠标移入该行和鼠标移除该行的事件
//        jQuery("#summaryInfo tr").mouseover(function () {
//            jQuery(this).addClass("over");
//        }).mouseout(function () {
//            jQuery(this).removeClass("over");
//        });
//        $("#summaryInfo tr:gt(0)").bind("click", function () {
//            $("#summaryInfo tr:gt(0)").removeClass("click");
//            $(this).addClass("click");
//        });
//        //获得行列号
//        $("#summaryInfo td").click(function () {
//            $('#detailProgress').show();
//            var tdSeq = $(this).parent().find("td").index($(this));
//            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
//            //alert("第" + (trSeq) + "行，第" + (tdSeq + 1) + "列");
//            if (tdSeq == 0) {
//                var summaryName = summaryData[parseInt(trSeq) + 1].seller_name;
//                var summaryId = summaryData[parseInt(trSeq) + 1].seller_id;
//                console.log(summaryName + "   " + summaryId)
//                $("#detailList").empty();
//                //http://202.114.114.34:8888/yuqing/servlet_detail_information?user_name=%E6%9C%B1%E7%BB%8F%E7%90%86&user_id=48461690
//                $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?user_name=" + summaryName + "&user_id=" + summaryId+"&start_num=1&total_num=10", function (detailRawData) {//初始详细页面数据
//                    $('#detailProgress').hide();
//                    var detailData = JSON.parse(detailRawData);
//                    for (var i = 1; i < detailData.length; i++) {
//                        var a = "<tr><td>" + i + "</td>" +//编号
//                            "<td><img src='../images/" + rd(1, 20).toString() + ".jpg' style='width: 50px;height: 44.5px'></td>" +//图片
//                            "<td>" + detailData[i].seller_location + "</td>" +//区域
//                            "<td>" + detailData[i].seller_name + "</td>" +//卖家姓名
//                            "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//卖家手机号
//                            "<td>" + detailData[i].join_time + "</td>" +//发布日期
//                            "<td>" + convertType(detailData[i].product_type) + "</td>" +//类别
//                            "<td><a href='" + detailData[i].product_url_address + "' target='_blank'>网址</a></td>"//详细信息，网址
//                        $("#detailList").append(a);
//                    }
//                    $("div.detailHolder").jPages({
//                        containerID: "detailList", //存放表格的窗口标签ID
//                        previous: "上一页", //指示首页的按钮
//                        next: "下一页",//指示尾页的按钮
//                        perPage: 8,//每页显示表格的行数
//                        delay: 10 //分页时动画持续时间，0表示无动画
//                    });
//                });
//            }
//        })
//        $("#detailList").empty();
//
//        $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?user_name=%E6%9C%B1%E7%BB%8F%E7%90%86&user_id=48461690&start_num=1&total_num=10", function (detailRawData) {//初始详细页面数据
//            $('#detailProgress').hide();
//            var detailData = JSON.parse(detailRawData);
//            for (var i = 1; i < detailData.length; i++) {
//                var a = "<tr><td>" + i + "</td>" +//编号
//                    "<td><img src='../images/" + rd(1, 20).toString() + ".jpg' style='width: 50px;height: 44.5px'></td>" +//图片
//                    "<td>" + detailData[i].seller_location + "</td>" +//区域
//                    "<td>" + detailData[i].seller_name + "</td>" +//卖家姓名
//                    "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//卖家手机号
//                    "<td>" + detailData[i].product_pub_time + "</td>" +//发布日期
//                    "<td>" + convertType(detailData[i].product_type) + "</td>" +//类别
//                    "<td><a href='" + detailData[i].product_url_address + "' target='_blank'>网址</a></td>"//详细信息，网址
//                $("#detailList").append(a);
//            }
//            $("div.detailHolder").jPages({
//                containerID: "detailList", //存放表格的窗口标签ID
//                previous: "上一页", //指示首页的按钮
//                next: "下一页",//指示尾页的按钮
//                perPage: 8,//每页显示表格的行数
//                delay: 10 //分页时动画持续时间，0表示无动画
//            });
//        });
//    });
//}