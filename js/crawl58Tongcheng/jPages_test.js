////��ʼ��ҳ��
////$("#detailList").ajaxStop(function(){
////    alert("���� AJAX ���������");
////});
//function init() {
//    $('#shclProgress').show();
//    $('#detailProgress').hide();
//    //����ҳ��
//    $('#detailProgress').shCircleLoader({color: "blue"});
//    $('#shclProgress').shCircleLoader({color: "blue"});
//
//    $.post("http://202.114.114.34:8878/yuqing/servlet_simple_information?query_type=1&seller_type=1&product_type=3&start_time=2015-5-10&end_time=2015-6-15&start_num=1&total_num=80", function (summaryRawData) {//��Ҫҳ������
//        $('#shclProgress').hide();
//        $("#summaryList").empty();
//        var summaryData = JSON.parse(summaryRawData);
//        for (var i = 1; i < summaryData.length; i++) {
//            var a = "<tr> <td><input type='button' style='background-color: transparent; border: 0; background: none' value=" + summaryData[i].seller_name + "></th>" +//���
//                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//�����ֻ���
//                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//��ϸ��Ϣ����ַ
//            $("#summaryList").append(a);
//        }
//        //���÷�ҳ
//        $("div.summaryHolder").jPages({
//            containerID: "summaryList", //��ű��Ĵ��ڱ�ǩID
//            previous: "��һҳ", //ָʾ��ҳ�İ�ť
//            next: "��һҳ",//ָʾβҳ�İ�ť
//            perPage: 11,//ÿҳ��ʾ��������
//            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
//        });
//        //���������к�����Ƴ����е��¼�
//        jQuery("#summaryInfo tr").mouseover(function () {
//            jQuery(this).addClass("over");
//        }).mouseout(function () {
//            jQuery(this).removeClass("over");
//        });
//        $("#summaryInfo tr:gt(0)").bind("click", function () {
//            $("#summaryInfo tr:gt(0)").removeClass("click");
//            $(this).addClass("click");
//        });
//        //������к�
//        $("#summaryInfo td").click(function () {
//            $('#detailProgress').show();
//            var tdSeq = $(this).parent().find("td").index($(this));
//            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
//            //alert("��" + (trSeq) + "�У���" + (tdSeq + 1) + "��");
//            if (tdSeq == 0) {
//                var summaryName = summaryData[parseInt(trSeq) + 1].seller_name;
//                var summaryId = summaryData[parseInt(trSeq) + 1].seller_id;
//                console.log(summaryName + "   " + summaryId)
//                $("#detailList").empty();
//                //http://202.114.114.34:8888/yuqing/servlet_detail_information?user_name=%E6%9C%B1%E7%BB%8F%E7%90%86&user_id=48461690
//                $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?user_name=" + summaryName + "&user_id=" + summaryId+"&start_num=1&total_num=10", function (detailRawData) {//��ʼ��ϸҳ������
//                    $('#detailProgress').hide();
//                    var detailData = JSON.parse(detailRawData);
//                    for (var i = 1; i < detailData.length; i++) {
//                        var a = "<tr><td>" + i + "</td>" +//���
//                            "<td><img src='../images/" + rd(1, 20).toString() + ".jpg' style='width: 50px;height: 44.5px'></td>" +//ͼƬ
//                            "<td>" + detailData[i].seller_location + "</td>" +//����
//                            "<td>" + detailData[i].seller_name + "</td>" +//��������
//                            "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//�����ֻ���
//                            "<td>" + detailData[i].join_time + "</td>" +//��������
//                            "<td>" + convertType(detailData[i].product_type) + "</td>" +//���
//                            "<td><a href='" + detailData[i].product_url_address + "' target='_blank'>��ַ</a></td>"//��ϸ��Ϣ����ַ
//                        $("#detailList").append(a);
//                    }
//                    $("div.detailHolder").jPages({
//                        containerID: "detailList", //��ű��Ĵ��ڱ�ǩID
//                        previous: "��һҳ", //ָʾ��ҳ�İ�ť
//                        next: "��һҳ",//ָʾβҳ�İ�ť
//                        perPage: 8,//ÿҳ��ʾ��������
//                        delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
//                    });
//                });
//            }
//        })
//        $("#detailList").empty();
//
//        $.post("http://202.114.114.34:8878/yuqing/servlet_detail_information?user_name=%E6%9C%B1%E7%BB%8F%E7%90%86&user_id=48461690&start_num=1&total_num=10", function (detailRawData) {//��ʼ��ϸҳ������
//            $('#detailProgress').hide();
//            var detailData = JSON.parse(detailRawData);
//            for (var i = 1; i < detailData.length; i++) {
//                var a = "<tr><td>" + i + "</td>" +//���
//                    "<td><img src='../images/" + rd(1, 20).toString() + ".jpg' style='width: 50px;height: 44.5px'></td>" +//ͼƬ
//                    "<td>" + detailData[i].seller_location + "</td>" +//����
//                    "<td>" + detailData[i].seller_name + "</td>" +//��������
//                    "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//�����ֻ���
//                    "<td>" + detailData[i].product_pub_time + "</td>" +//��������
//                    "<td>" + convertType(detailData[i].product_type) + "</td>" +//���
//                    "<td><a href='" + detailData[i].product_url_address + "' target='_blank'>��ַ</a></td>"//��ϸ��Ϣ����ַ
//                $("#detailList").append(a);
//            }
//            $("div.detailHolder").jPages({
//                containerID: "detailList", //��ű��Ĵ��ڱ�ǩID
//                previous: "��һҳ", //ָʾ��ҳ�İ�ť
//                next: "��һҳ",//ָʾβҳ�İ�ť
//                perPage: 8,//ÿҳ��ʾ��������
//                delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
//            });
//        });
//    });
//}