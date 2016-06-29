/**
 * @require /services/collections/auth/keyuser/keyuser.js
 */

App.Services.AuthNav = Backbone.View.extend({

	tagName:"div",
	template:_.templateUrl("/services/tpls/auth/auth.nav.html"),

	events:{
		"click .memCtrl" : "memCtrl",
		"click .roleManager" : "roleManager",
		"click .keyUser" : "keyUser",
		"click .projectMember" : "projectMember"
	},
	render:function(){
		var user = JSON.parse(localStorage.user || "{}"),
			isadmin = user.isAdmin || false,
			isKeyUser = user.isKeyUser || false;
		this.$el.html(this.template({isadmin:isadmin,iskeyuser:isKeyUser}));
		return this;
	},
//面包屑

	initialize:function(){
		this.breadCrumb(this.$el.find(".memCtrl"));

	},
	breadCrumb : function(el){
		//debugger;
		var $el=$(el);
		$el.addClass("active").siblings("li").removeClass("active");
	},

	memCtrl : function(){
		$(".serviceBody").empty();
		$("#blendList").addClass("services_loading");
		this.breadCrumb(this.$el.find(".memCtrl"));
		this.$(".serviceBody").html(new App.Services.MemberNav().render().el);
		this.$(".serviceBody .content").html(new App.Services.MemberList().render().el);
		Backbone.trigger("loadMemberData");
	},
	roleManager : function(){
		$(".serviceBody").empty();
		$("#blendList").addClass("services_loading");
		this.breadCrumb(this.$el.find(".roleManager"));
		App.Services.role.init(function(){$("#blendList").removeClass("services_loading");});
	},
	keyUser : function(){

		$(".serviceBody").empty();
		this.breadCrumb(this.$el.find(".keyUser"));
		App.Services.KeyUser.init();
		var keyUserFrame = new App.Services.keyUserFrame();
		$(".serviceBody").html(keyUserFrame.render().el); //框架
		$('.keyUserList .needloading').html("<div class='smallLoading'><img  src='/static/dist/images/comm/images/load.gif'/></div>");
		App.Services.KeyUser.loadData(App.Services.KeyUser.KeyUserList,'',function(r){
			if(r && !r.code && r.data){
				App.Services.KeyUser.KeyUserList.set(r.data);
				keyUserFrame.render();
				App.Services.KeyUser.userList = r.data;
			}
		});
	},
	projectMember : function(){
		$(".serviceBody").empty();
		this.breadCrumb(this.$el.find(".projectMember"));
		App.Services.projectMember.init({type : "auth",tab:"projectMember"});
	}
});
