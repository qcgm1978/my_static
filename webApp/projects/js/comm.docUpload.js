/**
 * @author baoym@grandsoft.com.cn
 */
(function($) {

    'use strict'

    var docUpload = {

        __container: null,

        init: function(container, options) {
            var self = this
            self.__options = options
            self.__container = container

            //添加元素
            var upload = $('<div>', {
                'class': 'mod-plupload'
            }).appendTo(container)

            //初始化
            App.Comm.upload.init(upload, {

                getParentId: function() {
                    return App.Project.Settings.fileId; 
                },

                getQuotaInfo: function() {
                    return self.getQuotaInfo()
                },

                //是否可以上传
                canUploadFile: function() {

                    if (App.Project.Settings.fileId) {
                        return true;
                    }else{
                        return false;
                    }
                    //return App.Comm.modules.util.canUploadFile()
                },

                // getUploadedBytesUrl: function(parentId) {
                //     // return App.Comm.modules.util.getUrl(parentId, {
                //     //     bytes: false
                //     // })
                // },

                //获取上传url
                getUploadUrl: function(file) {
                  
               
                    var data = {
                        data: {
                            projectId: App.Project.Settings.projectId,
                            projectVersionId: App.Project.Settings.CurrentVersion.id
                        }, 
                        URLtype: "uploadFile"
                    }; 

                    return  App.Comm.getUrlByType(data).url; 


                    //return "http://172.16.233.210:8080/bim/api/1232321/file/data?fileId=444444444444";
                    // return App.Comm.modules.util.getUrl(App.Comm.modules.util.getParentId(), {
                    //     upload: false,
                    //     returnFirst: false
                    // })
                },

                //上传成功
                fileUploaded: function(response, file) {  
                     var data=JSON.parse(response.response);
                     App.Project.FileCollection.push(data.data); 
                },

                //上传失败
                uploadError: function(file) {
                    alert('上传失败:' + file.message + '。文件：' + file.file.name)
                }
            })
            self.updateQuotaInfo()
        },

        //获取上传容量
        getQuotaInfo: function() {
            var quota = this.quota;
            return "共 20GB，已用 564.2MB"; //App.Comm.modules.util.format('共 $0，已用 $1', [App.common.modules.util.formatSize(quota.total), App.common.modules.util.formatSize(quota.used)])
        },

        //更新上传容量
        updateQuotaInfo: function() {
            App.Comm.upload.setQuotaInfo(this.getQuotaInfo())
        }
    }

    App.modules.docUpload = docUpload

})(jQuery)