/*
 * @require  /services/views/auth/index.nav.es6
 * */
App.Services.MemberWindowIndex = Backbone.View.extend({

    tagName:"div",

    className:"seWinBody",

    template:_.templateUrl("/services/tpls/auth/windows/services.member.window.index.html"),

    events:{
        "click .windowSubmit":"windowSubmit"
    },


    render:function(){
        this.$el.html(this.template);
        return this;
    },

    //提交表单，完毕会触发重新获取列表，列表为memBlend所属列表
    windowSubmit:function(){
        var submitData  = App.Services.memberWindowData;//获取要提交的成员/组织相关信息
        if(submitData){
            //获取已选角色,并添加角色ID
            var selectRole = App.Services.role.collection.filter(function(item){
                return item.get("checked");
            });


            //if(!selectRole.length){alert("请至少选择一个角色");return;}
            _.each(selectRole,function(item){
                submitData.roleId.push(item.get("roleId"));
            });
        }

        $.ajax({
            type:"POST",
            url:"http://bim.wanda-dev.cn/platform/auth/role/grant",
            data:submitData,
            contentType: "application/json",
            success:function(response){
                //返回重新获取成员角色列表
            },
            error:function(){
                //错误提示
            }
        });

        //刷新选项的角色列表

        //提交提示，需要回调函数
        //进度窗口
        //提交成功关闭窗口，否则显示提交失败
        App.Services.maskWindow.close();
    },

    initialize:function(){
    }
});
