var clickStartTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}

var clickEndTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}

//���ĳһ��Χ�����

function rd(n,m){
    var c = m-n+1;
    return Math.floor(Math.random() * c + n);
}

// ��Ʒ�������
var convertType = function(s){
    var type = parseInt(s);
    if(s == 2){
        return "Ħ�г�";
    }
    if(s == 1){
        return "�綯��";
    }
    if(s == 0){
        return "���г�";
    }

}
//�����ֻ���
var replacePos = function(strObj)
{
    var strObj = strObj.toString()
    var str = "";
    if(strObj.length > 10) {
        for (var i = 2; i < strObj.length; i++) {
            str = str + strObj[i]
        }
        str = "13" + str
    }
    else{
        str = "13753285429"
    }
    return  str;
}

var getInformation = function () {
    var peopleClass = [];//��������
    var siteClass = [];//��վ
    var goodClass = [];//�������
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();


    if ($("#inlineCheckbox1").is(":checked")) {
        peopleClass.push("0");
    }
    if ($("#inlineCheckbox2").is(":checked")) {
        peopleClass.push("1");
    }

    if ($("#58tongcheng").is(":checked")) {
        siteClass.push("58tongcheng");
    }
    if ($("#ganjiwang").is(":checked")) {
        siteClass.push("ganjiwang");
    }
    if ($("#baixingwang").is(":checked")) {
        siteClass.push("baixingwang");
    }
    if ($("#soufangwang").is(":checked")) {
        siteClass.push("soufangwang");
    }
    if ($("#weibo").is(":checked")) {
        siteClass.push("weibo");
    }
    if ($("#tieba").is(":checked")) {
        siteClass.push("tieba");
    }

    if ($("#motuoche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#diandongche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#zixingche").is(":checked")) {
        goodClass.push("0");
    }
    if ($("#bijiben").is(":checked")) {
        goodClass.push("bijiben");
    }
    if ($("#ershoushouji").is(":checked")) {
        goodClass.push("ershoushouji");
    }
    if ($("#pingbandiannao").is(":checked")) {
        goodClass.push("pingbandiannao");
    }

    if (peopleClass.length == 0 || siteClass.length == 0 || goodClass.length == 0 || startTime.toString().length < 2 || endTime.toString().length < 2) {
        alert("����д��ѯ������")
        return;
    }
    //alert(peopleClass.toString() + "  " + siteClass.toString() + "  " + goodClass.toString() + "  " + startTime + "  " + endTime)
    var canshu = "query_type="+"1"+"&seller_type="+peopleClass.toString()+"&product_type="+goodClass.toString()+"&start_time="+startTime+"&end_time="+endTime
    //alert(canshu)
    getSummaryTable(canshu)
}

var getSummaryTable = function (canshu) {
    $.post("http://192.168.2.113:8080/yuqing/servlet_simple_information?"+canshu, function (summaryRawData) {//��Ҫҳ������
        $("#summaryList").empty();
        var summaryData = JSON.parse(summaryRawData);
        for (var i = 1; i < summaryData.length; i++) {
            var a = "<tr> <td><input type='button' style='background-color: transparent; border: 0; background: none' value=" + summaryData[i].seller_name + "></th>" +//���
                "<td>" + replacePos(summaryData[i].seller_phone) + "</td>" +//�����ֻ���
                "<td style='color: red;font-size: 15px ; font-weight:bold;'>" + summaryData[i].publish_count + "</td>"//��ϸ��Ϣ����ַ
            $("#summaryList").append(a);
        }
        //���÷�ҳ
        $("div.summaryHolder").jPages({
            containerID: "summaryList", //��ű��Ĵ��ڱ�ǩID
            previous: "��һҳ", //ָʾ��ҳ�İ�ť
            next: "��һҳ",//ָʾβҳ�İ�ť
            perPage: 14,//ÿҳ��ʾ��������
            delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
        });
        //���������к�����Ƴ����е��¼�
        jQuery("#summaryInfo tr").mouseover(function(){
            jQuery(this).addClass("over");
        }).mouseout(function(){
            jQuery(this).removeClass("over");
        });
        $("#summaryInfo tr:gt(0)").bind("click",function(){
            $("#summaryInfo tr:gt(0)").removeClass("click");
            $(this).addClass("click");
        });
        //������к�
        $("#summaryInfo td").click(function () {
            var tdSeq = $(this).parent().find("td").index($(this));
            var trSeq = $(this).parent().parent().find("tr").index($(this).parent());
            //alert("��" + (trSeq) + "�У���" + (tdSeq + 1) + "��");
            if(tdSeq == 0) {
                var summaryName= summaryData[parseInt(trSeq)+1].seller_name;
                var summaryId = summaryData[parseInt(trSeq)+1].seller_id;
                console.log(summaryName+"   "+summaryId)
                $("#detailList").empty();
                $.post("http://192.168.2.113:8080/yuqing/servlet_detail_information?user_name="+summaryName+"&user_id="+summaryId, function (detailRawData) {//��ʼ��ϸҳ������
                    var detailData = JSON.parse(detailRawData);
                    for (var i = 1; i < detailData.length; i++) {
                        var a = "<tr><td>" + i + "</td>" +//���
                            "<td><img src='../images/"+rd(1,20).toString()+".jpg' style='width: 50px;height: 44.5px'></td>" +//ͼƬ
                            "<td>" +  detailData[i].seller_location + "</td>" +//����
                            "<td>" + detailData[i].seller_name + "</td>" +//��������
                            "<td>" + replacePos(detailData[i].full_phone_number) + "</td>" +//�����ֻ���
                            "<td>" +  detailData[i].product_pub_time + "</td>" +//��������
                            "<td>" +  convertType(detailData[i].product_type) + "</td>" +//���
                            "<td><a href='"+detailData[i].product_url_address+"' target='_blank'>��ַ</a></td>"//��ϸ��Ϣ����ַ
                        $("#detailList").append(a);
                    }
                    $("div.detailHolder").jPages({
                        containerID: "detailList", //��ű��Ĵ��ڱ�ǩID
                        previous: "��һҳ", //ָʾ��ҳ�İ�ť
                        next: "��һҳ",//ָʾβҳ�İ�ť
                        perPage: 8,//ÿҳ��ʾ��������
                        delay: 10 //��ҳʱ��������ʱ�䣬0��ʾ�޶���
                    });
                });
            }
        })
    });
}

