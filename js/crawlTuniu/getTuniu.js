
//��ʼ��ҳ��
var initDouban = function() {
    getSummaryTable("order_type=0");
}



var orderInformation = function () {
    var tuniuClass = [];//��վ

    if ($("#moren").is(":checked")) {
        tuniuClass.push("0");
    }
    if ($("#goumaicishu").is(":checked")) {
        tuniuClass.push("1");
    }
    if ($("#pingluncishu").is(":checked")) {
        tuniuClass.push("2");
    }
    if (tuniuClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(tuniuClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "order_type="+tuniuClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://localhost:8080/yuqing/servlet_tuniu_information?" + canshu, function (tuniuRawData) {//��Ҫҳ������
        $("#tuniuList").empty();
        var tuniuData = JSON.parse(tuniuRawData);
        for (var i = 1; i < tuniuData.length; i++) {

            //;ţ����
            var tuniuTitle = tuniuData[i].tuniu_title;
            var stastTuniuTile = tuniuTitle.indexOf("<")+1;
            var endTuniuTile = tuniuTitle.indexOf(">");
            tuniuTitle = tuniuTitle.substring(stastTuniuTile,endTuniuTile);


            // ;ţͼƬ
            var tuniuImage = "";
            if(tuniuData[i].tuniu_img_url.length < 20){
                tuniuImage = "http://localhost:8080/temp_imgs/tuniu.jpg";
            }else{
                tuniuImage = "http://localhost:8080/temp_imgs/tuniu/"+ tuniuData[i].tuniu_id +".jpg"
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + tuniuTitle +"</td>" +   //��������
                "<td style='height: 70px'><img src= " + tuniuImage + " style='width: 70px;height: 50px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + tuniuData[i].tuniu_type + "</td>" +   //����
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_place + "</td>" +   //�����ַ
                "<td style='height: 70px;'>" + tuniuData[i].tuniu_opentime + "</td>" +   //���㿪��ʱ��
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_buy_num + "</td>" +   //�������
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + tuniuData[i].tuniu_comment_num + "</td>" +   //���۴���
                "<td style='height: 70px'><a href = '" + tuniuData[i].tuniu_url + "'>����鿴��ϸ��Ϣ</a></td>";    //��ϸ��Ϣ
            $("#tuniuList").append(a);
        }
        //���÷�ҳ
        $("div.activeHolder").jPages({
            containerID: "tuniuList", //��ű��Ĵ��ڱ�ǩID
            previous: "��һҳ", //ָʾ��ҳ�İ�ť
            next: "��һҳ",//ָʾβҳ�İ�ť
            perPage: 12,//ÿҳ��ʾ��������
            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
        });
        //���������к�����Ƴ����е��¼�
        jQuery("#tuniuInfo tr").mouseover(function(){
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

