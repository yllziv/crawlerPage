
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
    $.post("http://202.114.114.34:8878/yuqing/servlet_house_information?"+canshu, function (fangwuRawData) {//��Ҫҳ������
        $("#shclProgress").hide();
        $("#bangbangList").empty();
        var fangwuData = JSON.parse(fangwuRawData);

        for (var i = 1; i < fangwuData.length; i++) {
            var bangbangImage = "";

            //if(fangwuData[i].bb_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang.jpg";
            //}else{
            //    bangbangImage = "http://202.114.114.34:8878/temp_imgs/bangbang/"+ fangwuData[i].house_id +".jpg"
            //}

            var fangwuContent = fangwuData[i].house_newmessage;
            if(fangwuContent.length > 111){
                fangwuContent = fangwuContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + fangwuData[i].house_title +"</td>" +   //������Ϣ����
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + fangwuContent + "</td>" +   //������Ϣ
                "<td style='height: 70px'>" + fangwuData[i].house_price + "</td>" +   //���ݼ۸�
                "<td style='height: 70px;'>" + fangwuData[i].house_place + "</td>" +   //���ݵ�ַ
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + fangwuData[i].kiapantime_start + "</td>" +   //����ʱ��
                "<td style='height: 70px;'>" + fangwuData[i].house_telephone + "</td>" +   //��ϵ�绰
                "<td style='height: 70px'><a target='_blank' href = '" + fangwuData[i].house_url + "'>����鿴��ϸ��Ϣ</a></td>";    //��ϸ��Ϣ
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

