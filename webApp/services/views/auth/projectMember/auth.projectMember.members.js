//项目成员列表view

App.Services.projectMember.members = Backbone.View.extend({

  template: _.templateUrl('/services/tpls/auth/projectMember/members.html'),

  // 重写初始化
  initialize: function() {
		this.listenTo(App.Services.projectMember.projectMemberMemberCollection,'reset',this.render);
  },

  render: function(items) {
  	var data=App.Services.projectMember.method.model2JSON(items.models);
  	data={data:data};
    $("#memberList").html(this.template(data));
    return this;
  }
});