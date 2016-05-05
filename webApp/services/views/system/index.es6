

//系统 管理入口
App.Services.System=Backbone.View.extend({

	tagName:"div",

	className:"systemContainerBox",

	events:{
		"click .serviceNav .item":"itemClick"
	},

	render(){

		this.$el.html(new App.Services.System.topBar().render().el);

		this.$(".serviceNav .item").eq(2).trigger("click");

		return this;
	},

	//tab 切换
	itemClick(event){
		var $target=$(event.target),type=$target.data("type"),viewer;
		$target.addClass("selected").siblings().removeClass("selected");

		if (type=="category") { 
			//业务类别
			viewer=new App.Services.System.CategoryManager();

		}else if (type=="flow") {
			//流程
			viewer=new App.Services.System.FolwManager();

		}else if (type=="extend") {
			//扩展
			viewer=new App.Services.System.ExtendAttrManager();
		} 

		this.$("#systemContainer").html(viewer.render().el);

	}



});