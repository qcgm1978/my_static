/**
 * @require /resources/collection/resource.nav.es6
 */
App.Resources.ArtifactsQualityDetail = Backbone.View.extend({

    tagName:"div",

    className : "title",

    template: _.templateUrl("/resources/tpls/resourcesArtifacts/mappingRule/resources.artifacts.qualitydetail.html"),

    events:{
        "click .item":"getDetail",
        "click .ruleCheck":"checked"
    },

    render:function() {
        this.$el.html(this.template(this.model.toJSON()));
        var ruleContain = this.model.get("ruleContain");
        return this;
    },

    initialize:function(){
        Backbone.on("resetTitle",this.changeCount,this);
        Backbone.on("checkedChange",this.checkList,this);
        Backbone.on("modelRuleEmpty",this.modelRuleEmpty,this);
        Backbone.on("modelRuleFull",this.modelRuleFull,this);
        Backbone.on("modelRuleHalf",this.modelRuleHalf,this);
    },

    modelRuleEmpty:function(){
        if(this.model.get("leaf")&&App.ResourceArtifacts.Status.rule.targetCode == this.model.get("code")){
            this.$(".ruleCheck").removeClass("all").removeClass("half");
            Backbone.trigger("modelRuleSelectNone");
        }
    },
    modelRuleFull:function(){
        if(this.model.get("leaf")&&App.ResourceArtifacts.Status.rule.targetCode == this.model.get("code")) {
            this.$(".ruleCheck").addClass("all").removeClass("half");
            Backbone.trigger("modelRuleSelectAll");
        }
    },
    modelRuleHalf:function(){
        if(this.model.get("leaf")&&App.ResourceArtifacts.Status.rule.targetCode == this.model.get("code")){
            this.$(".ruleCheck").addClass("half").removeClass("all");
        }
    },

    checked:function(e){
        var ele = $(e.target);
        var leaf = this.model.get("leaf");
        var _this = this.$el.closest("li");
        ele.removeClass("half");

        //非叶子节点，加载
        if(!leaf && !this.$el.siblings(".childList").html()){
            return
        }

        App.Resources.cancelBubble(e);

        var siblings = _this.siblings("li");
        var father = _this.closest("ul").closest("li");
        var fatherSiblings = father.siblings("li");
        var grandfather = father.closest("ul").closest("li");


        if(siblings.length){
            //查找同类是否有选
            var data = _.filter(siblings,function(item){
                return $(item).attr("data-check") == "1";
            });
            //查找同类是否全不选
            var data1 = _.filter(siblings,function(item){
                return $(item).attr("data-check") == "0";
            });
        }
        if(fatherSiblings.length){
            //查找父级同类是否有选
            var fatherData  =  _.filter(fatherSiblings,function(item){
                return $(item).attr("data-check") == "1";
            });
            //查找父级同类是否全选
            var fatherData1  =  _.filter(fatherSiblings,function(item){
                return $(item).attr("data-check") == "0";
            });
        }

        if(ele.hasClass("all")){
            ele.removeClass("all").removeClass("half");
            _this.attr("data-check","0");
            //取消所有上级菜单，如果本级都未选中，则上级菜单取消half，如果有选中，则增加half
            if(father.length){
                father.attr("data-check","0");
                var pre = this.searchSelf(father);
                pre.removeClass("all").addClass("half");
                if(!data.length){
                    pre.removeClass("half");
                }
            }
            if(grandfather.length){
                grandfather.attr("data-check","0");
                var grPre = this.searchSelf(grandfather);
                grPre.removeClass("all").addClass("half");
                if(!data.length && !fatherData.length){
                    grPre.removeClass("half");
                }
            }
            if(leaf){
                //操作右侧全不选
                return
            }
            //取消所有下级菜单
            if(_this.find("li").length){
                _.each(_this.find("li"),function(item){
                    $(item).attr("data-check","0").find(".ruleCheck").removeClass("all");
                });
            }

        }else{
            ele.addClass("all").removeClass("half");
            _this.attr("data-check","1");

            //选择填充上级菜单，如果本级都未选中，则上级菜单取消half，如果有选中，则增加half
            if(father.length){
                father.attr("data-check","1");
                var pre1 = this.searchSelf(father);
                pre1.addClass("half");
                if(!data1.length){
                    pre1.removeClass("half").addClass("all");
                }
            }
            if(grandfather.length){
                grandfather.attr("data-check","1");
                var grPre1 = this.searchSelf(grandfather);
                grPre1.addClass("half");
                if(!data1.length && !fatherData1.length){
                    _.each(grandfather.find(".ruleCheck"),function(item){
                        $(item).removeClass("half").addClass("all");
                    });
                    grPre1.removeClass("half").addClass("all");
                }
            }

            if(leaf){
                //操作右侧全选
                return
            }
            //添加所有下级菜单
            if(_this.find("li").length) {
                _.each(_this.find("li"), function (item) {
                    $(item).attr("data-check", "1").find(".ruleCheck").removeClass("half").addClass("all");
                });
            }
        }

    },
    //查找所给元素的check元素
    searchSelf:function(ele){
        var childList = ele.find(".childList");
        var pre = _.filter(childList,function(item){
            return $(item).attr("data-code") == ele.attr("data-code");
        });
        return   $(pre).eq(0).siblings(".title").find(".ruleCheck");
    },


    changeCount:function(){
        var count = App.ResourceArtifacts.Status.rule.count;
        if(this.model.get("code") ==App.ResourceArtifacts.Status.rule.targetCode ){
            this.model.set({count:count},{silent:true});
            this.$(".count").text("("+ count + ")");
        }
    },

    //取得规则列表
    getDetail:function(e){

        this.$(".fold").addClass("active");
        var hasCon =  this.$(".item").closest(".title").siblings(".childList:hidden");
        if(hasCon.length && hasCon.html()){
            hasCon.show();//显示列表
            return
        }
        var innerCon =  this.$(".item").closest(".title").siblings(".childList:visible");
        if(innerCon.html()){
            innerCon.hide();//隐藏列表
            this.$(".fold").removeClass("active");
            return
        }

        var item = $(e.target);
        App.ResourceArtifacts.Status.rule.targetCode = this.model.get("code");
        App.ResourceArtifacts.Status.rule.targetName = this.model.get("name");
        App.ResourceArtifacts.Status.rule.count = this.model.get("count");

        if(!App.ResourceArtifacts.Status.saved){
            alert("您还有没保存的");
            return
        }

        this.toggleClass(item);
        this. getRules();
    },
//切换计划
    toggleClass:function(item){
        $(".item").removeClass("active");
        item.closest(".item").addClass("active");
    },

    //获取质量标准相关规则
    getRules:function() {
        var _this = this,pdata,n = this.$el.closest("li").attr("data-check");
        if(!App.ResourceArtifacts.Status.saved){
            return
        }
        if(!this.model.get("leaf")){
            //存在，加载二级或三级标准
            pdata = {
                URLtype : 'fetchArtifactsQuality',
                data : {
                    type : App.ResourceArtifacts.Status.type,
                    standardType: App.ResourceArtifacts.Status.qualityStandardType,
                    parentCode : this.model.get("code")  //传递父节点
                }
            };
            if(App.ResourceArtifacts.Status.templateId){
                pdata.data.templateId = App.ResourceArtifacts.Status.templateId;
            }else if(App.ResourceArtifacts.Status.projectId){
                pdata.data.projectId = App.ResourceArtifacts.Status.projectId;
            }

            App.ResourceArtifacts.PlanRules.reset();
            App.Comm.ajax(pdata,function(response){
                if(response.code == 0 && response.data){
                    if(response.data.length){
                        var list = App.Resources.artifactsQualityTree(response.data,n);
                        _this.$el.closest("li").find(".childList").html(list);
                    }else{
                        //无数据咋办
                    }
                }
            });
            return
        }

        //刷新右面视图
        var code = App.ResourceArtifacts.Status.rule.targetCode;
        pdata = {
            URLtype: "fetchArtifactsPlanRule",
            data:{
                code:code,
                type:App.ResourceArtifacts.Status.type,
                projectId:App.ResourceArtifacts.Status.projectId
            }
        };
        App.ResourceArtifacts.Status.rule.biz = pdata.data.biz = 2 ;
        App.ResourceArtifacts.loading();
        App.ResourceArtifacts.PlanRules.reset();
        App.Comm.ajax(pdata,function(response){
            if(response.code == 0 ){
                if(response.data  &&  response.data.length){
                    App.ResourceArtifacts.PlanRules.add(response.data);
                }else{
                    App.ResourceArtifacts.Status.rule.count  = response.data.length = 0;
                    Backbone.trigger("mappingRuleNoContent")
                }
                Backbone.trigger("resetTitle");
            }
            App.ResourceArtifacts.loaded($(".rules"));
        });
    }
});