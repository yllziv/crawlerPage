
//��ʼ��ҳ��
var initDouban = function() {
    getSummaryTable("order_type=0");
}



var getInformation = function () {
    var weiboClass = [];//��վ

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
        alert("����д��ѯ������")
        return;
    }else if(weiboClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "order_type="+weiboClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://localhost:8080/yuqing/servlet_weibo_information?"+canshu, function (weiboRawData) {//��Ҫҳ������
        $("#weiboList").empty();
        var weiboData = JSON.parse(weiboRawData);
        for (var i = 1; i < weiboData.length; i++) {
            var weiboImage = "";
            var weiboTitle = "";
            if(weiboData[i].image_url.length < 2){
                weiboImage = "http://localhost:8080/temp_imgs/weibo.jpg";
            }else{
                weiboImage = "http://localhost:8080/temp_imgs/weibo/"+ weiboData[i].weibo_id +".jpg"
            }
            if(weiboData[i].weibo_title.length < 2 &&weiboData[i].weibo_content.length > 21){
                weiboData[i].weibo_title = weiboData[i].weibo_content.substring(0,20)
            }
            var weiboContent = weiboData[i].weibo_content;
            if(weiboContent.length > 111){
                weiboContent = weiboContent.substr(0,110)
            }

            var a =
                "<tr></tr><td style='height: 70px'>" + weiboData[i].weibo_title +"</td>" +   //΢������
                "<td style='height: 70px'><img src= " + weiboImage + " style='width: 70px;height: 50px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + weiboContent + "</td>" +   //΢������
                "<td style='height: 70px'>" + "2015��"+ weiboData[i].pub_time.month+"��"+
                + weiboData[i].pub_time.day+"��"+ weiboData[i].pub_time.hours+"ʱ"+
                + weiboData[i].pub_time.minutes+"��"+ weiboData[i].pub_time.seconds+"��"+"</td>" +   //����ʱ��
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].comment_number + "</td>" +   //��������
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].relay_number + "</td>" +   //ת������
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + weiboData[i].support_number + "</td>";    //��������
            $("#weiboList").append(a);
        }
        //���÷�ҳ
        $("div.activeHolder").jPages({
            containerID: "weiboList", //��ű��Ĵ��ڱ�ǩID
            previous: "��һҳ", //ָʾ��ҳ�İ�ť
            next: "��һҳ",//ָʾβҳ�İ�ť
            perPage: 12,//ÿҳ��ʾ��������
            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
        });
        //���������к�����Ƴ����е��¼�
        jQuery("#weiboInfo tr").mouseover(function(){
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

