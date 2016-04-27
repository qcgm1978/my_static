/**
 * @require /bodyContent/js/model/model.js
 */

App.BodyContent.monthEndView = Backbone .View.extend({

    tagName :  "tr",

    event:{},

    template:_.templateUrl("/bodyContent/tpls/monthEnd.html"),

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    
    //事件管理，未知，返回不同type的处理程序
    eventType:function(){

    }
});