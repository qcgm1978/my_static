/**
 * @require /projects/collections/Project.js
 */
App.Project.CostAttr={

		//清单 collection
	ReferenceCollection: new(Backbone.Collection.extend({
	 
		model: Backbone.Model.extend({
			defaults: function() {
				return {
					title: ""
				}
			}
		}),

		urlType:"fetchCostReference"


	})),

		// 变更 collection
	ChangeCollection: new(Backbone.Collection.extend({
	 
		model: Backbone.Model.extend({
			defaults: function() {
				return {
					title: ""
				}
			}
		}),

		urlType:"fetchCostChange"

	})),

		// 检验 collection
	VerificationCollection: new(Backbone.Collection.extend({
	 
		model: Backbone.Model.extend({
			defaults: function() {
				return {
					title: ""
				}
			}
		}),

		urlType:"fetchCostVerification",

		parse:function(response){

			if (response.message == "success") {
                 return response;
             }
		}

	})),

	// 属性 collection
	PropertiesCollection: new(Backbone.Collection.extend({
	 
		model: Backbone.Model.extend({
			defaults: function() {
				return {
					title: ""
				}
			}
		}),

		urlType:"fetchCostProperties",

		parse:function(response){
			if (response.message == "success") {
                 return response.data;
             }
		}

	}))


}