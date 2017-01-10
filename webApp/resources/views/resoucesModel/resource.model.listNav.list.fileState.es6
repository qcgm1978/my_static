 App.ResourceModel.FileStatus = Backbone.View.extend({
	tagName: "div",
	className: "fileStatus",
	events: {
		"click .header .ckAll": "ckAll",
	},
	template: _.templateUrl("/resources/tpls/resourceModel/resource.model.listNav.list.fileState.html"),
	//渲染
	render: function() {
		this.getFileStatusFun();
		return this;
	},
	getFileStatusFun(){//获取文件上传转换状态的方法
		var data = {
			URLtype: "getFileStatus",
			data: {
				projectId: App.ResourceModel.FileCollection.projectId,
				versionId: App.ResourceModel.FileCollection.projectVersionId,
			}
		}
		App.Comm.ajax(data, (data) => {
			if(data.code == 0){
				this.$el.html(this.template(data.data));
				App.Comm.initScroll(this.$(".fileStateFail"), "y");
			}
		});
	}
})