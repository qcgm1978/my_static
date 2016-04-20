/*
 * @require  /service/js/view/mem/service.MemCtrlChildList.js
 * */
var App = App || {};
App.Service.MemCtrl=Backbone.View.extend({

    tagName :'div',

    template:_.templateUrl("/Service/tpls/mem/service.MemCtrl.html"),
    events:{
        "click .outer":'outer',
        "click .inner":'inner'
    },

    render:function(){
        this.$el.html(this.template);
        return this;
    },

    initialize:function(){
        //默认根据角色权限加载  adm用户加载全部，keyMem用户只显示项目管理
    },

    //外部用户
    outer:function(){
        this.loadData(true,"outer");
    },
    //内部用户
    inner:function(){
        this.loadData(false,"inner");
    },


    loadData:function(options,self){
        var dataObj = {
            URLtype: "fetchServiceMCBlendList",
            data: {
                outer: options,//是否外部
                parentId: ""//父项ID
            }
        };
        App.Service.memCtrlBlend.collection.reset();
        //设置类型为员工
        //设置类型为组织
        App.Comm.ajax(dataObj,function(response){
            if(response.message == "success") {
                $("#blendList").empty();
                //reset数据
                if (response.data.user.length) {
                    App.Service.memCtrlBlend.collection.add(response.data.user);//员工
                }
                if (response.data.org.length) {
                    //样式处理
                    this.$("div").remove("active");
                    $("." + self).addClass("active");
                    $(".serviceOgList span").removeClass("active");//唯一选项
                    $("." + self + " > span").addClass("active");//选中状态
                    //状态清空
                    this.$(".childOz").empty();
                    //数据和渲染
                    App.Service.memCtrlBlend.collection.add(response.data.org);//组织
                    this.$("." + self +"+ .childOz").html(new App.Service.MemCtrlChildList(response.data.org).render().el);
                }
            }
        });
    }
});
