App.Project.ProjectQualityProperty = Backbone.View.extend({

	tagName: "div",

	className: "ProjectQualityNavContainer",

	template: _.templateUrl("/projects/tpls/project/quality/project.quality.property.html", true),

	events: {
		"click .projectQualityNav .item": "navClick",
		"click .paginationBottom .pageInfo .next": "nextPage",
		"click .paginationBottom .pageInfo .prev": "prevPage",
		"click .btnFilter": "filterData",
		"click .clearSearch": "clearSearch"
	},

	render: function() {

		this.$el.html(this.template);
		this.initOptions();
		this.$el.find(".qualityContainer").append(new App.Project.QualityMaterialEquipment().render({
			MaterialEquipmentOptions: this.MaterialEquipmentOptions
		}).el);
		this.$el.find(".qualityContainer").append(new App.Project.QualityProcessAcceptance().render({
			ProcessAcceptance: this.ProcessAcceptanceOptions
		}).el);
		this.$el.find(".qualityContainer").append(new App.Project.QualityOpeningAcceptance().render({
			OpeningAcceptance: this.OpeningAcceptanceOptions
		}).el);
		this.$el.find(".qualityContainer").append(new App.Project.QualityConcerns().render({
			Concerns: this.ConcernsOptions
		}).el);
		this.$el.find(".qualityContainer").append(new App.Project.QualityProperties().render().el);

		return this;
	},

	//切换tab
	navClick: function(event) {
		var $target = $(event.target),
			type = $target.data("type");
		$target.addClass('selected').siblings().removeClass('selected');
		App.Project.Settings.property = type, isLoadData = false;

		if (type == "materialequipment") {
			//材料设备
			var $QualityMaterialEquipment = this.$el.find(".QualityMaterialEquipment");

			$QualityMaterialEquipment.show().siblings().hide();

			if ($QualityMaterialEquipment.find(".noLoading").length > 0) {
				isLoadData = true;
			}

		} else if (type == "processacceptance") {
			//过程验收
			var $QualityProcessAcceptance = this.$el.find(".QualityProcessAcceptance");

			$QualityProcessAcceptance.show().siblings().hide();

			if ($QualityProcessAcceptance.find(".noLoading").length > 0) {
				isLoadData = true;
			}

		} else if (type == "openingacceptance") {
			//开业验收

			var $QualityOpeningAcceptance = this.$el.find(".QualityOpeningAcceptance");

			$QualityOpeningAcceptance.show().siblings().hide();

			if ($QualityOpeningAcceptance.find(".noLoading").length > 0) {
				isLoadData = true;
			}


		} else if (type == "concerns") {
			//隐患

			var $QualityConcerns= this.$el.find(".QualityConcerns");

			$QualityConcerns.show().siblings().hide();

			if ($QualityConcerns.find(".noLoading").length > 0) {
				isLoadData = true;
			}


		} else if (type == "poperties") {
			//属性
			this.$el.find(".QualityProperties").show().siblings().hide();
		}

		if (type !== "poperties") { 
			if (isLoadData) {
				this.getData(1);
			}
			 
		} else {
			App.Project.renderProperty();
		}

	},

	//初始化参数
	initOptions() {
		this.initOptionsMaterialEquipment();
		this.initOptionsProcessAcceptance();
		this.initOptionsOpeningAcceptance();
		this.initOptionsConcerns();
	},

	//初始化 材料设备
	initOptionsMaterialEquipment() {
		this.MaterialEquipmentOptions = {
			specialty: "", //专业
			category: "", //类别
			status: "", //	状态：1，合格 2，不合格
			name: "", //	名称
			startTime: "", //查询时间范围：开始
			endTime: "", //查询时间范围：结束
			pageIndex: 1, //第几页，默认第一页
			pageItemCount: App.Comm.Settings.pageItemCount //页大小
		};
	},

	//初始化 过程验收
	initOptionsProcessAcceptance() {
		this.ProcessAcceptanceOptions = {
			category: "", //类别 
			problemCount: "", // 无隐患 1， 有隐患 
			pageIndex: 1, //第几页，默认第一页
			pageItemCount: App.Comm.Settings.pageItemCount //页大小
		};
	},

	//初始化 开业验收
	initOptionsOpeningAcceptance() {
		this.OpeningAcceptanceOptions = {
			specialty: "", //专业
			category: "", //类别 
			problemCount: "", // 无隐患 1， 有隐患 
			pageIndex: 1, //第几页，默认第一页
			pageItemCount: App.Comm.Settings.pageItemCount //页大小
		};
	},

	//初始化 隐患
	initOptionsConcerns() {
		this.ConcernsOptions = {
			category: "", //类别
			type: "", //类型
			status: "", //状态 1:待整改 2:已整改 3:已关闭
			level: "", //等级 1:一般 2:较大 3:重大 4:特大
			reporter: "", //填报人
			startTime: "", //查询时间范围：开始
			endTime: "", //查询时间范围：结束
			pageIndex: 1, //第几页，默认第一页
			pageItemCount: App.Comm.Settings.pageItemCount //页大小 
		};
	},


	//获取材料设备
	getData(pageIndex, projectId, projectVersionId) {

		var type = App.Project.Settings.property,
			pageSize = App.Comm.Settings.pageItemCount,
			that = this,
			projectId = App.Project.Settings.projectId,
			projectVersionId = App.Project.Settings.CurrentVersion.id;



		if (type == "materialequipment") {

			this.MaterialEquipmentOptions.pageIndex = pageIndex;
			//材料设备
			App.Project.QualityAttr.MaterialEquipmentCollection.reset();
			App.Project.QualityAttr.MaterialEquipmentCollection.projectId = projectId;
			App.Project.QualityAttr.MaterialEquipmentCollection.projectVersionId = projectVersionId;
			App.Project.QualityAttr.MaterialEquipmentCollection.fetch({
				data: that.MaterialEquipmentOptions,
				success: function(data) {
					that.pageInfo.call(that, data);
				}

			});

		} else if (type == "processacceptance") {
			this.ProcessAcceptanceOptions.pageIndex = pageIndex;
			//过程验收
			App.Project.QualityAttr.ProcessAcceptanceCollection.reset();
			App.Project.QualityAttr.ProcessAcceptanceCollection.projectId = projectId;
			App.Project.QualityAttr.ProcessAcceptanceCollection.projectVersionId = projectVersionId;
			App.Project.QualityAttr.ProcessAcceptanceCollection.fetch({
				data: that.ProcessAcceptanceOptions,
				success: function(data) {
					that.pageInfo.call(that, data);
				}
			});
		} else if (type == "openingacceptance") {
			this.OpeningAcceptanceOptions.pageIndex = pageIndex;
			//开业验收
			App.Project.QualityAttr.OpeningAcceptanceCollection.reset();
			App.Project.QualityAttr.OpeningAcceptanceCollection.projectId = projectId;
			App.Project.QualityAttr.OpeningAcceptanceCollection.projectVersionId = projectVersionId;
			App.Project.QualityAttr.OpeningAcceptanceCollection.fetch({
				data: that.OpeningAcceptanceOptions,
				success: function(data) {
					that.pageInfo.call(that, data);
				}
			});

		} else if (type == "concerns") {
			this.ConcernsOptions.pageIndex = pageIndex;
			//隐患
			App.Project.QualityAttr.ConcernsCollection.reset();
			App.Project.QualityAttr.ConcernsCollection.projectId = projectId;
			App.Project.QualityAttr.ConcernsCollection.projectVersionId = projectVersionId;
			App.Project.QualityAttr.ConcernsCollection.fetch({
				data: that.ConcernsOptions,
				success: function(data) {
					that.pageInfo.call(that, data);
				}
			});

		}

	},


	//下一页
	nextPage(event) {
		if ($(event.target).hasClass("disable")) {
			return;
		}
		var $el = this.getContainer();
		var next = +$el.find(".paginationBottom .pageInfo .curr").text() + 1;
		this.getData(next);
	},

	//上一页
	prevPage(event) {
		if ($(event.target).hasClass("disable")) {
			return;
		}
		var $el = this.getContainer();
		var prev = +$el.find(".paginationBottom .pageInfo .curr").text() - 1;
		this.getData(prev);
	},

	//帅选
	filterData() {
		this.getData(1);
	},

	//清空帅选
	clearSearch() {

		var type = App.Project.Settings.property;

		if (type == "materialequipment") {
			this.initOptionsMaterialEquipment();
		} else if (type == "processacceptance") {
			this.initOptionsProcessAcceptance();
		} else if (type == "openingacceptance") {
			this.initOptionsOpeningAcceptance();

		} else if (type == "concerns") {
			this.initOptionsConcerns();
		}
		this.getData(1);
	},

	getContainer() {
		var type = App.Project.Settings.property;
		var $el;
		if (type == "materialequipment") {
			//材料设备
			$el = this.$el.find(".QualityMaterialEquipment");

		} else if (type == "processacceptance") {
			//过程验收
			$el = this.$el.find(".QualityProcessAcceptance");

		} else if (type == "openingacceptance") {
			//开业验收
			$el = this.$el.find(".QualityOpeningAcceptance");


		} else if (type == "concerns") {
			//隐患
			$el = this.$el.find(".QualityConcerns");
		}
		return $el;
	},

	//分页信息
	pageInfo(data) {

		var $el = this.getContainer();

		data = data.toJSON()[0].data;
		$el.find(".paginationBottom .sumCount .count").text(data.totalItemCount);
		$el.find(".paginationBottom .pageInfo .curr").text(data.pageIndex);
		$el.find(".paginationBottom .pageInfo .pageCount").text(data.pageCount);

		if (data.pageIndex == 1) {
			$el.find(".paginationBottom .pageInfo .prev").addClass('disable');
		} else {
			$el.find(".paginationBottom .pageInfo .prev").removeClass('disable');
		}

		if (data.pageIndex >= data.pageCount) {
			$el.find(".paginationBottom .pageInfo .next").addClass('disable');
		} else {
			$el.find(".paginationBottom .pageInfo .next").removeClass('disable');
		}
	}


});