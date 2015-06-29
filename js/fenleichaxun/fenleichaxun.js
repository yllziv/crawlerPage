$(document).ready(function(){
    /**
     * 点击导航栏，切换表格内容
     */
    var $div_li = $(".topbar li");
    $div_li.click(function(){
        $(this).addClass("selected")            //当前<li>元素高亮
            .siblings().removeClass("selected");  //去掉其它同辈<li>元素的高亮
        var index =  $div_li.index(this)-1;  // 获取当前点击的<li>元素 在 全部li元素中的索引。
        if(index > -1){
            $("tbody:eq("+index+")").show();
            $("tbody:gt("+index+")").hide();
            $("tbody:lt("+index+")").hide();
        }
    })
    /**
     * 内容过滤
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
     * 热门商圈
     */
    var hongshanqu = // 洪山区
        ["全部,南湖,光谷,东湖高新技术开发区,东湖高新技术,广埠屯,虎泉,街道口,鲁巷,东湖区,黄家湖大学城,徐东大街,白沙洲,光谷创业街,石牌岭"];
    var wuchangqu = // 武昌区
        ["全部,司门口,徐东销品茂,积玉桥,街道口,东湖区,湖北大学,阅马场,汉街,徐东大街,丁字桥,中南,洪山广场,水果湖,武昌火车站,洪山亚贸,石牌岭,大东门,小东门"];
    var jianghanqu = // 江汉区
        ["全部,江汉路新佳丽广场,江汉路新佳丽,江汉路步行街,菱角湖,常青路,西北湖,武汉广场,香港路,汉口火车站,新民众乐园,新华路,西园,青年路,京汉大道友谊路,中山大道友谊南路,中山大道友谊,江滩,沿江一号,六渡桥,王家墩"];
    var jiangxiaqu = // 江夏区
        ["全部,藏龙岛,大花岭,梁子湖,庙山,纸坊"];
    var jianganqu = // 江岸区
        ["全部,江汉路步行街,大智路,二七,后湖,南京路,台北路,竹叶山,香港路,百步亭,三阳路,黄浦路,球场街,循礼门,武汉天地,解放公园,澳门路,客运港,知行学院"];
    var hanyangqu = // 汉阳区
        ["全部,沌口,王家湾,钟家村,墨水湖,琴台大道,汉阳大道,鹦鹉大道,琴台,腰路堤"];
    var qingshanqu = // 青山区
        ["全部,奥山,钢都花园,工业路,红钢城,沿港路,欢乐大道,仁和路,建二,八大家,铁机,柴林花园,武钢厂区,武东,武汉火车站,杨春湖,余家头,四美塘"];
    var qiaokouqu = // 硚口区
        ["全部,古田路,汉西,硚口路,武胜路凯德广场,解放大道航空路,崇仁路,利济路,武胜路,游艺路"];
    var dongxihuqu = //东西湖区
        ["全部,东西湖"];
    var huangpiqu = // 黄陂区
        ["全部,黄陂"];
    var xinzhouqu = //新洲区
        ["全部,武生院,工程学院,阳逻街区,邾城街 "];
    var caidianqu = //蔡甸区
        ["全部,蔡甸"];
    var hannanqu = //汉南区
        ["全部,汉南"];
    var qita = // 其他
        ["其他"];
    var remenshangquan = [hongshanqu,wuchangqu,jianghanqu,jiangxiaqu,jianganqu,hanyangqu,qingshanqu,qiaokouqu,dongxihuqu,huangpiqu,xinzhouqu,caidianqu,hannanqu,qita];

    $("#quyu").change(function(){

     });

    //$.("#remenshangquan")


});
