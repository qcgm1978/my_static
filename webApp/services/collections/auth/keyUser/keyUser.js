/**
 * @require /services/collections/index.es6
 */

App.Services.KeyUser = {

  //暂存被点击的关键用户信息的uid
  uuid : '',
  //暂存已被选关键用户的uid数组
  uid : [],

  //暂存已被选关键用户的项目ID数组
  pid : [],

  //暂存已被选关键用户的orgId数组
  orgId : [],

  //暂存已被选关键用户step1的html
  html : [],

  //暂存已被选关键用户step2的html
  html2 : [],

  //暂存已被选关键用户step3的html
  html3 : [],

  userList:[],

  loadData : function(collection,data,fn) {

    data = data || {};
    //collection.reset();
    collection.fetch({
      remove: false,
      data:data,
      success: function(collection, response, options) {
        if(fn && typeof fn == "function"){

          fn(response);
        }
      },
      error: function(collection, response, options) {
        if(fn && typeof fn == "function"){

          fn(response);
        }
      }
    });
  },

  ajax : function(data,cb){
    //是否调试
    if (App.API.Settings.debug) {
      data.url = App.API.DEBUGURL[data.URLtype];
    } else {
      data.url = App.API.Settings.hostname + App.API.URL[data.URLtype];
    }


    return $.ajax(data).done(function(data) {

      if (_.isString(data)) {
        // to json
        if (JSON && JSON.parse) {
          data = JSON.parse(data);
        } else {
          data = $.parseJSON(data);
        }
      }

      //未登录
      if (data.code == 10004) {

        window.location.href = data.data;
      }

      if ($.isFunction(callback)) {
        //回调
        callback(data);
      }

    });
  },

  KeyUserList : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),

    urlType: "fetchServiceKeyUserList"

  })),

  //keyuser infomation

  userinfo : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),

    urlType: "fetchServiceKeyUserList"

  })),

  AddKeyUser : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),


    urlType: "fetchServiceKeyUserList"

  })),
  Step1 : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),


    urlType: "fetchServicesMemberInnerList"

  })),

  Step3 : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),


    urlType: "fetchServicesMemberOuterList"

  })),

  Step2 : new(Backbone.Collection.extend({
    model : Backbone.Model.extend({
      defaults: function() {
        return {
          title: ""
        }
      }
    }),


    urlType: "fetchProjects"

  })),
  init : function(){
    Date.prototype.Format = function (fmt) { //author: meizz
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
  },

  fakedata:{
    "userId": "1018561804",
    "name": "杨俊",
    "position": "操作",
    "org": [
      {
        "orgId": "782132832",
        "name": "旅游控股公司-万达旅业-各地公司-深圳万达国旅",
        "namePath": "旅游控股公司-万达旅业-各地公司-深圳万达国旅",
        "outer": false,
        "parent": null,
        "parentId": "619673733",
        "role": null,
        "privilege": null
      }
    ],
    "isAdmin": false,
    "isKeyUser": true,
    "outer": false,
    "privilege": [
      {
        "id": 1,
        "type": "1",
        "value": "784306105035936"
      },
      {
        "id": 2,
        "type": "1",
        "value": "1"
      },
      {
        "id": 3,
        "type": "1",
        "value": "2"
      }
    ],
    "role": [
      {
        "roleId": 999998,
        "name": "关键用户",
        "inherit": false,
        "functions": null
      },
      {
        "roleId": 1,
        "name": "测试角色",
        "inherit": true,
        "functions": [
          {
            "id": 4,
            "name": "质监",
            "code": "quality"
          },
          {
            "id": 2,
            "name": "模块化",
            "code": "module"
          },
          {
            "id": 3,
            "name": "成本",
            "code": "cost"
          },
          {
            "id": 1,
            "name": "设计",
            "code": "design"
          }
        ]
      },
      {
        "roleId": 10,
        "name": "测试继承",
        "inherit": true,
        "functions": null
      },
      {
        "roleId": 999999,
        "name": "超级管理员",
        "inherit": false,
        "functions": null
      }
    ],
    "function": null
  },
};