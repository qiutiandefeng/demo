/**
 * 表格插件
 * 【依赖】
 * base.js
 * ce_form.js
 *
 * 以下说明将被调用元素设定为$table.
 *
 * $table标签模板
 * <table cellpadding="0" cellspacing="0" border="0" width="100%">
 *      <thead>
 *          <tr>
 *              <th width="30" cetype="sel[checkbox]"></th>
 *              <th width="7%" field="id">#</th>
 *              <th field="name">姓名</th>
 *              <th field="sex" dict="SEX">性别</th>
 *              <th field="userCode">员工编号</th>
 *              <th field="deptName">部门</th>
 *              <th field="email">邮箱</th>
 *              <th width="17%" cetype="oper">操作</th>
 *          </tr>
 *      </thead>
 * </table>
 *
 *
 *
 *
 *
 * 一、初始化配置项说明：
 * autoLoad: true,			//{boolean}，默认true，是否自动加载数据，设置为true后，调用$table.datagrid({})初始化时就会加载数据；设置为false，调用$table.datagrid({})初始化后需要手动调用$table.datagrid("load", arguments)方法才能加载数据
 * async:true,              //{boolean}，数据加载策略，默认true，表示异步加载。
 * method:"post",			//{"get"、"post"（默认）}，数据请求方式，默认"post"
 * listType:"page",		    //{"page"（默认）、"list"}，列表条件查询返回的数据类型,page分页对象,list列表
 * dataKey:"data",			//{string}，服务器返回的json数据中列表数据的键名，默认为"data"
 * listDataUrl:"",			//{string}，列表查询地址,默认为当前页面地址
 * importDataUrl:"",		//{string}，数据导入地址
 * exportDataUrl:"",		//{string}，数据导出地址
 * exportDownloadUrl:"",	//{string}，数据导出文件下载地址
 * searchDataUrl:"",	    //{string}，条件查询地址,默认与listDataUrl相同
 * detailDataUrl:"",	    //{string}，详情查询地址
 * delDataUrl:"",		    //{string}，批量删除地址
 * lastRequestUrl:"",	    //{string}，最近一次请求url
 * data:null,				//{json}，请求参数
 * lastRequestData:null,	//{json}，最近一次请求参数
 * curPage:1,				//{int}，当前页
 * pageSize:20,			    //{int}，每页数据量
 * defaultOpers:[],		    //{["EDIT","DEL"]}，操作列的"编辑","删除"按钮
 * moreOpers:[],			//{array}，操作列的其他按钮，具体格式如下：
 *                           [{
 *                               icon:"envelope",		//图标,没有则无图标
 *                               text:"通知",			//文本,按钮上的文字
 *                               cname:"btnAlert",		//为按钮加上类名,方便区分,
 *                               loading: "正在发送...",
 *                               data:"1",
 *                               btnInners:[{           //如果是按钮组,则此项定义下拉按钮
 *                                       icon:"envelope",
 *                                       text:"邮件",
 *                                       cname:"btnEmail",
 *                                       loading: "正在发送...",
 *                                       data:"2"
 *                                   },
 *                                   {
 *                                       icon:"send",
 *                                       text:"短信",
 *                                       cname:"btnSms",
 *                                       loading: "正在发送...",
 *                                       data:"2"
 *                                   }]
 *                           }, {
 *                               icon:"ok",
 *                               text:"通过",
 *                               cname:"btnOk",
 *                               loading: "正在审核...",
 *                               data:"2"
 *                           }]
 * operId:"",				//{string}，包含批量删除、新增、导入导出等功能按钮的元素id
 * searchId:"",			    //{string}，包含了查询表单的元素id
 * pagebarId:"",			//{string}，分页控件id
 * formId:"",				//{string}，新增数据时待提交的表单id
 * importId: "",			//{string}，导入模态框id
 * onLoadBefore:null,	    //{function}，请求前执行的函数
 * onCreateRow:null,		//{function}，创建行回调函数
 * onLoadComplete:null,	    //{function}，表格加载完成后回调
 * onDelComplete:null	    //{function}，删除数据后回调函数
 *
 *
 * 二、标签属性说明
 * <table>
 *      listDataUrl: 同初始化配置项listDataUrl，优先级高
 *      importDataUrl: 同初始化配置项importDataUrl，优先级高
 *      exportDataUrl: 同初始化配置项exportDataUrl，优先级高
 *      exportDownloadUrl: 同初始化配置项exportDownloadUrl，优先级高
 *      delDataUrl: 同初始化配置项delDataUrl，优先级高
 *      searchId: 同初始化配置项searchId，优先级高
 *      defaultOpers: 同初始化配置项defaultOpers，优先级高
 *      detailDataUrl 同初始化配置项detailDataUrl，优先级高
 *      operId: 同初始化配置项operId，优先级高
 *      formId: 同初始化配置项formId，优先级高
 *      pagebarId: 同初始化配置项formId，优先级高
 * <th>
 *      cetype: "oper"表示此列为操作列；sel[checkbox]表示此列为复选框列，sel[radio]表示此列为单选框列
 *      field：{string}，表示此列关联字段名
 *      dict: {string}，表示此列显示的是字典项的值，属性值应设置为对应的字典项类型标识值
 *
 *
 * 三、方法说明：
 * 1.$table.datagrid("load", json)：{return $table}，加载表格数据并显示
 *              json：可选，表示加载数据所需的额外参数
 * 2.$table.datagrid("search", json)：{return $table}，根据条件查询表单中的值加载表格数据并显示
 *              json：可选，表示加载数据所需的额外参数
 * 3.$table.datagrid("reload")：{return $table}，刷新表格数据
 * 4.$table.datagrid("exportData", func, $btn)：{return $table}，导出数据
 *              func：可选，导出完成后回调函数
 *              $btn: 可选，导出按钮对象
 * 5.$table.datagrid("importData", data, func)：{return $table}，导入数据
 *              data: 可选，服务器返回的文件对象信息
 *              func：可选，导入完成后回调函数
 * 6.$table.datagrid("selected", boolean)：获取选中表行的ID
 *              boolean：true时返回Array对象；false（默认）返回string，每个ID之间以逗号","分隔
 * 7.$table.datagrid("del", id)：删除表数据
 *              id：可选，非空时表示删除指定ID的数据，多个ID之间以“,”分隔；为空时表示删除选中的表行数据。
 * 8.$table.datagrid("detail", id, func)：查询指定数据详情
 *              id：必须，指定待查询数据id
 *              func：可选，查询数据完成后回调函数
 * 8.$table.datagrid("data", id)：获取指定表行关联的数据
 *              id：必须，指定表行id，可以通过 $tr.attr("dataId")获取
 * 8.$table.datagrid("showData", data, res)：将数据data显示到表格中
 *              data：必须，待显示数据，可以是page对象，也可以是list对象，对应table的listType配置。
 *              res：可选，服务器返回的数据，带有请求状态字段信息。
 *
 *
 */
(function() {
	var methods={
		_jqt: "ce_datagrid",
		/**
		 * 初始化
		 * 仅支持table元素,且具有thead表头模板
		 */
		init: function(options) {
			var $table=$(this);
			if(!$table.is("table") || !$("thead", $table)[0]) return $table;	
			if(!$("tbody", $table)[0]) $table.append($("<tbody/>"));	//添加tbody标签
			//初始化工作
			methods._init($table, options);
			//
			$table.data(methods._jqt, options);	//绑定配置项
			if(!options.lastRequestUrl && options.autoLoad!==false) methods._query($table, options, options.listDataUrl, options.data);	//加载所有数据
			methods._onEvent($table, options);	//绑定事件
			return $table;
		},
		/**
		 * 查询所有数据
		 */
		load: function(data) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			options.curPage=1;
			methods._query($table, options, options.listDataUrl, $.extend(true, options.data, data));	//加载所有数据
			return $table;
		},
		/**
		 * 条件查询
		 */
		search: function(data) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			options.curPage=1;
			var _data=$.extend(true, {}, options.data);
			if(options.searchId && $("#"+options.searchId)[0]) {
				if($.fn.form) {
					_data=$.extend(true, _data, $("#"+options.searchId).form("get"));
				}else {
					$.error("jQuery.form is not exists.");
				}
				methods._query($table, options, options.searchDataUrl, $.extend(true, _data, data));	//条件查询
			}
			return $table;
		},
		reload: function() {
			var $table=$(this);
			var options=$table.data(methods._jqt);
            //选中样式
//            $table.find("th[cetype^=sel]").find("span.glyphicon-unchecked").removeClass("glyphicon-unchecked").addClass("glyphicon-unchecked");
			methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);	//条件查询
			return $table;
		},
		exportData: function(func, $btn) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			//
			if($btn) $btn.button("loading");
			$.ajax({
				url: options.exportDataUrl,
				data: options.lastRequestParams,
				type: options.method,
				dataType: "json",
				success: function(res) {
					if(res.state===false) {
						$.util("alert", res.msg);
					}else {
						if(func) func.call($table, res);
						$btn.button("reset");
						var $download=$("form[cetype=download]");
						if(!$download.length) {
							$download=$("<form cetype='download'/>")
								.attr("action", options.exportDownloadUrl)
								.append($("<input type='hidden' name='id' value='0'/>"))
								.append($("<input type='hidden' name='rn'/>"))
								.appendTo("body");
						}
						$("input[name=id]", $download).val(res.data);
						$("input[name=rn]", $download).val($.util("random"));
						$download.submit();
					}
				}
			});
			return $table;
		},
		/**
		 * 导入
		 */
		importData: function(data, func) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			$("#import_show", options.$import_modal).text("准备导入数据...");
	    	$.ajax({
	    		url: options.importDataUrl,
	    		type: "post",
	    		data: data,
	    		beforeSend: function() {
			    	$("#import_show", options.$import_modal).text("开始导入数据...");
	    		},
	    		success: function(res) {
					if(res.state===false) {
				    	$("#import_show", options.$import_modal).text(res.msg);
					}else {
						if(func) func.call($table, res);
				    	$("#import_show", options.$import_modal).text(res.msg);
				    	methods.reload.call($table);
					}
	    		},
	    		error: function() {
			    	$("#import_show", options.$import_modal).text("导入数据出错.");
	    		}
	    	});
			return $table;
		},
		/**
		 * 获取选中数据
		 * @param returnArray {boolean} true返回数据id数组, false返回","拼接的字符串, 默认false
		 */
		selected: function(returnArray) {
			var $table=$(this);
			var selected=methods._selected($table);
			if(returnArray) {
				return selected;
			} else {
				return selected.join(",");
			}
		},
		/**
		 * 删除指定数据
		 */
		del: function(id) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			var msg=$.msg.error_sel;
			if(id) {
				//删除单条记录
				msg=$.msg.confirm_del;
			} else {
				//删除选中记录
				id=methods._selected($table).join(",");
				if(!id) {
					$.util("alert", msg);
					return $table;
				}
				msg=$.msg.confirm_del;
			}
			$.util("confirm", msg, function() {
				methods._del($table, options, id);
			});
		},
		detail: function(_id, func) {
			var $table=$(this);
			var options=$table.data(methods._jqt);
			methods._detail($table, options, _id, func);
			return $table;
		},
		/**
		 * 根据id获取表行数据
		 * @param id {long}
		 */
		data: function(id) {
			var $table=$(this);
			return $("tr[dataId="+id+"]", $table).data("data");
		},
		
		/**
		 * 显示数据列表
		 */
		showData: function(data, res) {
			var $table=$(this), options=$table.data(methods._jqt);
			if(options.listType=="page") {
                $table.data("pageCount", data.pageCount);
                $table.data("totalCount", data.totalCount)
                $table.data("curPage", data.curPage);
				var _pageCount = data.pageCount;	//总页数
				if(options.curPage<1) {
					options.curPage=1;
					methods.reload.call($table);
					return false;
				} else if(options.curPage>_pageCount) {
					options.curPage=_pageCount;
					methods.reload.call($table);
					return false;
				}
				//分页数据
				methods._show($table, options, data.list, res);
				//分页导航
				methods._pagebar($table, options, data);
			} else if(options.listType=="list") {
                $table.data("pageCount", data.length);
                $table.data("totalCount", 1)
                $table.data("curPage", 1);
				//列表数据
				methods._show($table, options, data, res);
			}

			$(window).resize();
			return $table;
		},
		
		
		
		
		_init: function($table, options) {
			if(!$table.is("table")) {
				$.error("The method init must be invoked by table in jQuery.datagrid.");
				return false;
			}
			//初始化listDataUrl
			options.listDataUrl=options.listDataUrl||$table.attr("listDataUrl")||"";
			options.importDataUrl=options.importDataUrl||$table.attr("importDataUrl")||"";
			options.exportDataUrl=options.exportDataUrl||$table.attr("exportDataUrl")||"";
			options.exportDownloadUrl=options.exportDownloadUrl||$table.attr("exportDownloadUrl")||"";
			//导入初始化
			if(options.importDataUrl) {
				//模态初始化
				options.importId=$.util("random");
				var modal='<div id="'+options.importId+'" class="modal fade" tabindex="-1" role="dialog" '+
					'	aria-labelledby="modal-title" aria-hidden="true"> '+
					'	<div class="modal-dialog"> '+
					'	<div class="modal-content"> '+
							'	<div class="modal-header"> '+
							'		<button type="button" class="close" data-dismiss="modal"> '+
							'			<span aria-hidden="true">&times;</span><span class="sr-only">Close</span> '+
							'		</button> '+
							'		<h4 class="modal-title" id="modal-title">数据导入</h4> '+
							'	</div> '+
							'	<div class="modal-body"> '+
									'	<div class="col-sm-12" id="import_wrapper"> '+
										'	<div class="input-group">'+
												'<input type="text" class="form-control validate[required]" '+
												'	id="import_path" name="import_path" '+
												'		readonly="readonly" placeholder="请上传数据文件"> '+
												'<span class="input-group-btn">'+
												'	<a class="btn btn-success" type="button">'+
												'		<span id="import_btn" class="glyphicon glyphicon-folder-open"></span> 上传'+
												'	</a>'+
												'</span>'+
											'</div>'+
									  		'<span id="import_swf" input="import_path" '+
									  			'cetype="upload" btn="import_btn"></span>'+
									  		'<div><small id="import_show"></small></div>'+
									    '</div>'+
									'<div class="clearfix"></div>'+
								'</div>'+
								'<div class="modal-footer">'+
									'<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
				options.$import_modal=$(modal).appendTo("body");
				
				$("#import_swf", options.$import_modal).upload({
				    maxCount: 1,
				    file_types: "*.xls;*.xlsx;",
				    fileQueued: function() {
				    	$("#import_show", options.$import_modal).text("准备上传文件...");
				    },
				    uploadStart:  function() {
				    	$("#import_show", options.$import_modal).text("开始上传文件...");
				    },
				    uploadProgress:  function() {
				    	$("#import_show", options.$import_modal).text("正在上传文件...");
				    },
				    uploadSuccess:  function(file, res) {
				    	if(res.state==false && !res.data) {
					    	$("#import_show", options.$import_modal).text("上传文件失败.");
				    	}else {
				    		methods.importData.call($table, res.data);
				    	}
				    }
				});
			}
			//初始化searchDataUrl,默认与listDataUrl相同
			if(options.searchDataUrl===false) {
				options.searchDataUrl=options.listDataUrl;
			}
			//初始化delDataUrl
			options.delDataUrl=options.delDataUrl||$table.attr("delDataUrl")||"";
			//初始化searchId
			options.searchId=options.searchId||$table.attr("searchId");
			//初始化默认按钮
			var defaultOpers=options.defaultOpers||$table.attr("defaultOpers");
			if(typeof(defaultOpers)=="string") {
				options.defaultOpers=[];
				var opersArray=defaultOpers.split(/\[|,|\]/g);
				for(var i in opersArray) {
					if($.trim(opersArray[i])) options.defaultOpers.push($.trim(opersArray[i]));
				}
			} else if(!$.isArray(defaultOpers)) {
				options.defaultOpers=[];
			}
			//初始化功能按钮区域
			options.operId=options.operId||$table.attr("operId")||"";
			//初始化表单id
			options.formId=options.formId||$table.attr("formId")||"";
			if(options.formId) {
				if(!$("#"+options.formId).is("form")) {
					$.error("The options.formId must refer to form in jQuery.datagrid.");
					return false;
				}
			}
			//初始化详情查询url
			options.detailDataUrl=options.detailDataUrl||$table.attr("detailDataUrl")||"";
			//回调函数初始化
			options.onLoadBeforeEvents=options.onLoadBeforeEvents||[];
			if(options.onLoadBefore && $.isFunction(options.onLoadBefore)) {
				options.onLoadBeforeEvents.push(options.onLoadBefore);
			}
		},
		
		_detail: function($table, options, _id, func) {
			if(!options.detailDataUrl) {
				$.error("Please initial detailDataUrl before invoking the method detail in jQuery.datagrid.");
			}
			if(_id) {
				$.ajax({
					url: options.detailDataUrl,
					data: {id: _id, rn: Math.random()},
					type: "get",
					dataType: "json",
					success: function(res) {
						if(func && $.isFunction(func)) {
							func.call($table, res);
						}
					}
				});
			}
		},
		/**
		 * 远程请求查询
		 */
		_query: function($table, options, _url, _data) {
            //选中样式
            $table.find("th[cetype^=sel]").empty();
			//设置最后一次请求参数
			options.lastRequestUrl=_url;
			options.lastRequestParams=_data;
			//设置分页参数
			_data=$.extend(true, {}, _data||{}, {curPage:options.curPage, pageSize:options.pageSize});
			//执行请求前
			if(methods._onLoadBefore($table, options)===false) {
				return false;
			}
			//
			$.ajax({
				async: options.async,
				url: _url,
				data: _data,
				type: options.method,
				dataType: "json",
				success: function(res) {
					//条件参数回显
					if(options.searchId && $("#"+options.searchId)[0]) {
						//依赖于表单插件
						if($.fn.form) {
							$("#"+options.searchId).form("clear").form("set", _data);
						}else {
							$.error("jQuery.form is not exists.");
						}
					}
					if(res.state===false) {
						$.util("alert", res.msg);
					} else {
						var data=res[options.dataKey];

						methods.showData.call($table, data, res);
						
					}
					//表格显示完成后
					if(options.onLoadComplete && $.isFunction(options.onLoadComplete)) {
						options.onLoadComplete.call($table, res);
					}
				}
			});
		},
		/**
		 * 加载数据之前的验证
		 */
		_onLoadBefore: function($table, options) {
			var _onLoadBeforeEvents=options.onLoadBeforeEvents;
			for(var i in _onLoadBeforeEvents) {
				if(_onLoadBeforeEvents[i].call($table)===false) {
					return false;
				}
			}
			return true;
		},
		/**
		 * 显示数据
		 * @param list {Array} 数据数组
		 */
		_show: function($table, options, list, res) {
			$("tbody", $table).empty();
			var onCreateRow=options.onCreateRow;
			if(list) {
				for(var i in list) {
					var $tr=methods._createRow($table, options, list[i]), add=true;
					//创建表行回调函数
					if(onCreateRow && $.isFunction(onCreateRow)) {
						add=onCreateRow.call($table, $tr, list[i], res);
					}
					if(add!==false) $("tbody", $table).append($tr);
				}
			}
		},
		/**
		 * 创建一个表行
		 * @return 返回tr元素jQuery对象
		 */
		_createRow: function($table, options, obj) {
			//创建表行
			var $tr=$("<tr/>")
				.attr("dataId", obj.id||0)
				.data("data", obj);
			//遍历th表头模板
			$("th", $table).each(function() {
				var $th=$(this);
				//创建新列并添加至新行中
				var $td=$("<td/>");
				if($th.is("th[cetype^=sel]")) {
					//选择控件列
					var seltype=methods._seltype($table, true);
					var selname=methods._selname($table);
					if(seltype && selname) {
						$td.append(methods._createSel($table, seltype));
					}
				} else if($th.is("th[cetype=oper]")) {
					$td.attr("cetype", "oper");
					//操作列默认按钮
					var defaultOpers=options.defaultOpers;
					if(defaultOpers) {
						for(var i in defaultOpers) {
							switch (defaultOpers[i]) {
							case "EDIT":
								//编辑按钮
								$td.append(methods._createSingleOper({
									icon: "edit",
									text: "编辑",
									loading: "",
									cname: "btnEdit",
									data: ""
								}, false));
								break;
							case "DEL":
								//删除按钮
								$td.append(methods._createSingleOper({
									icon: "remove",
									text: "删除",
									loading: "正在删除...",
									cname: "btnDel",
									data: ""
								}, false));
								break;
							default:
								break;
							}
						}
					}
					//其他按钮
					var moreOpers=options.moreOpers;
					if(moreOpers) {
						for(var j in moreOpers) {
							if(moreOpers[j].btnInners && moreOpers[j].btnInners.length) {
								//创建按钮组
								var $btnDropdown=methods._createSingleOper(moreOpers[j], false)
									.addClass("dropdown-toggle")
									.attr("data-toggle", "dropdown")
									.append($("<span class='caret'></span>"));
								var $btnGroup=$("<div class='btn-group'/>")
										.append($btnDropdown)
										.append("<ul class='dropdown-menu' role='menu'/>")
										.appendTo($td);
								var btnInners=moreOpers[j].btnInners;
								for(var m in btnInners) {
									$("<li/>")
										.append(methods._createSingleOper(btnInners[m], true))
										.appendTo($("ul", $btnGroup));
								}
							} else {
								//简单按钮
								$td.append(methods._createSingleOper(moreOpers[j], false));
							}
						}
					}
				} else if($th.is("th[field]")) {
					//字段列
					var _field=$th.attr("field");
					$td.attr("field", _field);
					if(obj[_field]!==null && obj[_field]!==undefined) {
						//字典值
						var dict=$th.attr("dict");
						var _fieldTxt=dict ? getDictName(dict, obj[_field]) : obj[_field];
						$td.text(_fieldTxt).attr("title", _fieldTxt);
					}
				}
				$tr.append($td);
			});
			return $tr;
		},
		/**
		 * 创建一个选择控件
		 * @return 返回一个单选或多选jQuery对象
		 */
		_createSel: function($table, selType) {
			var seltype=methods._seltype($table);
			var selname=methods._selname($table);
			if(seltype && selname) {
				return $("<input type='" + seltype + "' name='" + selname + "'/>");
			}
			return $("");
		},
		/**
		 * 创建简单按钮
		 * @param btn {object} json对象,按钮数据
		 * @param isDropMember {boolean} 是否是下拉菜单按钮
		 * @return 返回一个简单按钮的jQuery对象
		 */
		_createSingleOper: function(btn, isDropMember) {
			var $btn=$("<a class='btn btn-default btn-xs' type='button' href='javascript:;'></a>");
			if(btn.icon) $btn.prepend("<span class='glyphicon glyphicon-" + btn.icon + "'></span>");
			if(btn.text) $btn.append(btn.text);
			if(btn.cname) $btn.addClass(btn.cname);
			if(btn.loading) $btn.attr("data-loading-text", btn.loading);
			if(btn.data) $btn.attr("data", btn.data);
			if(isDropMember===true) $btn.removeClass("btn").removeClass("btn-default");
			return $btn;
		},
		/**
		 * 分页导航
		 * @param data {object} json对象,分页数据
		 */
		_pagebar: function($table, options, data) {
			var pagebarId=options.pagebarId||$table.attr("pagebarId");
			if(!pagebarId || !$("#"+pagebarId)[0]) return ;
			//
			var _curPage=data.curPage;		//当前页
			var _pageCount = Math.ceil(data.totalCount / data.pageSize);	//总页数
			var $ul=$("<ul class='pagination'>")
				.append("<li class='pageCount'><span>共"+_pageCount+"页 / "+data.totalCount+"条记录</span></li>")
                .append("<li class='pageSize'><span>每页<select name='pageSize'><option>20</option><option>50</option><option>100</option></select>条</span></li>");
			$("select[name=pageSize]", $ul)
                .val(data.pageSize||20)
                .change(function() {
                    options.pageSize=$(this).val();
                    methods.reload.call($table);
                });
			//
			$ul.append("<li class='firstPage'><a href='javascript:;' title='首页'>&laquo;</a></li>")
			   .append("<li class='prePage'><a href='javascript:;' title='上一页'>&lsaquo;</a></li>");
			//
			var _groupPageCount=5;		//每组显示页码数量
			var _startPage=_curPage-(Math.floor(_groupPageCount/2));	//起始页码
			var _endPage=_curPage+(_groupPageCount-Math.floor(_groupPageCount/2)-1); 		//结束页码
			if(_startPage<1) {
				_startPage=1;
				_endPage=_groupPageCount;
			}
			if(_endPage>_pageCount) {
				_endPage=_pageCount;
				_startPage=_pageCount-_groupPageCount+1;
			}
			if(_startPage<1) _startPage=1;
			//
			for(var i=_startPage; i<=_endPage; i++) {
				$ul.append("<li class='numPage"+(i===_curPage?" active":"")+"'><a href='javascript:;'>"+i+"</a></li>");
			}
			//
			$ul.append("<li class='nextPage'><a href='javascript:;' title='下一页'>&rsaquo;</a></li>")
			   .append("<li class='endPage'><a href='javascript:;' title='末页'>&raquo;</a></li>");
			//
			if(_pageCount>_groupPageCount) {
				$ul.append("<li><span class='pageno' title='请输入页码'><form cetype='noSubmit'><input name='curPage' class='validate[required,custom[integer],min[1],max["+_pageCount+"]]' placeholder='页码'></form></span></li>")
				   .append("<li class='btnGo'><a href='javascript:;' title='跳转至指定页面'>跳转</a></li>");
			}
			
			if($.fn.form) {
				$("form", $ul).form();
			}else{
				$.error("jQuery.form is not exists.");
			}

			//事件
			$ul.on("click", "li", function() {
				var $li=$(this);
				if($li.hasClass("firstPage")) {
					//首页
					if(_curPage>1) {
						options.curPage=1;
						methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
					}
				} else if($li.hasClass("endPage")) {
					//末页
					if(_curPage<_pageCount) {
						options.curPage=_pageCount;
						methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
					}
				} else if($li.hasClass("prePage")) {
					//上一页
					if(_curPage>1) {
						options.curPage=_curPage-1;
						methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
					}
				} else if($li.hasClass("nextPage")) {
					//下一页
					if(_curPage<_pageCount) {
						options.curPage=_curPage+1;
						methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
					}
				} else if($li.hasClass("numPage")) {
					//页码
					options.curPage=$("a", $li).text();
					methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
				} else if($li.hasClass("btnGo")) {
					//页码跳转
					if($.fn.form) {
						if($("form", $ul).form("validate")===true) {
							options.curPage=$("input", $("form", $ul)).val();
							methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
						}
					}else {
						$.error("jQuery.form is not exists.");
					}
				}
			});
			
			$("input", $("form", $ul))
				.bind("keyup", function(e){
				    if(e.keyCode===13) {
						if($.fn.form) {
					    	if($("form", $ul).form("validate")===true) {
								options.curPage=$(this).val();
								methods._query($table, options, options.lastRequestUrl, options.lastRequestParams);
							}
						}else {
							$.error("jQuery.form is not exists.");
						}
				    }
				    return false;
				});
			
			$("<div class='pull-right'></div>").append($ul).appendTo($("#"+pagebarId).empty());

		},
		/**
		 * 绑定事件
		 */
		_onEvent: function($table, options) {
			//表格
			$table
				//操作列
				.on("click", "a", function() {
					var dataId=$(this).parents("tr").attr("dataId");
					if(!dataId) return false;
					if($(this).hasClass("btnDel")) {
						//删除按钮
						methods.del.call($table, dataId);
					} else if($(this).hasClass("btnEdit")) {
						//编辑按钮
                        if(options.onEditEvent) {
                            options.onEditEvent.call($table, $(this));
                        } else {
                            methods.detail.call($table, dataId, function(res) {
                                if(!res.state) {
                                    $.util("alert", res.msg);
                                } else {
                                    if(options.formId && $("#"+options.formId)[0]) {
                                        if($.fn.form) {
                                            var $modal=$("#"+options.formId).form("clear").form("set", res.obj).parents(".modal");
                                            if($modal[0]) {
                                                $modal.modal("show");
                                            }
                                        }else {
                                            $.error("jQuery.form is not exists.");
                                        }
                                    }
                                }
                            });
                        }
					}
				})
				//选择控件列
				.on("click", "span.glyphicon", function() {
					if($(this).parents("th[cetype^=sel]")[0]) {
						var selname=methods._selname($table);
						if(selname) {
							if($(this).hasClass("glyphicon-unchecked")) {
								//全选
								$(":checkbox[name="+selname+"]", $table).each(function() {
									$(this)[0].checked=true;
								});
								$(this).removeClass("glyphicon-unchecked").addClass("glyphicon-check");
							} else if($(this).hasClass("glyphicon-check")) {
								//取消全选
								$(":checkbox[name="+selname+"]", $table).each(function() {
									$(this)[0].checked=false;
								});
								$(this).removeClass("glyphicon-check").addClass("glyphicon-unchecked");
							}
						}
					}
				});
			
			//查询框
			if(options.searchId && $("#" + options.searchId)[0]) {
				$("#" + options.searchId)
					//文本框回车查询
					.on("keyup", ":text[name]", function(e) {
						if(e.keyCode===13) {
							methods.search.call($table);
					    }
					    return false;
					})
					//下拉控件查询
					.on("change", "select[name]", function() {
						methods.search.call($table);
					})
					//查询按钮
					.on("click", "[cetype=btnSubmit]", function() {
						methods.search.call($table);
					});
			}
			
			//功能区
			if(options.operId && $("#"+options.operId)[0]) {
				$("#" + options.operId)
					.on("click", "[cetype]", function() {
						var cetype=$(this).attr("cetype");
						if($(this).is("[cetype=btnDel]")) {
							//批量删除按钮
							methods.del.call($table);
						} else if($(this).is("[cetype=btnAdd]")) {
							//添加按钮
							if(options.formId && $("#"+options.formId)[0]) {
								if($.fn.form) {
									var $modal=$("#"+options.formId).form("clear").parents(".modal");
									if($modal[0]) {
										$modal.modal("show");
									}
								}else {
									$.error("jQuery.form is not exists.");
								}
							}
						} else if($(this).is("[cetype=btnReload]")) {
							//刷新表格按钮
							methods.reload.call($table);
						} else if($(this).is("[cetype=btnExport]")) {
							//导出数据
							methods.exportData.call($table, null, $(this));
						} else if($(this).is("[cetype=btnImport]")) {
							//导入数据
							if(options.$import_modal) {
								options.$import_modal.modal("show");
							}
						}
					});
			}
			
			if(options.$import_modal) {
				options.$import_modal.on("hide.bs.modal", function() {
					$(this).form("clear");
			    	$("#import_show", options.$import_modal).text("");
				});
			}
			
		},
		/**
		 * 选择控件类型
		 * @param createSelAll {boolean} 是否创建全选按钮,默认false,不创建
		 */
		_seltype: function($table, createSelAll) {
			var $th=$("th[cetype^=sel]", $table);
			if($th[0]) {
				var seltype=$th.attr("cetype").split(/\[|\]/)[1];	//选择控件类型
				if(seltype=="checkbox" && createSelAll===true) {
					$th.empty().append("<span class='glyphicon glyphicon-unchecked'></span>");	//添加全选按钮
				}
				return seltype;
			} else {
				return "";
			}
		},
		/**
		 * 为选择控件生成name属性值
		 */
		_selname: function($table) {
			var seltype=methods._seltype($table);
			var $th=$("th[cetype^=sel]", $table);
			if($th[0] && seltype) {
				return seltype + "_" + $("table").index($table);
			} else {
				return "";
			}
		},
		/**
		 * 获取选中项
		 */
		_selected: function($table) {
			var selname=methods._selname($table);
			var seltype=methods._seltype($table);
			var selected=[];
			if(selname && seltype) {
				$(":"+seltype+"[name="+selname+"]", $table).each(function() {
					if($(this)[0].checked) {
						var dataId=$(this).parents("tr").attr("dataId")||"";
						if(dataId!=null) {
							selected.push(dataId);	
						}
					}
				});
			}
			return selected;
		},
		/**
		 * 删除
		 */
		_del: function($table, options, _id) {
			if(!options.delDataUrl || !_id) return false;
			$.ajax({
				url:options.delDataUrl,
				data:{dataIds: _id},
				type:"post",
				dataType:"json",
				success:function(res) {
					if(res.state!==true) {
						$.util("alert", res.msg);
					} else {
						//刷新表格
						methods.reload.call($table);
					}
					if(options.onDelComplete && $.isFunction(options.onDelComplete)) {
						options.onDelComplete.call($table, res);
					}
				}
			});
		}
	};

	/**
	  moreOpers类型：
	  [
	  		{
	  			icon:"envelope",			//图标,没有则无图标
	  			text:"通知",					//文本,按钮上的文字
	  			cname:"btnAlert",		//为按钮加上类名,方便区分,
	  			loading: "正在发送...",
	  			data:"1",
	  			btnInners:[					//如果是按钮组,则此项定义下拉按钮
	  				{
	  					icon:"envelope",
	  					text:"邮件",
	  					cname:"btnEmail",
	  					loading: "正在发送...",
	  					data:"2"
	  				},
	  				{
	  					icon:"send",
	  					text:"短信",
	  					cname:"btnSms",
	  					loading: "正在发送...",
	  					data:"2"
	  				}
	  			]
	  		},
	  		{
	  			icon:"ok",
	  			text:"通过",
	  			cname:"btnOk",
	  			loading: "正在审核...",
	  			data:"2"
	  		}
	  ]
	 */	
	/**
	 * 全局配置
	 * 
	 */
	$.datagrid={
		defaults: {
			autoLoad: true,			//是否自动加载数据
			async:true,
			method:"post",			//Ajax访问方式
			listType:"page",		//列表条件查询返回的数据类型,page分页对象,list列表
			dataKey:"data",			//返回json中列表数据键名
			//请求地址
			listDataUrl:"",			//列表查询地址,默认为当前地址
			importDataUrl: "",		//导入数据地址
			exportDataUrl:"",		//数据导出地址
			exportDownloadUrl:"",		//数据导出地址
			searchDataUrl:false,	//条件查询地址,默认与listDataUrl相同
			detailDataUrl:false,	//详情查询地址
			delDataUrl:false,		//批量删除地址
			lastRequestUrl:false,	//最近一次请求url
			//请求参数
			data:null,				//请求参数
			lastRequestData:null,	//最近一次请求参数
			curPage:1,				//当前页
			pageSize:20,			//每页数据量
			//按钮
			defaultOpers:false,		//操作列的"编辑","删除"按钮
			moreOpers:[],			//操作列的其他按钮
			//html元素id
			operId:"",				//功能按钮区域id
			searchId:"",			//查询表单容器id
			pagebarId:"",			//分页导航id
			formId:"",				//Model表单id
			importId: "",			//导入模态框id
			//回调函数
			onLoadBefore:$.noop,	//请求前执行的函数
			onCreateRow:$.noop,		//创建行回调函数
			onLoadComplete:$.noop,	//表格加载完成后回调
			onDelComplete:$.noop	//删除数据后回调函数
		}
	};
	
	/**
	 * 插件方法
	 */
	$.fn.datagrid=function(options) {
		var $table=$(this);
		if(!$table[0]||!$table.is("table")) return $table; //非table元素不进行初始化
		if(typeof(options)=="string" && options.charAt(0)!="_" && methods[options]) {
			return methods[options].apply($table, Array.prototype.slice.call(arguments, 1));
		}else if(typeof(options)=="object"||!options) {
			var opts=$table.data(methods._jqt);
			opts=opts?opts:$.extend(true, {}, $.datagrid.defaults);
			return methods.init.call($table, $.extend(true, {}, opts, options));
		}else{
			$.error("Method " + options +" does not exsit in jQuery.datagrid.");
		}
	};
	
})();