/*
 * @require /bodyContent/js/view/todos.js
 */
App.BodyContent.todosList = Backbone.View.extend({

    _items:0,

    events:{
    //无事件，预留
    },
    render:function(){
        this.$el.html(this.template);
        return this;
    },

    initialize : function(){
        var _this=this;
        this.listenTo(App.BodyContent.control.todoCollection,"add",this.addOne);
         this.listenTo(App.BodyContent.control.todoCollection,"reset",function(){
            $("#todos").empty();
            _this._items=0;
         });
        this.render();
    },
    //数据加载
    addOne:function(item){
        this._items++;
        if($('#layoutTodo').height()-70<this._items*30){
            return
        }
        var newView = new App.BodyContent.todosView({model : item});
        var el=newView.render().$el;
        if(this._items%2==1){
            el.addClass('odd');
        }
        $("#todos").append(el);
    }
});