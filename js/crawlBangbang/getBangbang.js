
//��ʼ��ҳ��
var initDouban = function() {
    getSummaryTable();
}



var getInformation = function () {
    var bangbangClass = [];//��վ

    if ($("#all").is(":checked")) {
        bangbangClass.push("-1");
    }
    if ($("#yinyue").is(":checked")) {
        bangbangClass.push("0");
    }
    if ($("#xiju").is(":checked")) {
        bangbangClass.push("1");
    }
    if ($("#jiangzuo").is(":checked")) {
        bangbangClass.push("2");
    }
    if ($("#juhui").is(":checked")) {
        bangbangClass.push("3");
    }
    if ($("#dianying").is(":checked")) {
        bangbangClass.push("4");
    }
    if ($("#zhanlan").is(":checked")) {
        bangbangClass.push("5");
    }
    if ($("#yundong").is(":checked")) {
        bangbangClass.push("6");
    }
    if ($("#gongyi").is(":checked")) {
        bangbangClass.push("7");
    }
    if ($("#lvyou").is(":checked")) {
        bangbangClass.push("8");
    }
    if ($("#qita").is(":checked")) {
        bangbangClass.push("9");
    }

    if (bangbangClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(bangbangClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "douban_type="+bangbangClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function () {
    $.post("http://localhost:8080/yuqing/servlet_bangbang_information", function (bangbangRawData) {//��Ҫҳ������
        $("#bangbangList").empty();
        var bangbangData = JSON.parse(bangbangRawData);
        for (var i = 1; i < bangbangData.length; i++) {
            var bangbangImage = "";

            if(bangbangData[i].bb_img_url.length < 2){
                bangbangImage = "http://localhost:8080/temp_imgs/bangbang.jpg";
            }else{
                bangbangImage = "http://localhost:8080/temp_imgs/bangbang/"+ bangbangData[i].bangbang_id +".jpg"
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].bangbang_title +"</td>" +   //���ű���
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + bangbangData[i].bb_content + "</td>" +   //��������
                "<td style='height: 70px'>" + "2015��"+ bangbangData[i].bb_pub_time.month+"��"+
                + bangbangData[i].bb_pub_time.day+"��"+ bangbangData[i].bb_pub_time.hours+"ʱ"+
                + bangbangData[i].bb_pub_time.minutes+"��"+ bangbangData[i].bb_pub_time.seconds+"��"+"</td>" +   //����ʱ��
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_read_times + "</td>" +   //�Ķ�����
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].bb_response_times + "</td>" +   //���۴���
                "<td style='height: 70px'><a href = '" + bangbangData[i].bb_img_url + "'>����鿴��ϸ��Ϣ</a></td>";    //��ϸ��Ϣ
            $("#bangbangList").append(a);
        }
        //���÷�ҳ
        $("div.activeHolder").jPages({
            containerID: "bangbangList", //��ű��Ĵ��ڱ�ǩID
            previous: "��һҳ", //ָʾ��ҳ�İ�ť
            next: "��һҳ",//ָʾβҳ�İ�ť
            perPage: 10,//ÿҳ��ʾ��������
            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
        });
        //���������к�����Ƴ����е��¼�
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

