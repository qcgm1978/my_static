var AppRoute = Backbone.Router.extend({

	routes: {
		'family/:libId': 'family',
		'model/:modelCode/version/:versionId': 'standardLibs'

	},

	//族库
	family(libIid) {

		//验证登录
		this.checkLogin((isLogin) => {

			if (!isLogin) {
				return;
			}

			this.resourceModel("famLibs", libIid);

		});

	},

	//标准模型库
	standardLibs(modelCode, versionId) {

		//验证登录
		this.checkLogin((isLogin) => {

			if (!isLogin) {
				return;
			}

			this.reset();

			$("#topBar .navHeader").find(".item").removeClass("selected").end().find(".resources").addClass('selected');

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


		this.reset();

		$("#topBar .navHeader").find(".item").removeClass("selected").end().find(".resources").addClass('selected');

		_.require('/static/dist/resources/resources.css');

		_.require('/static/dist/resources/resources.js');

		App.ResourcesNav.Settings.type = App.ResourceModel.Settings.type = type;
		App.ResourceModel.Settings.CurrentVersion = {};
		App.ResourceModel.Settings.projectId = projectId;

		App.ResourceModel.initToken();



	},



	//重置数据
	reset: function() {
		//用户信息
		App.Global.User = JSON.parse(localStorage.getItem("user"));

		//销毁上传
		App.Comm.upload.destroy();
		//$("#topBar .userName .text").text(App.Comm.getCookie("OUTSSO_LoginId"));
	},

	//检查登录
	checkLogin(fn) {

		$("#pageLoading").show();

		$("#topBar .bodyConMenu").remove().end().find(".flow").remove().end().find(".services").remove();
		App.Comm.Settings.loginType = "token";

		var that = this;
		//是否登录了
		if (!App.Comm.getCookie("token_cookie")) {
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

		} else {
			fn(true);
		}
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