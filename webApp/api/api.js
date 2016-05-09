// 注意  删除操作 参数需要在url 中 jq 不会 处理 所以 url 命名的时候 以 delete 开头，我会处理

App.API = {

	Settings: {
		hostname: "http://bim.wanda-dev.cn/",
		debug: false
	},

	URL: {

		//首页bodyContent数据
		fetchBodyContentTodos :'platform/todo',
		//本月开始、到期接口
		fetchBodyContentMonthEnd :'sixD/plan/concern/index',//?type={type}&userId={userId}
		fetchBodyContentMonthStart :'sixD/plan/concern/index',

		fetchBodyContentSlide :'dataJson/bodyContent/bodyContent.slide.json',
		fetchBodyContentMmhSlide :'platform/project',
		fetchBodyContentProclamation :'dataJson/bodyContent/bodyContent.proclamation.json',

		//services
		fetchServicesRolesList:'platform/auth/role',//角色列表
		fetchServicesSaveRole:'platform/auth/role',//角色列表
		fetchServicesFunList: 'platform/auth/function',//功能列表
		fetchServicesOzRoleList:'platform/auth/org/{orgId}/role?outer={outer}',//机构角色
		fetchServicesUserRoleList:'platform/auth/user/{userId}/role?outer={outer}',//用户角色
		putServicesSaveRole:'platform/auth/role/grant',//保存用户角色
		putServicesRoleFun:'platform/auth/role/{roleId}/function?functionId=111,222,333',//保存角色功能，未用
		fetchServicesNewRole:'platform/auth/role',//新增角色
		fetchServiceMemberList:'platform/auth/org',
		fetchServicesMemberOuterList:'platform/auth/org?outer=true',//外部组织-品牌／公司／成员列表
		fetchServicesMemberInnerList:'platform/auth/org?outer=false',//内部-组织／成员列表
		deleteServicesRoleSingle:"platform/role?",//删除角色


		fetchServiceKeyUserList:'platform/auth/keyUser',//关键用户列表
		fetchServiceKeyUserEdit:'platform/auth/keyUser/{uid}',//修改关键用户
		fetchServiceKeyUserInfo:'platform/auth/keyUser/{uid}',//获取个别关键用户信息
		fetchServiceKeyUserDelete:'platform/auth/keyUser/{uid}',//删除关键用户
		fetchServiceStep1:'platform/auth/org?outer=false&parentId=&includeUsers=',//项目列表
		fetchServicesProjectMemberProjectList:'platform/auth/user/{userId}/dataPrivilege/project',//项目成员/项目管理
		fetchServicesProjectMemberMemberList:'platform/auth/{dataPrivilegeId}/member',//项目成员/项目管理




		//代办$chars
		fetchTodoData: "platform/todo", //获取代办数据

		//项目
		fetchProjects: "platform/project?type=3", //项目列表
		fetchProjectBaseInfo: "platform/project/{projectId}", //项目列表
		fetchFileList: "doc/{projectId}/{projectVersionId}/file/children", //获取文件列表  ?fileId={parentId}
		fetchDesignFileNav: "doc/{projectId}/{projectVersionId}/file/tree", //项目设计文件导航
		fetchDesignModelNav: "dataJson/project/project.design.model.json", //项目设计模型导航

		// 项目面包屑
		fetchCrumbsProject: "platform/project/groupByProvince", // 项目导航
		fetchCrumbsProjectVersion: "platform/project/{projectId}/version/groupBy", //项目面包屑版本  platform/project/{projectId}/version/orderBy
		fetchProjectVersionInfo: "platform/project/{projectId}/version/{projectVersionId}", //项目版本信息


		//模型
		fetchModelIdByProject: "view/{projectId}/{projectVersionId}/init",
		fetchFileModelIdByFileVersionId: "doc/{projectId}/{projectVersionId}/file/meta", //?fileVersionId={fileVersionId}

		fetchScene: "view/{etag}/{sourceId}/tree", // 获取楼层,专业信息
		fetchCategory: "view/{etag}/{sourceId}/categories", // 获取构件信息
		fetchCoding: 'view/category/coding/{etag}', //获取构件编码信息

		fetchFloors: 'view/{etag}/{sourceId}/miniature/map', //获取模型楼层信息
		fetchAxisGrid: 'model/{etag}/metadata/gridAndLevel.json', //获取楼层地图,轴网信息

		uploadFile: "doc/{projectId}/{projectVersionId}/file/data", //上传文件  ?parentId={parentId}&fileName={fileName}&size={size}&digest={digest}&position={position}
		"checkDownLoad": "doc/{projectId}/{versionId}/file/size", // 下载确认 是否可以下载  ?fileVersionId={fileVersionId}
		downLoad: "doc/{projectId}/{projectVersionId}/file/data", //文件下载  ?fileId={fileId}

		//快照
    fetchModelViewpoint: 'sixD/{projectId}/viewPoint', // 获取快照列表
    fetacCanvasData: 'sixD/{projectId}/viewPoint/{viewPointId}/comment', // 获取批注信息
    createViewpointById: 'sixD/{projectId}/viewPoint', // 创建快照
    addViewpointImg: 'sixD/{projectId}/viewPoint/{viewPointId}/pic', // 添加快照图片
    addViewpointData: 'sixD/{projectId}/viewPoint/{viewPointId}/comment', // 添加几何数据
    editViewpointById: 'sixD/{projectId}/viewPoint/{viewPointId}', // 修改快照
    deleteViewpointById: 'sixD/{projectId}/viewPoint/{viewPointId}', // 删除快照


		//设计
		fetchDesignProperties: "sixD/{projectId}/{projectVersionId}/property", //设计属性 ?sceneId={sceneId}&elementId={elementId}
		fetchDesignPropertiesPlan: "sixD/{projectId}/{projectVersionId}/plan/edo", // 设计属性 计划  ?sceneId={sceneId}&elementId={elementId}
		fetchDesignPropertiesCost: "sixD/{projectId}/{projectVersionId}/cost/edo", // 设计属性成本  ?sceneId={sceneId}&elementId={elementId}
		fetchDesignPropertiesQuality: "sixD/{projectId}/{projectVersionId}/quality/standard", // 设计属性 质量 ?sceneId={sceneId}&elementId={elementId}

		fetchDesignVerification: "sixD/{projectId}/{versionId}/design/check", // 设计 检测  ?status={status}&type={type}&specialty={specialty}&reporter={reporter}&pageIndex={pageIndex}&pageItemCount={pageItemCount}
		fetchDesignCollision: "", // 设计碰撞
		// 碰撞
		fetchDesignFiles: "view/{etag}/{sourceId}/collision/tree", // 碰撞文件列表
		fetchDesignCategory: "view/{etag}/{sourceId}/collision/categories", // 构件列表
		fetchDesignTaskList: "view/{projectId}/{projectVerionId}/collision/setting/list", //碰撞任务列表
		fetchDesignTaskDetail: "sixD/{projectId}/{projectVersionId}/{collisionId}/point?pageNo={pageNo}&pageSize={pageSize}", //碰撞点列表
		creatCollisionTask: "view/{projectId}/{projectVersionId}/collision/setting", //创建碰撞任务
		fetchDesignSetting: "view/{projectId}/{projectVersionId}/{collision}/setting", //查看碰撞设置

		// 模型对比
		fetchDesignChange: "view/{projectId}/{projectVersionId}/comparison", // 获取模型对比列表
		fetchDesignChangeInfo: "sixD/{projectId}/{projectVersionId}/comparison/result?comparisonId={comparisonId}", // 获取模型对比结果

		//计划
		fetchPlanModel: "sixD/{projectId}/{projectVersionId}/plan", //模型
		fetchPlanAnalog: "sixD/{projectId}/{projectVersionId}/plan?relateModel=true", //模拟
		fetchPlanPublicity: "sixD/plan/concern", //关注 ?queryType={queryType}
		fetchPlanInspection: "sixD/{projectId}/{projectVersionId}/plan?noElement=true&relateModel=true", //检验 计划节点未关联图元 startTime=1398145297000&endTime=1398145297000&relateModel={true|false}&
		fetchPlanInspectionCate: "sixD/{projectId}/{projectVersionId}/plan/noplan/cate", // 图元未关联计划节点
		fetchPlanInspectionCateDetail: "sixD/{projectId}/{projectVersionId}/plan/noplan/element", // 图元未关联计划节点 ?cateId={cateId} 暂开详情
		fetchModleIdByCode:"sixD/{projectId}/{projectVersionId}/plan/element", //获取构建的模型id
		fetchComponentByCateId:"sixD/{projectId}/{projectVersionId}/plan/noplan/element",//更具类型获取构建  ? cateId={cateId}

		fetchPlanProperties: "", //属性

		//陈本
		fetchCostReference: "sixD/{projectId}/{projectVersionId}/cost/summary", // 清单
		fetchCostChange: "platform/auditSheet?type=9", // 变更
		fetchCostVerification: "sixD/{projectId}/{projectVersionId}/cost/summary?noElement=true", // 效验
		fetchCostVerificationCate: "sixD/{projectId}/{projectVersionId}/cost/nocost/cate", // 效验 图元未关联清单 类型
		fetchCostVerificationCateDetail: "sixD/{projectId}/{projectVersionId}/cost/nocost/element", // ?cateId={cateId}图元未关联清单 详情
		fetchCostModleIdByCode:"sixD/{projectId}/{projectVersionId}/cost/element", // ?costCode={costCode}
		fetchNoCostCate:"sixD/{projectId}/{projectVersionId}/cost/nocost/element",//获取未关联成本的构件 ?cateId={cateId}


		// 质量
		fetchQualityMaterialEquipment: "sixD/{projectId}/{projectVersionId}/device", //材料设备?specialty={specialty}&category={category}&status={status}&name={name}&startTime={startTime}&endTime={endTime}&pageIndex={pageIndex}&pageItemCount={pageItemCount}
		fetchQualityProcessAcceptance: "sixD/{projectId}/{projectVersionId}/acceptance?type=1", //过程验收
		fetchQualityOpeningAcceptance: "sixD/{projectId}/{projectVersionId}/acceptance?type=2", //开业验收
		fetchQualityConcerns: "sixD/{projectId}/{projectVersionId}/problem", //隐患
		fetchQualityProperties: "dataJson/project/project.design.property.json", // 属性
		fetchQualityModelById:"sixD/{projectId}/{versionId}/quality/element", //开业验收 过程 验收 获取构建id  ?acceptanceId={acceptanceId}


		//资源
		fetchStandardLibs: "platform/project?type=1", //获取 标准模型库
		fetchStandardVersion:"platform/project/{projectId}/version", //获取标准模型库版本
		fetchFamLibs: "platform/project?type=2", //获取族库
		fetchVersion: "platform/project/{projectId}/version/{versionId}",
		fetchFileTree: "doc/{projectId}/{projectVersionId}/file/tree", //项目设计文件导航
		deleteFile: "doc/{projectId}/{projectVersionId}/file?fileVersionId={fileVersionId}", //删除文件  ?fileVersionId={fileVersionId}
		putFileReName: "doc/{projectId}/{projectVersionId}/file/rename", // 重命名文件 ?fileVersionId={fileVersionId}&name={name}
		createNewFolder: "doc/{projectId}/{projectVersionId}/file", // 创建新文件夹 ?parentId={parentId}&filePath={filePath}

		//项目 变更 列表
		fileList:"doc/internal/{projectId}/{versionId}/differ", //变更列表
		projectChangeList:"sixD/{projectId}/{projectVersionId}/cost/comparison",// ?fileVerionId={fileVerionId}&baseFileVerionId={baseFileVerionId}

		projectDesinProperties:"sixD/{projectId}/{projectVersionId}/property/comparison",//?baseFileVerionId={baseFileVerionId}&fileVerionId={fileVerionId}&sceneId={sceneId}&elementId={elementId}
		projectDesinPropertiesCost:"sixD/{projectId}/{projectVersionId}/cost/edo/comparison", //属性成本 ?baseProjectVerionId={baseProjectVerionId}&sceneId={sceneId}&elementId={elementId}
		//TEST
		projectChangeListTest:"/dataJson/project/projectChange/list.json",
		projectDesinPropertiesTest:"/dataJson/project/projectChange/comparisonAttr.json",//sixD/{projectId}/{projectVersionId}/property/comparison //?baseProjectVerionId={baseProjectVerionId}&sceneId={sceneId}&elementId={elementId}
		fileListTest:"/dataJson/project/projectChange/changeFile.json", //doc/internal/{projectId}/{versionId}/alteration

		//服务

		//系统设置

		"servicesAddCategory":"platform/set/category/add",// 新增分类
		"servicesCategoryList":"platform/set/category", //分类 列表
		"servicesCategoryUpdate":"platform/set/category/update",// 更新类别
		"servicesCategoryDel":"platform/set/category/del",// 删除 ?id={id}

		//流程
		"servicesFlowAdd":"platform/set/flow/add",// 新增分类
		"servicesFlowList":"platform/set/flow", // 列表 ?categoryId={categoryId}
		"servicesFlowUpdate":"platform/set/flow/update",// 更新类别
		"servicesFlowDel":"platform/set/flow/del",// 删除 ?id={id}
		"servicesFlowIndex":"platform/set/flow/serial", // 改变位置 ?id={id}
		"servicesFolwMove":"platform/set/flow/serial", // ?id={id} move up  or down


		//app
		appList:"platform/app",//应用列表
		fetchAppListById:"platform/app/{id}",//根据id获取列表
		appInsert:"platform/app/",//创建应用 name desc
		appDel:"platform/app/{id}",//删除应用
		appResetSecret:"platform/app/{id}",//重新生成 Secret
		appUpdate:"platform/app",//更新 id, name desc
		appSwitchStatus:"platform/app/{id}/disable?status={status}",//应用状态修改

		//扩展属性
		extendAttrList:"platform/setting/extensions/property/{classKey}", // 扩展列表
		extendAttrInsert:"platform/setting/extensions/property",//新增
		extendAttrUpdate:"platform/setting/extensions/property",//更新扩展属性
		extendAttrDel:"platform/setting/extensions/property/{classKey}?property={property}",//删除扩展属性
		extendAttrGetReferene:"platform/setting/extensions/property/reference",// 获取引用扩展属性
		projectCodeMapping:"platform/mapping/{projectId}",
		getBoundingBox:"sixD/{projectId}/{projectVersionId}/bounding/box",//获取构建的 box id ?sceneId={sceneId}&elementId={elementId}
		test: ""
	},

	DEBUGURL: {

		//首页bodyContent数据
		fetchBodyContentTodos :'/dataJson/bodyContent/bodyContent.todos.json',
		fetchBodyContentMonthEnd :'sixD/plan/concern/index',
		fetchBodyContentMonthStart :'sixD/plan/concern/index',
		fetchBodyContentSlide :'/dataJson/bodyContent/bodyContent.slide.json',
		fetchBodyContentMmhSlide :'dataJson/bodyContent/bodyContent.mmhSlider.json',
		fetchBodyContentProclamation :'/dataJson/bodyContent/bodyContent.proclamation.json',

		//services-member
		fetchServicesMemberList:'/dataJson/services/member/services.member.list.json',//组织-混合列表
		fetchServicesRolesList:'/dataJson/services/member/services.member.roles.json',//角色-功能列表
		fetchServicesFunList: '/dataJson/services/member/services.role.fun.json',//功能列表
		fetchServicesOzRoleList:'/dataJson/services/member/services.oz.role.json',//组织角色列表
		fetchServicesNewRole:'platform/auth/role',//新增角色
		fetchServicesUserRoleList:'/dataJson/services/member/services.user.role.json',//用户角色列表
		fetchServicesMemberOuterList:'/dataJson/services/member/services.member.list.json',//外部组织-品牌／公司／成员列表
		fetchServicesMemberInnerList:'/dataJson/services/member/services.member.list.json',//内部-组织／成员列表


		fetchServiceKeyUserEdit:'platform/auth/keyUser/{uid}',//修改关键用户
		fetchServiceKeyUserDelete:'platform/auth/keyUser/{uid}',//删除关键用户
		fetchServicesProjectMemberProjectList:'/dataJson/services/member/services.project.member.projects.json',//项目成员/项目管理
		fetchServicesProjectMemberMemberList:'/dataJson/services/member/services.project.member.members.json',//项目成员/项目管理
	  	fetchServiceKeyUserList:'/dataJson/services/services.KeyUser.json',//关键用户列表
	  	fetchServiceStep1:'/dataJson/services/services.step1.json',//项目列表




		//代办
		fetchTodoData: "/dataJson/todo/todo.json", //获取代办数据


		// 项目
		fetchProjects: "/dataJson/{project}/project.list.json", //项目列表
		fetchFileList: "dataJson/project/project.design.json", //获取文件列表
		fetchDesignFileNav: "/dataJson/project/project.design.file.json", //项目设计文件导航
		fetchDesignModelNav: "/dataJson/project/project.design.model.json", //项目设计模型导航

		// 项目面包屑
		fetchCrumbsProject: "/dataJson/project/fetchCrumbsProject.json", // 项目导航
		fetchCrumbsProjectVersion: "/dataJson/project/fetchCrumbsProjectVersion.json", //项目面包屑版本
		fetchProjectVersionInfo: "platform/project/{projectId}/version/{projectVersionId}", //项目版本信息

		fetchModelIdByProject: "/dataJson/project/design/fetchModelIdByProject.json",

		fetchFloors: '/datajson/map/map.json', //获取模型楼层信息
		fetchAxisGrid: '/datajson/map/gridAndLevel.json', //获取楼层地图,轴网信息

		//快照
    fetchModelViewpoint: '/datajson/project/project.viewpoint.property.json', // 获取快照列表
    fetacCanvasData: '/datajson/project/project.viewpoint.comments.json', // 获取批注信息
    createViewpointById: '', // 创建快照
    editViewpointById: '', // 修改快照
    deleteViewpointById: '', // 删除快照

		//设计
		fetchDesignProperties: "/dataJson/project/project.design.property.json", //设计属性
		fetchDesignVerification: "/dataJson/project/project.design.property.json", //设计检测

		// 碰撞
		fetchDesignCollision: "/dataJson/project/project.design.property.json", //设计碰撞
		fetchDesignFileList: "/dataJson/project/project.design.filesList.json", // 设计碰撞文件
		fetchDesignTaskList: "/dataJson/project/project.design.collision.taskList.json", //碰撞任务列表
		fetchDesignTaskDetail: "/dataJson/project/project.design.task.detail.json", //碰撞任务详情
		creatCollisionTask: "",

		// 模型对比
		fetchDesignChange: "/dataJson/project/fetchDesignChange.json", // 获取模型对比列表
		fetchDesignChangeInfo: "/dataJson/project/fetchDesignChangeInfo.json", // 获取模型对比结果


		//计划
		fetchPlanModel: "/dataJson/project/project.design.property.json", //模型
		fetchPlanAnalog: "/dataJson/project/project.design.property.json", //模拟
		fetchPlanPublicity: "/dataJson/project/plan/publicity.json", //关注
		fetchPlanInspection: "/dataJson/project/project.design.property.json", //检验
		fetchPlanProperties: "/dataJson/project/project.design.property.json", //属性


		//陈本
		fetchCostReference: "/dataJson/project/cost/list.json", // 清单
		fetchCostChange: "/dataJson/project/project.design.property.json", // 变更
		fetchCostVerification: "/dataJson/project/cost/list.json", // 效验
		fetchCostProperties: "/dataJson/project/project.design.property.json", //属性

		// 质量
		fetchQualityMaterialEquipment: "/dataJson/project/project.design.property.json", //材料设备
		fetchQualityProcessAcceptance: "/dataJson/project/project.design.property.json", //过程验收
		fetchQualityProcessCheck: "/dataJson/project/project.design.property.json", //过程检查
		fetchQualityOpeningAcceptance: "/dataJson/project/project.design.property.json", //开业验收
		fetchQualityConcerns: "/dataJson/project/project.design.property.json", //隐患
		fetchQualityProperties: "/dataJson/project/project.design.property.json", // 属性


		//资源
		fetchStandardLibs: "/dataJson/resources/StandardLibs.json", //获取 标准模型库
		fetchFamLibs: "/dataJson/resources/StandardLibs.json", //获取族库
		fetchStandardVersion: "/dataJson/resources/fetchStandardVersion.json",
		fetchFileTree: "/dataJson/project/project.design.file.json", //项目设计文件导航
		deleteFile: "", //删除文件
		putFileReName: "", //重命名文件
		createNewFolder: "",



		//app
		appList:"platform/app",//应用列表
		fetchAppListById:"platform/app/{id}",//根据id获取列表
		appInsert:"platform/app/",//创建应用 name desc
		appDel:"platform/app/{id}",//删除应用
		appResetSecret:"platform/app/{id}",//重新生成 Secret
		appUpdate:"platform/app",//更新 id, name desc

		test: ""



	}


};
