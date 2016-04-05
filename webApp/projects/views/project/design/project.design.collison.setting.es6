App.Project.ProjectDesignSetting= Backbone.View.extend({

  tagName:"div",

  className:"designCollSetting",

  events: {
    "click .itemContent":"openTree",
    "blur .labelInput":"requireName"
  },

  template:_.templateUrl("/projects/tpls/project/design/project.design.collision.setting.html",true),

  initialize:function(){
    this.listenTo(App.Project.DesignAttr.CollisionFiles,"add",this.addFiles);
  },

  render:function(){
    this.$el.html(this.template);
    App.Project.DesignAttr.CollisionFiles.sourceId = App.Project.Settings.DataModel.sourceId;
    App.Project.DesignAttr.CollisionFiles.etag = App.Project.Settings.DataModel.etag;
    App.Project.DesignAttr.CollisionFiles.fetch();
    return this;
  },

  addFiles:function(model){
    var that = this;
    var data = model.toJSON();
    this.$el.find(".tree").append(new App.Project.CollisionFiles({
      model:data
    }).render().el);
    return this;
  },

  openTree:function(event){
    var self = this,
        that = self.element = $(event.target).closest(".itemContent"),
        etag = that.data('etag');

    if(etag&&!that.hasClass('open')&&that.next('.subTree').length==0){
      App.Project.DesignAttr.CollisionCategory.sourceId = App.Project.Settings.DataModel.sourceId;
      App.Project.DesignAttr.CollisionCategory.etag = etag;
      App.Project.DesignAttr.CollisionCategory.fetch();
      this.listenTo(App.Project.DesignAttr.CollisionCategory,"add",this.addCategory);
    }
    that.toggleClass("open");
  },
  addCategory:function(model){
    var data = model.toJSON();
    this.element.after(new App.Project.DesignTreeView({
      model:data
    }).render().el)
  },

  requireName:function(event){
    var that = $(event.target);
    if(that.val()){
      that.removeClass("error");
    }else{
      that.addClass("error").trigger("focus");
    }
  }
});