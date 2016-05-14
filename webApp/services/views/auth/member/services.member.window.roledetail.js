/*
 * @require  /services/views/auth/index.es6
 */
App.Services.windowRoleDetail=Backbone.View.extend({

    tagName:'li',

    template:_.templateUrl("/services/tpls/auth/windows/services.member.window.detail.html"),
    events:{
        "click .name":"memCheck"
    },
    render:function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize:function(){
        this.listenTo(this.model,"change:checked",this.checked);
        this.listenTo(this.model,"change:inherit",this.inherit);
    },
    //加载判断
    checked:function(){
        if(this.model.get("checked")){
            this.$el.addClass("active");
        }
    },

    //继承属性不可修改
    inherit:function() {
        this.$el.addClass("inherit");
    },
    //点选
    memCheck:function(){
        var window= App.Services.maskWindow.find(".memRoleList h2 i");
        count = parseInt(window.html());
        if(this.model.get("inherit")){return;}
        var checkEle = this.model.get("checked");
        if(!checkEle){
            this.$el.addClass("active");
            window.html(count + 1);
        }else{
            this.$el.removeClass("active");
            window.html(count - 1);
        }
        this.model.set("checked",!checkEle);
    }
});




