App.Console = {

  Settings: {
    type: 0,
    step: 0
  },

  init() {

    var Settings = App.Console.Settings;

    if(Settings.type && Settings.step){
      //族库
      if(Settings.type == 1){
        App.Console.fam();
      }
      else if(Settings.type == 2){
        //标准模型库
        App.Console.standardModel();
      }
      else if(Settings.type == 3){
        //创建项目
        App.Console.project();
      }
      else if(Settings.type == 4){
        //项目变更
        App.Console.projectChange();
      }
      else if(Settings.type == 5){
        App.Console.CostAccounting();
      }
      else if(Settings.type == 6){
        App.Console.qualityMonitoring();
      }
      else if(Settings.type == 7){
        App.Console.design();
      }
      else if(Settings.type == 8){
        App.Console.cost();
      }

    }
    else{
      //主页面
      var tpl = _.templateUrl('/console1/tpls/console.html', true);
      $("#contains").html(tpl);
    }

  },

  ajaxPost(data, callback) {

    var stringData = JSON.stringify(data.data);

    $.ajax({
      url    : data.url,
      data   : stringData,
      headers: {
        "Content-Type": "application/json"
      },
      type   : "POST"
    }).done(function(data){

      if($.isFunction(callback)){
        callback(data);
      }
    });
  }, //族库
  fam(){
    var tpl        = _.templateUrl('/console1/tpls/fam/fam.html', true);
    $("#contains").html(tpl);
    $.ajax({
      url: "platform/project?type=2&versionStatus=9"
    }).done(function(data) {

      var items = data.data.items;

      $.each(items, function(i, item) {
        if (item.version) {
          $("#p11").append('<option versionid="' + item.version.id + '" value="' + item.id + '">' + item.name + '</option>');
        }

      });
    });
    //获取族库研发指令表单
    $.ajax({
      url: "platform/auditSheet?type=1"
    }).done(function(data) {
      console.log("1",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s21").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //获取族库审核审批单
    $.ajax({
      url: "platform/auditSheet?type=2"
    }).done(function(data) {
      console.log("2",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s31,#s41").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //获取族库发版审批单
    $.ajax({
      url: "platform/auditSheet?type=3"
    }).done(function(data) {
      console.log("3",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s51").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    $("#submit1").click(function(){
      var data       = {
        "msgContent":JSON.stringify({
          "messageId":"411a109141d6473c83a86aa0480d6610",
          "messageType":"PLAN-1002",
          "timestamp":1461142526786,
          "code":0,
          "data":{
            "auditFinishTime": 1461140501424,
            "createTime": 1461140501424,
            "description": "描述",
            "designer": "设计单位",
            "developFinishDate": 1461140501452,
            "familyCode": $("#p13").val().trim(),
            "familyName": $("#p12").val().trim(),
            "refFalimyCode": $("#p11").val().trim(),
            "status": 16,
            "workflowId": parseInt(9999999*Math.random()),
            "title": $("#p12").val().trim()
          }
        }),
        "msgCreateTime": 1461727280227,
        "msgId": "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime": 0,
        "srcMsgType": "PLAN-1002",
        "retryTimes": 0,
        "status": 0,
        "sysCode": "1"
      };
      var stringData = JSON.stringify(data);
      App.Console.post(stringData);

    });


    $("#submit2").click(function(){
      var data = {
            workflowId:parseInt(9999999*Math.random()),
            familyDevelopWorkflowId:$('#s21').val().trim()
      };
      App.Console.apply(1,1003,data);
    });

    $("#submit3").click(function(){
      var data = {
        workflowId:$('#s31').val().trim()
      };
      App.Console.apply(2,1004,data);

    });
    $("#submit33").click(function(){
      var data = {
        workflowId:$('#s31').val().trim(),
        status:4
      };
      App.Console.apply(2,1004,data);

    });
    $("#submit4").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        familyAprovalWorkflowId:$('#s41').val().trim()
      };
      App.Console.apply(3,1005,data);

    });
    $("#submit5").click(function(){
      var data = {
        workflowId:$('#s51').val().trim()
      };
      App.Console.apply(4,1006,data);

    });
    $("#submit55").click(function(){
      var data = {
        workflowId:$('#s51').val().trim(),
        status:4

      };
      App.Console.apply(4,1006,data);

    });
  },
  standardModel(){
    var tpl        = _.templateUrl('/console1/tpls/standardModel/standardmodel.html', true);
    $("#contains").html(tpl);
    $.ajax({
      url: "platform/project?type=1"
    }).done(function(data) {

      var items = data.data.items;

      $.each(items, function(i, item) {
        if (item.version) {
          $("#s11").append('<option versionid="' + item.version.id + '" value="' + item.id + '">' + item.name + '</option>');
        }

      });
    });
    //获取研发标准模型指令审批单
    $.ajax({
      url: "platform/auditSheet?type=4"
    }).done(function(data) {
      console.log("1",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s21").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //获取标准模型报审表单
    $.ajax({
      url: "platform/auditSheet?type=5"
    }).done(function(data) {
      console.log("2",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s31,#s41").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //获取标准模型发布表单
    $.ajax({
      url: "platform/auditSheet?type=6"
    }).done(function(data) {
      console.log("3",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s51").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    $('#s11').change(function(){
      $("#p14").val($(this).children('option:selected').attr("versionid"));
    });

    $("#submit1").click(function(){
      var data = {
       workflowId:parseInt(9999999*Math.random()),
        refModelCode:$('#s11').val().trim(),
        refModelVersionId:$('#p14').val().trim(),
        modelCode:$('#p11').val().trim(),
        modelName:$('#p12').val().trim(),
        modelVersionName:$('#p13').val().trim()
      };
      App.Console.apply(1,1007,data);

    });


    $("#submit2").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        standardModelDevelopWorkflowId:$('#s21').val().trim()
      };
      App.Console.apply(2,1008,data);
    });

    $("#submit3").click(function(){
      var data = {
        //workflowId:parseInt(9999999*Math.random()),
        workflowId:$('#s31').val().trim()
      };
      App.Console.apply(3,1009,data);

    });
    $("#submit33").click(function(){
      var data = {
        status:4,
        workflowId:$('#s31').val().trim()
      };
      App.Console.apply(3,1009,data);

    });

    $("#submit4").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        standardModelAprovalWorkflowId:$('#s41').val().trim()
      };
      App.Console.apply(4,1010,data);

    });
    $("#submit5").click(function(){
      var data = {
        //workflowId:parseInt(9999999*Math.random()),
        workflowId:$('#s51').val().trim()
      };
      App.Console.apply(5,1011,data);

    });
    $("#submit55").click(function(){
      var data = {
        status:4,
        workflowId:$('#s51').val().trim()
      };
      App.Console.apply(5,1011,data);

    });
  },
  project(){
    var tpl        = _.templateUrl('/console1/tpls/project/project.html', true);
    $("#contains").html(tpl);
    $.ajax({
      url: "platform/project?type=1"
    }).done(function(data) {

      var items = data.data.items;

      $.each(items, function(i, item) {
        if (item.version) {
          $("#s11").append('<option versionid="' + item.version.id + '" value="' + item.id + '">' + item.name + '</option>');
        }

      });
    });
    $('#s11').change(function(){
      $("#p13").val($(this).children('option:selected').attr("versionid"));
    });

    //7获取
    $.ajax({
      url: "platform/auditSheet?type=20"
    }).done(function(data) {
      console.log("1",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s21").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //8获取
    $.ajax({
      url: "platform/auditSheet?type=7"
    }).done(function(data) {
      console.log("2",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s31,#s41").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });
    //9获取
    $.ajax({
      url: "platform/auditSheet?type=8"
    }).done(function(data) {
      console.log("3",data);
      var items = data.data;

      $.each(items, function(i, item) {
        if (item.title) {
          $("#s51").append('<option  value="' + item.no + '">' + item.title + '</option>');
        }

      });
    });

    $("#submit1").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        projectCode:$('#p11').val().trim(),
        projectName:$('#p12').val().trim()
        //modelCode:$('#p11').val().trim(),
        //modelName:$('#s11').val().trim(),
        //modelVersionName:$('#p13').val().trim()
      };
      App.Console.apply(1,1012,data);

    });


    $("#submit2").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        projectModelInstructionsWorkflowId:$('#s21').val().trim()

      };
      App.Console.apply(2,1013,data);
    });

    $("#submit3").click(function(){
      var data = {
        //workflowId:parseInt(9999999*Math.random()),
        workflowId:$('#s31').val().trim()

      };
      App.Console.apply(3,1014,data);

    });
    $("#submit33").click(function(){
      var data = {
        status:4,
        workflowId:$('#s31').val().trim()

      };
      App.Console.apply(3,1014,data);

    });
    $("#submit4").click(function(){
      var data = {
        workflowId:parseInt(9999999*Math.random()),
        projectModelAprovalWorkflowId:$('#s41').val().trim()

      };
      App.Console.apply(4,1015,data);

    });
    $("#submit5").click(function(){
      var data = {
        //workflowId:parseInt(9999999*Math.random()),
        workflowId:$('#s51').val().trim()

      };
      App.Console.apply(5,1016,data);

    });
    $("#submit55").click(function(){
      var data = {
        status:4,
        workflowId:$('#s51').val().trim()

      };
      App.Console.apply(5,1016,data);

    });
  },

  //质量监测
  qualityMonitoring(){
    var Settings = App.Console.Settings;
    //发起
    if(Settings.step == 1){
      var tpl = _.templateUrl('/console1/tpls/qualityMonitoring/materiallist.html', true);
      $("#contains").html(tpl);

      App.Console.qm1();

    }
    else if(Settings.step == 2){
      var tpl = _.templateUrl('/console1/tpls/qualityMonitoring/acceptance.html', true);
      $("#contains").html(tpl);

      App.Console.qm2();

    }
    else if(Settings.step == 3){
      var tpl = _.templateUrl('/console1/tpls/qualityMonitoring/danger.html', true);
      $("#contains").html(tpl);

      App.Console.qm3();

    }
    else if(Settings.step == 4){
      var tpl = _.templateUrl('/console1/tpls/qualityMonitoring/component.html', true);
      $("#contains").html(tpl);

      App.Console.qm4();

    }
  }, //获取项目列表
  getProjects(Type, cb){
    $.ajax({
      url: "/platform/project?type=" + Type
    }).done(function(data){

      cb(data)
    });
  }, //获取项目质量材料设备列表
  qm1(){
    $.ajax({
      url: "/platform/mapping/project?type=3"
    }).done(function(data){
      var str = '', datas = data.data;

      $.each(datas, function(index, data){
        console.log(data)
        str += "<option value=" + data.projectCode + ">" + data.projectName + "</option>";
      });

      $('#s11').append(str)

    });

    $("#submit").click(function(){
      var data = {
        "id"           : $('#p11').val().trim(),
        "projectCode"  : $('#s11').val().trim(),
        "specialtyName": $('#s12 option:selected').text().trim(),
        "specialtyId"  : $('#s12').val().trim(),
        "categoryId"   : $('#s13').val().trim(),
        "categoryName" : $('#s13 option:selected').text().trim(),
        "name"         : $('#p12').val().trim()

      };
      App.Console.apply(1, 1001, data, 1);
    });


  },

  //获取项目质量验收列表

  qm2(){
    //2.2	过程验收
    $("#submit").click(function(){
        var data       = {
          "msgContent":JSON.stringify({
            "messageId":"411a109141d6473c83a86aa0480d6610",
            "messageType":"QUALIFY-1002",
            "timestamp":(new Date).getTime(),
            "code":0,
            "data":JSON.parse($('#data').val())

          }),
          "msgCreateTime": 1461727280227,
          "msgId": "b2e5b467ef214f6196ac3f826017806e",
          "msgSendTime": 0,
          "srcMsgType": "QUALIFY-1002",
          "retryTimes": 0,
          "status": 0,
          "sysCode": "1"
        };
        var stringData = JSON.stringify(data);
        $.ajax({
          url    : "sixD/internal/message",
          data   : stringData,
          headers: {
            "Content-Type": "application/json"
          },
          type   : "POST"
        }).done(function(data){
          $("#result").val(JSON.stringify(data))
          console.log(data)
          if(data.message == "success"){
            alert("成功");
          }

        });
  });

    //2.3	开业验收
    $("#submit1").click(function(){
      var data       = {
        "msgContent":JSON.stringify({
          "messageId":"411a109141d6473c83a86aa0480d6610",
          "messageType":"QUALIFY-1003",
          "timestamp":(new Date).getTime(),
          "code":0,
          "data":JSON.parse($('#data1').val())

        }),
        "msgCreateTime": 1461727280227,
        "msgId": "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime": 0,
        "srcMsgType": "QUALIFY-1003",
        "retryTimes": 0,
        "status": 0,
        "sysCode": "1"
      };
      var stringData = JSON.stringify(data);
      $.ajax({
        url    : "sixD/internal/message",
        data   : stringData,
        headers: {
          "Content-Type": "application/json"
        },
        type   : "POST"
      }).done(function(data){
        console.log(data)
        $("#result1").val(JSON.stringify(data))
        if(data.message == "success"){
          alert("成功");
        }

      });
    })
  },
  //获取项目质量隐患列表

  qm3(){
    //2.2	过程验收
    $("#submit").click(function(){
      var data       = {
        "msgContent":JSON.stringify({
          "messageId":"411a109141d6473c83a86aa0480d6610",
          "messageType":"QUALIFY-1004",
          "timestamp":(new Date).getTime(),
          "code":0,
          "data":JSON.parse($('#data').val())

        }),
        "msgCreateTime": 1461727280227,
        "msgId": "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime": 0,
        "srcMsgType": "QUALIFY-1004",
        "retryTimes": 0,
        "status": 0,
        "sysCode": "1"
      };
      var stringData = JSON.stringify(data);
      $.ajax({
        url    : "sixD/internal/message",
        data   : stringData,
        headers: {
          "Content-Type": "application/json"
        },
        type   : "POST"
      }).done(function(data){
        $("#result").val(JSON.stringify(data))
        console.log(data)
        if(data.message == "success"){
          alert("成功");
        }

      });
    })

  },
  //获取验收、隐患对应的构件

  qm4(){
    //2.5	验收合格数据
    $("#submit").click(function(){
      var data       = {
        "msgContent":JSON.stringify({
          "messageId":"411a109141d6473c83a86aa0480d6610",
          "messageType":"QUALIFY-1005",
          "timestamp":(new Date).getTime(),
          "code":0,
          "data":JSON.parse($('#data').val())

        }),
        "msgCreateTime": 1461727280227,
        "msgId": "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime": 0,
        "srcMsgType": "QUALIFY-1005",
        "retryTimes": 0,
        "status": 0,
        "sysCode": "1"
      };
      var stringData = JSON.stringify(data);
      $.ajax({
        url    : "sixD/internal/message",
        data   : stringData,
        headers: {
          "Content-Type": "application/json"
        },
        type   : "POST"
      }).done(function(data){
        $("#result").val(JSON.stringify(data))
        console.log(data)
        if(data.message == "success"){
          alert("成功");
        }

      });
    })
  },

  //设计
  design(){
    var Settings = App.Console.Settings;
    //发起
    if(Settings.step == 1){
      var tpl = _.templateUrl('/console1/tpls/design/designlist.html', true);
      $("#contains").html(tpl);

      App.Console.ds1();

    }
  }, //获取设计检查列表
  ds1(){

    //3.1	设计检查
    $("#submit").click(function(){
      var data       = {
        "msgContent":JSON.stringify({
          "messageId":"411a109141d6473c83a86aa0480d6610",
          "messageType":"QUALIFY-1006",
          "timestamp":(new Date).getTime(),
          "code":0,
          "data":JSON.parse($('#data').val())

        }),
        "msgCreateTime": 1461727280227,
        "msgId": "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime": 0,
        "srcMsgType": "QUALIFY-1006",
        "retryTimes": 0,
        "status": 0,
        "sysCode": "1"
      };
      var stringData = JSON.stringify(data);
      $.ajax({
        url    : "sixD/internal/message",
        data   : stringData,
        headers: {
          "Content-Type": "application/json"
        },
        type   : "POST"
      }).done(function(data){
        $("#result").val(JSON.stringify(data))
        console.log(data)
        if(data.message == "success"){
          alert("成功");
        }

      });
    })
  },


  cost(){
    var tpl = _.templateUrl('/console1/tpls/cost/cost.html', true);
    $("#contains").html(tpl);

    $.ajax({
      url: "/platform/project/1/version"
    }).done(function(data){
      var str = '', datas = data.data;

      $.each(datas, function(index, data){
        console.log(data)
        str += "<option value=" + data.id + ">" + data.name + "</option>";
      });

      $('.versionList').append(str)

    });

    $("#submit1").click(function(){
      var data  = {
        projectId       : 1,
        projectVersionId: $('#p11').val().trim()

      };
      var param = {
        noElement: $("#p12").val().trim()

      };

      $.ajax({
        url : "sixD/1/" + data.projectVersionId + "/cost/summary" + App.Console.param(param),
        type: "GET"
      }).done(function(data){
        console.log(data);
        if(data.message == "success"){
          alert("成功");
        }

      });
    });

    $("#submit2").click(function(){
      var data  = {
        projectId       : 1,
        projectVersionId: $('#p21').val().trim()

      };
      var param = {
        costCode: $("#p22").val().trim()

      };

      $.ajax({
        url : "sixD/1/" + data.projectVersionId + "/cost/element" + App.Console.param(param),
        type: "GET"
      }).done(function(data){
        console.log(data);
        if(data.message == "success"){
          alert("成功");
        }

      });
    });

    $("#submit3").click(function(){
      var data  = {
        projectId       : 1,
        projectVersionId: $('#p31').val().trim()

      };
      //var param = {
      //  costCode: $("#p32").val().trim()
      //
      //};

      $.ajax({
        url : "sixD/1/" + data.projectVersionId + "/cost/nocost/cate" ,
        type: "GET"
      }).done(function(data){
        console.log(data);
        if(data.message == "success"){
          alert("成功");
        }

      });
    });
  },
  //项目变更
  projectChange() {
    var tpl        = _.templateUrl('/console1/tpls/projectChange/projectchange.html', true);
    $("#contains").html(tpl);
    App.Console.auditSheet(9,function(datas){
      var str = '';
      console.log(datas)

      $.each(datas.data, function(index, data){
        console.log(data)
        str += "<option value=" + data.no + ">" + data.title + "</option>";
      });

      $('#p21').append(str)
    },0);

    $("#submit4").click(function(){
     App.Console.apply(1,1019);
    });
    $("#submit5").click(function(){
      App.Console.apply(2,1020);
    });
    $("#submit6").click(function(){
      App.Console.apply(3,1021);
    });
    $("#submit7").click(function(){
      App.Console.apply(4,1022);
    });
    $("#submit8").click(function(){
      App.Console.apply(5,1023);
    });
    $("#submit9").click(function(){
      App.Console.apply(6,1024);
    });
  },
  apply(index, num, obj, type){
    var datainit = JSON.parse($('#data' + index).val());
    if(typeof obj != 'undefined'){
      console.log(datainit)
      for(var g in obj){
        datainit[g] = obj[g];

      }
      var data = {
        "msgContent"   : JSON.stringify({
          "messageId"  : "411a109141d6473c83a86aa0480d6610",
          "messageType": (type == '1' ? "QUALIFY-" : "PLAN-") + num,
          "timestamp"  : (new Date).getTime(),
          "code"       : 0,
          "data"       : type == 1 ? new Array(datainit) : datainit

        }),
        "msgCreateTime": 1461727280227,
        "msgId"        : "b2e5b467ef214f6196ac3f826017806e",
        "msgSendTime"  : 0,
        "srcMsgType"   : "PLAN-" + num,
        "retryTimes"   : 0,
        "status"       : 0,
        "sysCode"      : "1"
      };
    }


    $.ajax({
      url    : type == 1 ? "sixD/internal/message" : "platform/internal/message",
      data   : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      type   : "POST"
    }).done(function(data){
      $("#result" + index).val(JSON.stringify(data))
      console.log(data)

    });
  },
  //2016-1-1转成时间戳
  getTime(str){
    var dd = str.split('-');
    var d  = new Date();
    d.setFullYear(dd[0]);
    d.setMonth(dd[1]);
    d.setDate(dd[2]);
    return d.getTime();
  },
  //url加参数
  param(obj){
    var str = '';
    for(var i in obj){
      str += "&" + i + "=" + obj[i];
    }
    return "?" + str.substr(1);
  },
  fileUpload: function(){

    $("#submit").click(function(){

      var projectId = $("#projectId").val().trim(), projectVersionId = $("#projectVersionId").val().trim(), filesId = $("#filesId").val().trim();

      if(!projectId){
        alert("请输入项目id");
        return;
      }
      if(!projectVersionId){
        alert("请输入项目版本id");
        return;
      }
      if(!filesId){
        alert("请输入文件id");
        return;
      }

      var url = "doc/" + projectId + "/" + projectVersionId + "/cost?files=" + filesId;

      $.ajax({
        url : url,
        type: "POST"
      }).done(function(data){
        if(data.message == "success"){
          alert("success");
        }
      });

    });

  },
  //模块化公用POST请求
  post(datas){
    $.ajax({
      url    : "platform/internal/message",
      data   : datas,
      headers: {
        "Content-Type": "application/json"
      },
      type   : "POST"
    }).done(function(data){
      console.log(data)
      if(data.message == "success"){
        alert("成功");
      }

    });
  },

  auditSheet(type,cb,result,id){
    $.ajax({
      url    : "platform/auditSheet?type="+type+"&auditResult="+(result||'')+(id?("&projectId="+id):"")
      //headers: {
      //  "Content-Type": "application/json"
      //},
    }).done(function(data){
      console.log(data)
      if(data.message == "success"){
        cb && cb(data);
      }
    });
  }
};