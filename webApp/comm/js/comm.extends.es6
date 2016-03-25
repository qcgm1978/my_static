/**
 * @require /comm/js/comm.es6 
 */

// underscore 扩展 


App.Comm.templateCache = [];

//获取模板根据URL
_.templateUrl = function(url, notCompile) {

	if (url.substr(0, 1) == ".") {
		url = "/static/dist/tpls" + url.substr(1);
	} else if (url.substr(0, 1) == "/") {
		url = "/static/dist/tpls" + url;
	}

	if (App.Comm.templateCache[url]) {
		return App.Comm.templateCache[url];
	}

	var result;
	$.ajax({
		url: url,
		type: 'GET',
		async: false
	}).done(function(tpl) {
		if (notCompile) {
			result = tpl;

		} else {
			result = _.template(tpl);
		}

	});

	App.Comm.templateCache[url] = result;

	return result;
}

App.Comm.requireCache = [];



//按需加载 
_.require = function(url) {

	var index = url.lastIndexOf(".");
	var type = url.substring(index + 1);

	url = url.substring(0, index) + "_" + App.Comm.Settings.v + "." + type;

	//加载过不再加载
	if (App.Comm.requireCache.indexOf(url) == -1) {
		App.Comm.requireCache.push(url);
	} else {
		return;
	}


	if (type == "js") {
		$("head").append('<script type="text/javascript" src="' + url + '"></script>');
	} else if (type = "css") {
		$("head").append('<link rel="styleSheet" href="' + url + '" />');
	}
}


// 拼接字符串扩展
function StringBuilder() {
	this._buffers = [];
	this._length = 0;
	this._splitChar = arguments.length > 0 ? arguments[arguments.length - 1] : '';

	if (arguments.length > 0) {
		for (var i = 0, iLen = arguments.length - 1; i < iLen; i++) {
			this.Append(arguments[i]);
		}
	}
}



Array.prototype.removeByItem = function(item) {

	var index = this.indexOf(item);
	if (index >= 0) {
		this.splice(index, 1);
		return true;
	}
	return false; 

}

//向对象中添加字符串
//参数：一个字符串值
StringBuilder.prototype.Append = function(str) {
	this._length += str.length;
	this._buffers[this._buffers.length] = str;
}
StringBuilder.prototype.Add = StringBuilder.prototype.append;
StringBuilder.prototype.IsEmpty = function() {
		return this._buffers.length <= 0;
	}
	//清空
StringBuilder.prototype.Clear = function() {
	this._buffers = [];
	this._length = 0;
}
StringBuilder.prototype.toString = function() {
		if (arguments.length == 1) {
			return this._buffers.join(arguments[1]);
		} else {
			return this._buffers.join(this._splitChar);
		}
	}
	//格式化
StringBuilder.prototype.AppendFormat = function() {
	if (arguments.length > 1) {
		var TString = arguments[0];
		if (arguments[1] instanceof Array) {
			for (var i = 0, iLen = arguments[1].length; i < iLen; i++) {
				var jIndex = i;
				var re = eval("/\\{" + jIndex + "\\}/g;");
				TString = TString.replace(re, arguments[1][i]);
			}
		} else {
			for (var i = 1, iLen = arguments.length; i < iLen; i++) {
				var jIndex = i - 1;
				var re = eval("/\\{" + jIndex + "\\}/g;");
				TString = TString.replace(re, arguments[i]);
			}
		}
		this.Append(TString);
	} else if (arguments.length == 1) {
		this.Append(arguments[0]);
	}
}

/** trim() method for String */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.format = function(fmt) { //author: meizz  

	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

Date.prototype.shortFormat = function() {

	var CapitalMonth = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
		month = CapitalMonth[this.getMonth()];


	return this.getFullYear() + "年" + month + "月";
}

//格式化字符串
//两种调用方式
// var template1="我是{0}，今年{1}了";
// var template2="我是{name}，今年{age}了";
// var result1=template1.format("loogn",22);
// var result2=template2.format({name:"loogn",age:22});
String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof(args) == "object") {
			for (var key in args) {
				if (args[key] != undefined) {
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		} else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
					　　　　　　　　　　　　
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
}

var BackboneSync = Backbone.sync;
//重写backbone 的 sync 
Backbone.sync = function(method, model, options) {
	 
	// 在没有url 的情况下 取 api 的值 以防有特别的处理
	//if (!model.url) 
	//测试
	if (App.API.Settings.debug) {
		model.url = App.API.DEBUGURL[model.urlType];
	} else {
		model.url = App.API.Settings.hostname + App.API.URL[model.urlType];
		//跨域
		// if (!options.crossDomain) {
		// 	options.crossDomain = true;
		// }

		// if (!options.xhrFields) {
		// 	options.xhrFields = {
		// 		withCredentials: true
		// 	};
		// }
		// options.dataType = "jsonp"; 
	}
	//}

	//url 是否有参数
	var urlPars = model.url.match(/\{([\s\S]+?(\}?)+)\}/g);
	if (urlPars) {
		for (var i = 0; i < urlPars.length; i++) {
			var rex = urlPars[i],
				par = rex.replace(/[{|}]/g, ""),
				val = model[par];
			if (val) {
				model.url = model.url.replace(rex, val);
			}
		}
	}



	// if (App.Comm.Settings.debug) {
	// 	//调用backbone 原本的方法
	// 	return BackboneSync.apply(this, arguments);
	// } else {
	// 	return $.ajax({
	// 		url: "http://172.16.233.97:9090/platform/api/todo",
	// 		dataType: "jsonp"
	// 	});
	// }

	//调用backbone 原本的方法
	return BackboneSync.apply(this, arguments);
};