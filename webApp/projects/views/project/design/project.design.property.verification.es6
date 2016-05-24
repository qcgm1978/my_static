 //设计属性 检查
 App.Project.DesignVerification = Backbone.View.extend({

 	tagName: "div",

 	className: "designVerification",

 	initialize: function() {
 		this.listenTo(App.Project.DesignAttr.VerificationCollection, "add", this.addOne);
 		this.listenTo(App.Project.DesignAttr.VerificationCollection, "reset", this.reset);
 	},

 	events: {
 		"click .searchToggle": "searchToggle",
 		"click .clearSearch": "clearSearch"
 	},

 	template: _.templateUrl("/projects/tpls/project/design/project.design.property.verification.html"),

 	render: function(opts) {

 		this.VerificationOptions=opts.verOpts;

 		var template = _.templateUrl("/projects/tpls/project/design/project.design.property.verification.header.html", true);
 		this.$el.html(template);
 		this.initEvent();
 		return this;
 	},

 	//显示隐藏搜索
 	searchToggle() {
 		var $searchDetail = this.$(".searchDetail");
 		if ($searchDetail.is(":animated")) {
 			return;
 		}
 		$searchDetail.slideToggle();
 	},

 	searchup() {
 		var $searchDetail = this.$(".searchDetail");
 		if ($searchDetail.is(":animated")) {
 			return;
 		}
 		$searchDetail.slideUp();
 	},

 	clearSearch(){
 		this.$('.specialitiesOption .text').html('全部')
 		this.$('.categoryOption .text').html('全部')
 		this.$('.statusOption .text').html('全部')
 		this.$('.inspectionUnitOption .text').html('全部')
 		Backbone.trigger('projectDesignPropetyFilterDataClear');
 	},

 	dataChange(key,val){
 		Backbone.trigger('projectDesignPropetyFilterDataChange',key,val)
 	},
 	//初始化事件
 	initEvent() {


 		var that = this;
 		//专业
 		this.$(".specialitiesOption").myDropDown({
 			click: function($item) {
 			//	that.VerificationOptions.specialty = $item.text();
 			//	Backbone.trigger('projectDesignPropetyFilterDataChange','specialty',$item.text())
 				that.dataChange('specialty',$item.attr('data-val'))
 			}
 		});

 		//类别
 		this.$(".categoryOption").myDropDown({
 			click: function($item) {
 			//	that.VerificationOptions.type = $item.text();
 				that.dataChange('type',$item.attr('data-val'))
 			}
 		});

 		//状态
 		this.$(".statusOption").myDropDown({
 			click: function($item) {

 			//	that.VerificationOptions.status = $item.data("status");
 				that.dataChange('status',$item.data("status"))
 			}
 		});

 		//检查单位
 		this.$(".inspectionUnitOption").myDropDown({
 			click: function($item) {

 			//	that.VerificationOptions.reporter = $item.text();
 				that.dataChange('reporter',$item.attr('data-val'))
 			}
 		});


 		//显示搜索结果对应位置
 		this.$(".groupRadio").myRadioCk();

 		this.$("#dateStar").one("mousedown", function() {
 			//日期控件初始化
 			$('#dateStar').datetimepicker({
 				language: 'zh-CN',
 				autoclose: true,
 				format: 'yyyy-mm-dd',
 				minView: 'month',
 				endDate: new Date()

 			}).on("changeDate", function(ev) {
 			//	that.VerificationOptions.startTime = ev.date.format("yyyy-MM-dd");
 				that.dataChange('startTime', ev.date.format("yyyy-MM-dd"))
 			});
 		});

 		this.$("#dateEnd").one("mousedown", function() {
 			//日期控件初始化
 			$('#dateEnd').datetimepicker({
 				language: 'zh-CN',
 				autoclose: true,
 				format: 'yyyy-mm-dd',
 				minView: 'month',
 				endDate: new Date()

 			}).on("changeDate", function(ev) {
 				//that.VerificationOptions.endTime = ev.date.format("yyyy-MM-dd");
 				that.dataChange('endTime',ev.date.format("yyyy-MM-dd"))
 			});
 		});

 	},

 	bindScroll() {

 		this.$(".ckBodyScroll").mCustomScrollbar({
 			set_height: "100%",
 			theme: 'minimal-dark',
 			axis: 'y',
 			keyboard: {
 				enable: true
 			},
 			scrollInertia: 0
 		});

 	},

 	//数据返回
 	addOne: function(model) {
 		 
 		if (this.$el.closest('body').length <= 0) {
 			this.remove();
 		} 
 		var data = model.toJSON();
 		this.$(".ckBox .ckBody tbody").html(this.template(data.data));

 		if (!this.$(".ckBodyScroll").hasClass('mCustomScrollbar ')) {
 			this.bindScroll();
 		}

 	},

 	reset:function(){
 		this.$(".ckBox .ckBody tbody").html(App.Project.Settings.loadingTpl);
 		this.searchup();

 	}





 });