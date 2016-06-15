/*
 * @require  /services/views/auth/index.nav.es6
 * */

//权限管理入口
App.Services.Auth = Backbone.View.extend({

	tagName: "div",

	render(){
		App.Services.MemberType = "inner";//默认加载类型
		//var menu = new App.Services.MemberNav().render(),
		//	content = new App.Services.MemberList().render();
		this.$el.html(new App.Services.AuthNav().render().el);//菜单
		//this.$(".serviceBody").html(menu.el);//组织菜单
		//this.$(".serviceBody .content").html(content.el);//主体列表
		$("#blendList").addClass("services_loading");
		return this;
	},

	initialize:function(){
		this.render();
		App.Services.Member.loadData(App.Services.Member.innerCollection,{},function(response){
			$("#inner span").addClass("active");
			$("#inner").addClass("active").siblings(".childOz").html(App.Services.tree(response));
			$("#blendList").removeClass("services_loading");
		});
		setTimeout(function(){
			$('.serviceNav .active').trigger('click');
		},1000)
	}

});