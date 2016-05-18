var AppRoute = Backbone.Router.extend({

	routes: {
		'family/:libId': 'family', //族库
		'model/:modelCode/version/:versionId': 'standardLibs', //标准模型库
		'project/:projectCode/version/:versionId': 'project', //项目
		'project/:projectCode/version/:versionId/differ/std': 'projectDifferStd', // 浏览项目模型与标准模型差异


	},

	//浏览项目模型与标准模型差异
	projectDifferStd(projectCode, versionId) {

		//初始化之前 验证
		this.beforeInit(() => {

			_.require('/static/dist/app/project/modelChange/index.css');
			_.require('/static/dist/app/project/modelChange/index.js');
			var temp = _.templateUrl('/page/tpls/model.change.html', true);
			$("body").html(temp);

			App.Index.initApi(projectCode, versionId);

			debugger

		});


	},

	//项目
	project(projectCode, versionId) {

		//初始化之前 验证
		this.beforeInit(() => {

			_.require('/static/dist/projects/projects.css');
			_.require('/static/dist/projects/projects.js');

			App.Project.Settings = $.extend({}, App.Project.Defaults);

			App.Project.Settings.projectId = projectCode;

			App.Project.Settings.versionId = versionId;

			App.Project.init();


		});


	},


	//族库
	family(libIid) {

		//初始化之前 验证
		this.beforeInit(() => {

			_.require('/static/dist/resources/resources.css');
			_.require('/static/dist/resources/resources.js');
			this.resourceModel("famLibs", libIid);
		});

	},

	//标准模型库
	standardLibs(modelCode, versionId) {

		//初始化之前 验证
		this.beforeInit(() => {

			_.require('/static/dist/resources/resources.css');

			_.require('/static/dist/resources/resources.js');

			App.ResourcesNav.Settings.type = App.ResourceModel.Settings.type = "standardLibs";
			App.ResourceModel.Settings.CurrentVersion = {};
			App.ResourceModel.Settings.projectId = modelCode;
			App.ResourceModel.Settings.versionId = versionId;
			App.ResourceModel.init();

		});



	},



	//资源库
	resourceModel: function(type, projectId) {

		//初始化之前 验证
		this.beforeInit(() => {

			_.require('/static/dist/resources/resources.css');

			_.require('/static/dist/resources/resources.js');

			App.ResourcesNav.Settings.type = App.ResourceModel.Settings.type = type;
			App.ResourceModel.Settings.CurrentVersion = {};
			App.ResourceModel.Settings.projectId = projectId;

			App.ResourceModel.initToken();

		});

	},



	//重置数据
	reset: function() {
		//用户信息
		App.Global.User = JSON.parse(localStorage.getItem("user"));

		//销毁上传
		App.Comm.upload.destroy();
		//$("#topBar .userName .text").text(App.Comm.getCookie("OUTSSO_LoginId"));
	},

	//加载之前
	beforeInit(callback) {

		//验证登录
		this.checkLogin((isLogin) => {

			if (!isLogin) {
				return;
			}

			this.reset();

			callback();

		});
	},

	//检查登录
	checkLogin(fn) {

		$("#pageLoading").show();

		App.Comm.Settings.loginType = "token";

		var that = this;
		//是否登录了
		//if (!App.Comm.getCookie("token_cookie")) {
		var Request = App.Comm.GetRequest(),
			appKey = Request.appKey,
			token = Request.token;

		var data = {
			URLtype: "appToken",
			data: {
				appKey: appKey,
				token: 123 || token
			}
		}

		App.Comm.ajax(data, function(data) {
			if (data.code == 0) {

				App.Comm.setCookie("token_cookie", data.data);
				//获取用户信息
				that.getUserInfo(fn);

			} else {
				if (data.code == 10004) {
					window.location.href = data.data;
				} else {
					alert("验证失败");
					fn(false);
				}

			}
		});

		//} else {
		//	fn(true);
		//}
		this.cleanCookie();
	},

	//获取用户信息
	getUserInfo(fn) {


		var that = this;

		$.ajax({
			url: '/platform/user/current'
		}).done(function(data) {
			//失败
			if (data.code != 0) {
				alert("获取用户信息失败");
				fn(false);
				return;
			}

			localStorage.setItem("user", JSON.stringify(data.data));
			fn(true);



		});
	},

	//退出清除cookie
	cleanCookie() {
		//绑定beforeunload事件
		$(window).on('beforeunload', function() {
			App.Comm.delCookie("token_cookie")
		});
	}



});



App.Router = new AppRoute();

//开始监听
Backbone.history.start();