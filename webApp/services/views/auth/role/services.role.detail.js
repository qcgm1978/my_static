/*
 * @require  /services/collections/auth/member/role.list.js
 */
App.Services.roleDetail=Backbone.View.extend({
    tagName:'li',

    template:_.templateUrl("/services/tpls/auth/role/services.role.detail.html"),
    events:{
        "click .modify":"modify",
        "click .delete":"delete"
    },

    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    initialize:function(){
        this.listenTo(this.model, 'change', this.render);
        this.$el.hover(function(){$(this).addClass("active");},function(){$(this).removeClass("active")});
    },

    modify:function(){


        var type =  App.Services.MemberType;
        //获取所选项



        var frame = new App.Services.MemberWindowIndex().render();


        //初始化窗口
        App.Services.batchAwardWindow = new App.Comm.modules.Dialog({
            title:"角色授权",
            width:600,
            height:500,
            isConfirm:false,
            isAlert:false,
            okCallback:function(){},
            cancelCallback:function(){},
            closeCallback:function(){},
            message:"设定角色功能"
        });


        //
        //App.Services.window.init();
        //
        //$(".serviceWindow").append( new App.Services.windowRole().render().el);
        //
        ////没起作用
        //var $this =this;
        ////值
        //var func= this.model.get("functions");
        //App.Services.fun.loadData(function(){
        //
        //    $("#selectedRoleName").val($this.model.get("name")).attr("disabled","disabled"); //暂时写入
        //
        //    App.Services.fun.collection.each(function(item){
        //        for(var i = 0 ; i < func.length ; i ++){
        //            if(item.get("id") == func[i]["id"]){
        //                item.set({"checked":true});
        //                return
        //            }
        //        }
        //    });
        //});//异步获取功能数据


        //请求个人角色列表设置,
        //获取数据轮询，如果与角色列表相同则勾选选项
    },

    delete:function(){
        //删除需判断状态，由什么来判断？
        App.Services.role.collection.remove(this.model);
        App.Services.role.collection.save();
    }
});




