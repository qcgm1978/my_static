/**
 * @require /resources/collection/resource.nav.es6
 */
//App.Resources.artifactsTreeData;//所有数据
App.Resources.artifactsTree = function(dataList,code){
    var data = [];
    if(!code){
        data = _.filter(dataList,function(item){
            return !item.parentCode
        });
        //注意有个其他选项,code == -1
    }else{
        data = _.filter(dataList,function(item){
            return item.parentCode == code
        });
    }
    var ele  = $("<ul></ul>");
    for(var i =0 ; i < data.length ; i++){
        if(data[i].code ==  "-1"){ break}
        var model = Backbone.Model.extend({
            defaults:function(){
                return{
                    title:''
                }
            }
        });
        var initModel = new model(data[i]);
        var li = $("<li></li>");
        li.append(new App.Resources.ArtifactsWindowRuleDetail({model:initModel}).render().el);
        li.append("<div class='childList' data-code='"+data[i].code +"'></div>");
        ele.append(li);
        App.Comm.initScroll($("#resourcesArtifactTree"),"y");
    }
    return ele;
};

//队列管理
App.Resources.queue = {
    que : [],
    permit : true,
    present : [],
    //许可证发放，400ms后发放一个许可证，避免点击过快
    certificates:function(){
        this.permit = false;
        setTimeout(function(){
            App.Services.queue.permit = true;
        },400);
    },
    //验证并向队列添加执行函数
    promise:function(fn,_this){
        if(!this.permit){ return;}
        if(!this.que.length){//没有直接添加
            this.que.push(fn);
            this.present.push(_this);
            this.que[0]();
            this.certificates();
            return;
        }

        /*if(this.que.length > 1){
            return
        }*/
        this.present.push(_this);
        this.que.push(fn);
        this.certificates();
    },
    stop:function(){

    },
    //执行完毕，刷新队列，执行下一个
    next:function(){
        this.que.shift();
        this.present.shift();
        if(this.que.length){
            this.que[0]();
        }
    }
};
