$(document).ready(function(){
    /**
     * ������������л��������
     */
    var $div_li = $(".topbar li");
    $div_li.click(function(){
        $(this).addClass("selected")            //��ǰ<li>Ԫ�ظ���
            .siblings().removeClass("selected");  //ȥ������ͬ��<li>Ԫ�صĸ���
        var index =  $div_li.index(this)-1;  // ��ȡ��ǰ�����<li>Ԫ�� �� ȫ��liԪ���е�������
        if(index > -1){
            $("tbody:eq("+index+")").show();
            $("tbody:gt("+index+")").hide();
            $("tbody:lt("+index+")").hide();
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

    $("#quyu").change(function(){

     });

    //$.("#remenshangquan")


});
