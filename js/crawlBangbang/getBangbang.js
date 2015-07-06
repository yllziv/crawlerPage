
//��ʼ��ҳ��
var initDouban = function() {
    $('#shclProgress').shCircleLoader({color:"blue"});
    getSummaryTable("order_type=0");
}



var getInformation = function () {
    var bangbangClass = [];//��վ

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
        alert("����д��ѯ������")
        return;
    }else if(bangbangClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "order_type="+bangbangClass.toString();
    getSummaryTable(canshu);
}

var getSummaryTable = function (canshu) {
    $("#shclProgress").show();
    $.post("http://202.114.114.34:8878/yuqing/servlet_bangbang_information?"+canshu, function (bangbangRawData) {//��Ҫҳ������
        $("#shclProgress").hide();
        $("#bangbangList").empty();
        var bangbangData = JSON.parse(bangbangRawData);
        for (var i = 1; i < bangbangData.length; i++) {
            var bangbangImage = "";

            if(bangbangData[i].bb_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang.jpg";
            }else{
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang/"+ bangbangData[i].bangbang_id +".jpg"
            }

            var bangbangContent = bangbangData[i].bb_content;
            if(bangbangContent.length > 111){
                bangbangContent = bangbangContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].bangbang_title +"</td>" +   //���ű���
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + bangbangContent + "</td>" +   //��������
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

