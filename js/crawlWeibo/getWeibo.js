
//��ʼ��ҳ��
var initDouban = function() {
    getSummaryTable();
}



var getInformation = function () {
    var weiboClass = [];//��վ

    if ($("#all").is(":checked")) {
        weiboClass.push("-1");
    }
    if ($("#yinyue").is(":checked")) {
        weiboClass.push("0");
    }
    if ($("#xiju").is(":checked")) {
        weiboClass.push("1");
    }
    if ($("#jiangzuo").is(":checked")) {
        weiboClass.push("2");
    }
    if ($("#juhui").is(":checked")) {
        weiboClass.push("3");
    }
    if ($("#dianying").is(":checked")) {
        weiboClass.push("4");
    }
    if ($("#zhanlan").is(":checked")) {
        weiboClass.push("5");
    }
    if ($("#yundong").is(":checked")) {
        weiboClass.push("6");
    }
    if ($("#gongyi").is(":checked")) {
        weiboClass.push("7");
    }
    if ($("#lvyou").is(":checked")) {
        weiboClass.push("8");
    }
    if ($("#qita").is(":checked")) {
        weiboClass.push("9");
    }

    if (weiboClass.length == 0) {
        alert("����д��ѯ������")
        return;
    }else if(weiboClass.length > 1) {
        alert("����дһ�����")
        return;
    }
    var canshu = "douban_type="+weiboClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function () {
    $.post("http://localhost:8080/yuqing/servlet_weibo_information", function (weiboRawData) {//��Ҫҳ������
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
            var a =
                "<tr></tr><td style='height: 70px'>" + weiboData[i].weibo_title +"</td>" +   //΢������
                "<td style='height: 70px'><img src= " + weiboImage + " style='width: 70px;height: 50px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + weiboData[i].weibo_content + "</td>" +   //΢������
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

