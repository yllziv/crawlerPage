
//��ʼ��ҳ��
var initDouban = function() {
    getSummaryTable("douban_type=-1");
}
//���ĳһ��Χ�����
function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}


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
    var canshu = "douban_type="+activeClass.toString();
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://192.168.2.113:8080/yuqing/servlet_douban_information?" + canshu, function (activeRawData) {//��Ҫҳ������
        $("#activeList").empty();
        var activeData = JSON.parse(activeRawData);
        for (var i = 1; i < activeData.length; i++) {
            var a =
                "<tr></tr><td style='height: 70px'>" + activeData[i].douban_id +"</td>" +   //ID
                "<td style='height: 70px'><img src= " + activeData[i].douban_img + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + activeData[i].douban_title + "</td>" +   //����
                "<td style='height: 70px'>" + activeData[i].douban_date + "</td>" +   //�ʱ��
                "<td style='height: 70px'>" + activeData[i].douban_pos + "</td>" +   //���ַ
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_interest_times + "</td>" +   //����Ȥ����
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + activeData[i].douban_join_times + "</td>" +   //�μ�����
                "<td style='height: 70px'><a href='"+ activeData[i].douban_url +"' target='_blank'>��ַ</a></td>";    //��ַ
            $("#activeList").append(a);
        }
        //���÷�ҳ
        $("div.activeHolder").jPages({
            containerID: "activeList", //��ű��Ĵ��ڱ�ǩID
            previous: "��һҳ", //ָʾ��ҳ�İ�ť
            next: "��һҳ",//ָʾβҳ�İ�ť
            perPage: 12,//ÿҳ��ʾ��������
            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
        });
        //���������к�����Ƴ����е��¼�
        jQuery("#activeInfo tr").mouseover(function(){
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

