var initCoolPicture = function () {

    getSummaryTable("douban_type=-1&order_type=0");}


var getInformation = function () {
    var activeClass = [];//��վ

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
        alert("����д��ѯ������")
        return;
    }else if(activeClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var oderType = [];//����ʽ
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
        alert("����д��ѯ������")
        return;
    }else if(oderType.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "douban_type="+activeClass.toString()+"&order_type="+oderType.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://localhost:8080/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//��Ҫҳ������
        $("#coolPicture").empty();
        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length / 6-1; i++) {
            var tableString = "<tr>";
            for (var j = 0; j < 5; j++) {
                if(activeData[i + j].douban_title.length >15 ){
                    activeData[i + j].douban_title  = activeData[i + j].douban_title.substring(0,15);
                }
                if(activeData[i + j].douban_date.length >15 ){
                    activeData[i + j].douban_date  = activeData[i + j].douban_date.substring(0,15);
                }
                if(activeData[i + j].douban_pos.length >15 ){
                    activeData[i + j].douban_pos  = activeData[i + j].douban_pos.substring(0,15);
                }
                tableString += "<td><LI class='brand_item'><A class='brand_detail' href='#' >" +
                    "<IMG src='" + "http://localhost:8080/temp_imgs/douban/"+activeData[i*6 + j].douban_id+".jpg" + "' style='width:148px; height:210px;'/>" + //ͼƬ
                    "<h5 style='padding-top: 3px ;color: black'>" + activeData[i + j].douban_title + "</h5></A><A class='brand_name' " + //����
                    "href='" + activeData[i + j].douban_url + "' target='_blank'><table class='table table-bordered' style='color: black;background-color: #c4e3f3'><tbody><tr><td style='font-size: 15px ; font-weight:bold;'>" +
                    "" + activeData[i + j].douban_title + "</td></tr><tr><td style='font-size: 10px'>" +
                    "�ص㣺" + activeData[i + j].douban_pos + "</td></tr><tr><td style='font-size: 10px'>" + //���ַ
                    "ʱ�䣺" + activeData[i + j].douban_date + "</td></tr><tr><td style='color: red;font-size: 15px ; font-weight:bold;'>" +//�ʱ��
                    "" + activeData[i + j].douban_interest_times + "�˸���Ȥ</td></tr><tr><td style='color: red;font-size: 15px ; font-weight:bold;'>" +
                    "" + activeData[i + j].douban_join_times + "����μ�</td></tr></tbody></table></A></LI></td>";
            }
            $("#coolPicture").append(tableString);
        }
            $(document).ready(function () {
        $(".brand_detail").hide();
        $(".brand_item").hover(
            function () {
                $(this).children(".brand_name").hide();
                $(this).children(".brand_detail").show();
            }
            , function () {
                $(this).children(".brand_detail").hide();
                $(this).children(".brand_name").show();
            }
        );
    });
    //���÷�ҳ
    $("#coolPage").jPages({
        containerID: "coolPicture", //��ű��Ĵ��ڱ�ǩID
        previous: "��һҳ", //ָʾ��ҳ�İ�ť
        next: "��һҳ",//ָʾβҳ�İ�ť
        perPage: 2,//ÿҳ��ʾ��������
        delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
    });
    });
}
