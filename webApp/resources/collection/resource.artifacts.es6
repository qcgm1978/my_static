//fetchArtifactsPlan   ��ȡ�ƻ�
//fetchArtifactsPlanRule   ��ȡ����
App.ResourceArtifacts={
    Settings: {
        delayCount:  0  //ÿ���������
    },

    openRule: null,


    rule:{
        equal :"���",
        unequal:"����",
        inside:"��Χ��",
        outside:"��Χ��"
    },


    PlanNode : new(Backbone.Collection.extend({
        model:Backbone.Model.extend({
            defaults:function(){
                return{

                }
            }
        }),
        urlType: "fetchArtifactsPlan",
        parse: function(responese) {

            if (responese.code == 0 && responese.data.length > 0) {
                return responese.data;
            } else {
                $().html('<li>������</li>');
            }
        }
    })),

//�ƻ�����/��ȡ
    PlanRules:new(Backbone.Collection.extend({
        model:Backbone.Model.extend({
            defaults:function(){
                return{

                }
            }
        }),
        urlType: "fetchArtifactsPlanRule",
        parse: function(responese) {

            if (responese.code == 0 && responese.data.length > 0) {
                return responese.data;
            } else {
                $().html('<li>������</li>');
            }
        }
    })),

//����ƻ�����
    SavePlanRules : Backbone.Model.extend({
            defaults:function(){
                return{
                    code : ""
                }
            },
        urlType: "",
        parse: function(responese) {
            if (responese.code == 0 && responese.data.length > 0) {
                return responese.data;
                //����ɹ�
            }
        }
    }),

    ArtifactsRule:new(Backbone.Collection.extend({
        model:Backbone.Model.extend({
            defaults:function(){
                return{

                }
            }
        }),
        urlType: "",
        parse: function(responese) {

            if (responese.code == 0 && responese.data.length > 0) {
                return responese.data;
            } else {
                //$().html('<li>������</li>');
            }
        }
    })),


    init:function(_this) {
        var pre = new App.ResourcesNav.ArtifactsMapRule();
        var plans = new App.ResourcesNav.ArtifactsPlanList();
        var planRule = new App.ResourcesNav.ArtifactsPlanRule();
        _this.$el.append(pre.render().el);//�˵�
        pre.$(".plans").html(plans.render().el);//�ƻ��ڵ�
        pre.$(".rules").append(planRule.render().el);//�˵�
        //����Ĭ��Ϊ�յĹ����б�
        this.getPlan();
        $("#pageLoading").hide();
    },
    getPlan:function(){
        var _this = this, pdata;

        pdata  = {
            URLtype:"fetchArtifactsPlan",
            data:{}
        };

        App.Comm.ajax(pdata,function(response){
            if(response.code == 0 && response.data.length){
                App.ResourceArtifacts.PlanNode.add(response.data);
                //_this.delay(response);
            }
        });
    },

    //�ӳ�
    delay:function(data){
    var _this = this , batch , length = data.length , arr = []  , n = 1 , last;

        batch = Math.ceil(length/20); //ѭ������
        last = length % 20; //����
        if(batch > 0){
            App.ResourceArtifacts.delays = setTimeout(function(){
               // var as = ;
                App.ResourceArtifacts.PlanNode.add();

                _this.delay();

                n++;
            },100);
        }
    }
};