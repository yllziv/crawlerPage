// ����
//q_source
//58ͬ�ǣ�0
//��������1
//�ϼ�����2
//�����г���3
//�Ա����֣�4
// ���6
//���ر���5
//����ͬ�ǣ�7
//��������8
//����΢����9
//����ͷ����10
//;ţ����11
//�������Σ�12
//�������13
//
//
//q_topicType  ������n
//δ���� 0
//���� 1
//���� 2
//��Ա 3
//���� 4
//���� 5
//��� 6
//���� 7
// ��ȡ������
// tp://202.114.114.34:8878/yuqing/servlet_query_total_records?topic_type=0
//
//
//q_source_category ������
//��������  4
//���� 6
//������� 1
//�ݳ�� 5
//¥������ 2
//�̳����� 3
//���߷��� 7



var perPageNum = 6;     //ÿҳ��ʾ������
var topicType = 0;
var sampleLoc = "��ɽ��";
var detailleLoc = "���";
var startTime = "2015-5-14";
var endTime = "2015-6-15";
var whichType = true; // Ĭ���Ǵ�����˵���ѡ��ͬ���false��ʾ��ѯ

var clickStartTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}

var clickEndTime = function () {
    laydate({istime: true, format: 'YYYY-MM-DD'})

}
function getInformation(){
    whichType = false;
    startTime = $("#startTime").val();
    endTime = $("#endTime").val();
    sampleLoc = $("#quyu").find("option:selected").text();
    detailleLoc = $("#remenshangquan").find("option:selected").text();
    var sourcetype = $("#sourcetype").find("option:selected").index();
    topicType = sourcetype;
    var canshu = "topic_type="+topicType+"&start_num=0&total_num="+perPageNum+"&start_date="+startTime+"&end_date="+endTime+"&location="+sampleLoc+"&detail_location="+detailleLoc;
    $.post("http://202.114.114.34:8878/yuqing/servlet_query_by_condition?"+canshu, function (bangbangRawData) {//��Ҫҳ������
        var bangbangData = JSON.parse(bangbangRawData);
        allPageNum = parseInt(bangbangData[1].count_num/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0],allPageNum,1);
    });
    getSummaryTable(topicType,canshu);
}


function init(){
    whichType = true;
    //����ҳ��
    $('#shclProgress').shCircleLoader({color:"blue"});

    //��ʼ��ҳ�棬 δ����
    $.post("http://202.114.114.34:8878/yuqing/servlet_query_total_records?topic_type=0", function (allSimplePageNum) {//��Ҫҳ������
        allSimplePageNum = parseInt(allSimplePageNum.substring(1,allSimplePageNum.length-1));
        var allPageNum = parseInt(allSimplePageNum/perPageNum)+1
        setPage(document.getElementsByClassName("activeHolder")[0], allPageNum, 1);
        topicType = 0;
        getSummaryTable(topicType,"topic_type="+topicType+"&start_num=0&total_num="+perPageNum);
    });


    /**
     * ������������л��������
     */
    var $div_li = $(".topbar li");
    $div_li.click(function(){
        whichType =true;
        $(this).addClass("selected")            //��ǰ<li>Ԫ�ظ���
            .siblings().removeClass("selected");  //ȥ������ͬ��<li>Ԫ�صĸ���
        var index =  $div_li.index(this)-1;  // ��ȡ��ǰ�����<li>Ԫ�� �� ȫ��liԪ���е�������
        topicType = index;
        if(index > -1){
            $("tbody:eq("+index+")").show();
            $("tbody:gt("+index+")").hide();
            $("tbody:lt("+index+")").hide();
            $.post("http://202.114.114.34:8878/yuqing/servlet_query_total_records?topic_type="+topicType, function (allSimplePageNum) {//��Ҫҳ������
                allSimplePageNum = parseInt(allSimplePageNum.substring(1, allSimplePageNum.length - 1));
                var allPageNum = parseInt(allSimplePageNum / perPageNum) + 1
                setPage(document.getElementsByClassName("activeHolder")[0], allPageNum, 1);
                getSummaryTable(topicType, "topic_type=" + topicType + "&start_num=0&total_num=" + perPageNum);
            });
        }
    })
    /**
     * ���ݹ���
     */
    $("#filterName").keyup(function(){
        $("table tbody tr")
            .hide()
            .filter(":contains('"+( $(this).val() )+"')")
            .show();
    }).keyup();

    $("#filterName").focus(function(){
        $(this).addClass("focus");
        if($(this).val() ==this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });

    $("#quyu").change(function(){

        /**
         * ������Ȧ
         */
        var hongshanqu = // ��ɽ��
            ["ȫ��,�Ϻ�,���,�������¼���������,�������¼���,�㲺��,��Ȫ,�ֵ���,³��,������,�ƼҺ���ѧ��,�춫���,��ɳ��,��ȴ�ҵ��,ʯ����"];
        var wuchangqu = // �����
            ["ȫ��,˾�ſ�,�춫��Ʒï,������,�ֵ���,������,������ѧ,����,����,�춫���,������,����,��ɽ�㳡,ˮ����,�����վ,��ɽ��ó,ʯ����,����,С����"];
        var jianghanqu = // ������
            ["ȫ��,����·�¼����㳡,����·�¼���,����·���н�,��Ǻ�,����·,������,�人�㳡,���·,���ڻ�վ,��������԰,�»�·,��԰,����·,�����������·,��ɽ���������·,��ɽ�������,��̲,�ؽ�һ��,������,���Ҷ�"];
        var jiangxiaqu = // ������
            ["ȫ��,������,����,���Ӻ�,��ɽ,ֽ��"];
        var jianganqu = // ������
            ["ȫ��,����·���н�,����·,����,���,�Ͼ�·,̨��·,��Ҷɽ,���·,�ٲ�ͤ,����·,����·,�򳡽�,ѭ����,�人���,��Ź�԰,����·,���˸�,֪��ѧԺ"];
        var hanyangqu = // ������
            ["ȫ��,���,������,�ӼҴ�,īˮ��,��̨���,�������,���Ĵ��,��̨,��·��"];
        var qingshanqu = // ��ɽ��
            ["ȫ��,��ɽ,�ֶ���԰,��ҵ·,��ֳ�,�ظ�·,���ִ��,�ʺ�·,����,�˴��,����,���ֻ�԰,��ֳ���,�䶫,�人��վ,���,���ͷ,������"];
        var qiaokouqu = // �~����
            ["ȫ��,����·,����,�~��·,��ʤ·���¹㳡,��Ŵ������·,����·,����·,��ʤ·,����·"];
        var dongxihuqu = //��������
            ["ȫ��,������"];
        var huangpiqu = // ������
            ["ȫ��,����"];
        var xinzhouqu = //������
            ["ȫ��,����Ժ,����ѧԺ,���߽���,ۥ�ǽ� "];
        var caidianqu = //�̵���
            ["ȫ��,�̵�"];
        var hannanqu = //������
            ["ȫ��,����"];
        var qita = // ����
            ["����"];
        var remenshangquan = [hongshanqu,wuchangqu,jianghanqu,jiangxiaqu,jianganqu,hanyangqu,qingshanqu,qiaokouqu,dongxihuqu,huangpiqu,xinzhouqu,caidianqu,hannanqu,qita];

        selectText = $("#quyu").find("option:selected").text();
        switch(selectText){
            case "��ɽ��":
                getList(hongshanqu);
                break;
            case "�����":
                getList(hongshanqu);
                break;
            case "������":
                getList(jianghanqu);
                break;
            case "������":
                getList(jiangxiaqu);
                break;
            case "������":
                getList(jianganqu);
                break;
            case "������":
                getList(hanyangqu);
                break;
            case "��ɽ��":
                getList(qingshanqu);
                break;
            case "�~����":
                getList(qiaokouqu);
                break;
            case "��������":
                getList(dongxihuqu);
                break;
            case "������":
                getList(huangpiqu);
                break;
            case "������":
                getList(xinzhouqu);
                break;
            case "�̵���":
                getList(caidianqu);
                break;
            case "������":
                getList(hannanqu);
                break;
            case "����":
                getList(qita);
                break;

        }
    });


}


function getList(listArray) {
    listArray = listArray[0].toString().split(",")
    $("#remenshangquan").empty();

    for(var i = 0; i < listArray.length; i++){
        $("#remenshangquan").append("<option value='Value'>"+listArray[i]+"</option>");
    }
}


function getSummaryTable(topicType,canshu) {
    var listTypeArray = ["δ����","����","����","��Ա","����","����","���","����"];
    var didian = ["�����","������","������","������","��ɽ��","�~����","������","��ɽ��","������","��������","����"]
    var listtypeArray = ["weifenlei","anjian","minsheng","renyuan","fuwu","guanli","shehui","xiaozang"];
    $("#"+listtypeArray[topicType]).html("");
    $("#shclProgress").show();
    var url = "";
    if(whichType) { // ����˵�
        url = "http://202.114.114.34:8878/yuqing/servlet_query_by_topic?" + canshu;
    }else{ // ��ѯ
        url = "http://202.114.114.34:8878/yuqing/servlet_query_by_condition?" + canshu;
    }
    $.post(url, function (bangbangRawData) {
        //alert(url)
        $("#shclProgress").hide();
            //����li��ɫ
        $(".topbar a").css("color","black");
        $(".topbar a:eq("+topicType+")").css("color","blue");
        $("#bangbangList").empty();
        var bangbangData = JSON.parse(bangbangRawData);
        var bangbangImage = "";


        for (var i = 0; i < bangbangData.length; i++) {
            if(bangbangData[i].q_img_url.length < 10){
                bangbangImage = "http://202.114.114.34:8878/temp_imgs/weibo.jpg";
            }else{
                bangbangImage = bangbangData[i].q_img_url
            }

            var bangbangContent = bangbangData[i].q_content;
            if(bangbangContent.length > 111){
                bangbangContent = bangbangContent.substr(0,110)
            }

            var sourcePage = "";
            switch (bangbangData[i].q_source){
                case 0:sourcePage = "58ͬ��";break;
                case 1:sourcePage = "������";break;
                case 2:sourcePage = "�ϼ���";break;
                case 3:sourcePage = "�����г�";break;
                case 4:sourcePage = "�Ա�����";break;
                case 5:sourcePage = "��������";break;
                case 6:sourcePage = "���ر�";break;
                case 7:sourcePage = "����ͬ��";break;
                case 8:sourcePage = "������";break;
                case 9:sourcePage = "����΢��";break;
                case 10:sourcePage = "����ͷ��";break;
                case 11:sourcePage = ";ţ��";break;
                case 12:sourcePage = "��������";break;
                case 13:sourcePage = "�����";break;
            }
            var a =
                "<tr></tr><td style='height: 70px'>" + bangbangData[i].q_title +"</td>" +   //���ű���
                "<td style='height: 70px'><img src= " + bangbangImage + " style='width: 50px;height: 44.5px'></td>" +   //ͼƬ
                "<td style='height: 70px'>" + bangbangContent + "</td>" +   //��������
                "<td style='height: 70px'>" + bangbangData[i].q_pubTime+ "</td>" +   //����ʱ��
                "<td style='height: 70px'>" + didian[parseInt(10*Math.random())]+ "</td>" +   //�ص�
                "<td style='height: 70px'>" + sourcePage + "</td>" +   //��Դ
                "<td style='height: 70px;color: red;font-size: 15px ; font-weight:bold;'>" + bangbangData[i].q_focus_num + "</td>" +   //��ע��
                "<td style='height: 70px'><a target='_blank' href = '" + "'>����鿴����</a></td>" +    //����
                "<td style='height: 70px'>" + listTypeArray[bangbangData[i].q_topicType] + "</td>" +   //���
                "<td style='height: 70px'><select class='changeSelect' style='width:60px;height:20px;'><option>����</option>" +
                "<option>����</option><option>��Ա</option><option>����</option><option>����</option>" +
                "<option>���</option></select><button class='changeType'>ȷ��</button></td>"+ //�ƶ���
                "<td style='height: 70px;display: none' >" + bangbangData[i].q_source_category + "</td>" +   //������q_source_category
                "<td style='height: 70px;display: none' >" + bangbangData[i].q_id + "</td>" ;   //id
            $("#"+listtypeArray[topicType]).append(a);
        }

        $(".changeSelect").change(function(){//select�仯�¼�
        });

        $(".changeType").click(function(e){//ȷ����ť�¼�
            var oldTyep = $(e.target).parent().next().text();
            var newType = $(e.target).prev().find("option:selected").index()+1;
            var id      = $(e.target).parent().next().next().text();
            $.post("http://202.114.114.34:8878/yuqing/servlet_query_change_topic?id="+id+"&source_type="+oldTyep+"&new_type="+newType,function(data){
                console.log(data.toString())
                if(data.toString() == "[true]"){
                    $(e.target).parent().parent().hide();
                    //$(e.target).parent().prev().text(listTypeArray[parseInt(newType)]);
                }
            })


        });
        //���������к�����Ƴ����е��¼�
        jQuery("#weiboInfo tr:gt(0)").mouseover(function(){
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


function updatePage(inx){
    getSummaryTable(topicType,"topic_type="+topicType+"&start_num="+((inx-1)*perPageNum+1).toString()+"&total_num="+perPageNum+"&start_date="+startTime+"&end_date="+endTime+"&location="+sampleLoc+"&detail_location="+detailleLoc);
}

//container ������count ��ҳ�� pageindex ��ǰҳ��
function setPage(container, count, pageindex) {
    var container = container;
    var count = count;
    var pageindex = pageindex;
    var a = [];
    //��ҳ������10 ȫ����ʾ,����10 ��ʾǰ3 ��3 �м�3 ����....
    if (pageindex == 1) {
        a[a.length] = "<a href=\"#\" class=\"prev unclick\">��һҳ</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"prev\">��һҳ</a>";
    }
    function setPageList() {
        if (pageindex == i) {
            a[a.length] = "<a href=\"#\" class=\"on\">" + i + "</a>";
        } else {
            a[a.length] = "<a href=\"#\">" + i + "</a>";
        }
    }
    //��ҳ��С��10
    if (count <= 10) {
        for (var i = 1; i <= count; i++) {
            setPageList();
        }
    }
    //��ҳ������10ҳ
    else {
        if (pageindex <= 4) {
            for (var i = 1; i <= 5; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        } else if (pageindex >= count - 3) {
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = count - 4; i <= count; i++) {
                setPageList();
            }
        }
        else { //��ǰҳ���м䲿��
            a[a.length] = "<a href=\"#\">1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
                setPageList();
            }
            a[a.length] = "...<a href=\"#\">" + count + "</a>";
        }
    }
    if (pageindex == count) {
        a[a.length] = "<a href=\"#\" class=\"next unclick\">��һҳ</a>";
    } else {
        a[a.length] = "<a href=\"#\" class=\"next\">��һҳ</a>";
    }
    container.innerHTML = a.join("");
    //�¼����
    var pageClick = function() {
        var oAlink = container.getElementsByTagName("a");
        var inx = pageindex; //��ʼ��ҳ��
        oAlink[0].onclick = function() { //�����һҳ
            if (inx == 1) {
                return false;
            }
            inx--;
            setPage(container, count, inx);
            updatePage(inx)
            return false;
        }
        for (var i = 1; i < oAlink.length - 1; i++) { //���ҳ��
            oAlink[i].onclick = function() {
                inx = parseInt(this.innerHTML);
                setPage(container, count, inx);
                updatePage(inx)
                return false;
            }
        }
        oAlink[oAlink.length - 1].onclick = function() { //�����һҳ
            if (inx == count) {
                return false;
            }
            inx++;
            setPage(container, count, inx);
            updatePage(inx);
            return false;
        }
    } ()
}