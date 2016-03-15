App.ResourcesNav.StandardLibs=Backbone.View.extend({

	tagName:"div",

	id:"standardLibs",

	template:_.templateUrl("/resources/tpls/resourcesNav/resource.nav.standardlibs.html",true),

	//初始化
	initialize(){
		this.listenTo(App.ResourcesNav.StandardLibsCollection,"add",this.addOne);
	},

	render:function(){

		this.$el.html(this.template);
		return this;
	},


	templateDetail:_.templateUrl("/resources/tpls/resourcesNav/resource.nav.standardlibs.detail.html"),

	//添加单个
	addOne(model){ 

		var $standar=this.$el.find(".standarBody .standar"),$loading=$standar.find(".loading");

		if ($loading.length>0) {
			$loading.remove();
		} 

		var data=model.toJSON();
	 	$standar.append(this.templateDetail(data));
		 
	}




});