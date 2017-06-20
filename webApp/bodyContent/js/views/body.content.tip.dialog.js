/*
 * @require /bodyContent/js/app.js
 */
var App = App || {};
App.BodyContent.App.TipDialogV = Backbone.View.extend({
	className: 'divBox',
    template:_.templateUrl("/bodyContent/tpls/bodyContent.tipDialog.html",true),
    render:function(){
        this.$el.html(this.template);
        this.getTipDataHandle();//获取提示信息的方法
        this.initHandle();//初始化事件
        return this;
    },
    initHandle:function(){//初始化事件
    	var _this = this;
    	this.$el.find("a.yesKnow").on("click",function(){
            _this.closeDialog();//关闭弹出框
            localStorage.setItem("yesKnow",true);
        })
        
        this.$el.find("a.nowToComplete").on("click",function(){//#/logout
            if(!_this.$el.find("a.yesKnow").hasClass('canLookBtn')){
                setTimeout(function(){
                    _this.closeDialog();//立即参与培训 之后页面退到登录页面
                    window.location.href = "#/logout";
                },10000)
            }
        }) 
    },
    closeDialog:function(){//关闭弹出框
    	$("#tipDialogBgBox").hide();
    	$("#tipDialogBox").hide();
    },
    getTipDataHandle:function(){//获取提示信息的方法
        var _this = this;
        var html = "";
        var dialogMessage = this.$el.find("#dialogMessage");
        var data = {
        	URLtype: "current",
        }
        App.Comm.ajax(data,function(data){
            console.log("测试测试=====",12345678910);
        	if(data.code == 0){
                var currentTime = data.data.currentTime;
        		var learnStatus = data.data.learnStatus;
                if(learnStatus){
                    if(learnStatus.beforestationstatus == 0){//未通过上岗
                        html = '您的上岗培训还差<i>'+learnStatus.bslessnum+'</i>个内容(共<span>'+learnStatus.bstotalnum+'</span>个内容)就可以完成啦!请您尽快完成剩余学时的学习哦!'
                        _this.$el.find("a.yesKnow").hide().removeClass("canLookBtn");
                        _this.$el.find("a.nowToComplete").attr("href","http://bimrzuat.wanda-dev.cn"+learnStatus.pturl);
                        dialogMessage.html(html);
                        $("#tipDialogBgBox").show();
                        $("#tipDialogBox").show();
                    }else if(learnStatus.beforestationstatus == 1){//通过了上岗
                        var endDateObj = new Date(learnStatus.enddate);
                        var endDate = endDateObj.getTime();
                        var getFullYear = endDateObj.getFullYear();
                        var getMonth = (endDateObj.getMonth()+1)>=10?endDateObj.getMonth()+1:"0"+(endDateObj.getMonth()+1);
                        var getDay = endDateObj.getDate()>=10?endDateObj.getDate():"0"+endDateObj.getDate();
                        var endDateStr = getFullYear+"年"+getMonth+"月"+getDay+"日";
                        if(learnStatus.onstationstatus == 0){//在岗未通过
                            if(currentTime>endDate){//是否在规定日期完成培训
                                _this.$el.find("a.yesKnow").hide().removeClass("canLookBtn");
                            }
                            html = '您在岗培训还差<i>'+learnStatus.oslessnum+'</i>个内容(共<span>'+learnStatus.ostotalnum+'</span>个内容)就可以完成啦！请最晚于<i id="endStr">'+endDateStr+'</i>之前完成剩余内容的学习，加油哦'
                            dialogMessage.html(html);
                            _this.$el.find("a.nowToComplete").attr("href","http://bimrzuat.wanda-dev.cn"+learnStatus.pturl);
                            $("#tipDialogBgBox").show();
                            $("#tipDialogBox").show();
                        }
                    }
                }
        	}else{
        		alert(data.message);
        	}
        })
    }
});