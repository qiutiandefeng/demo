package com.yfhl.tiyan.business.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yfhl.tiyan.business.project.service.ProInfoService;
import com.yfhl.tiyan.common.util.PageBean;
import com.yfhl.tiyan.common.util.StringUtil;
import com.yfhl.tiyan.common.web.BaseController;
/***
 * ProjectController 测试类
 * @author ygq 2016-01-16
 *
 */
@Controller
@RequestMapping("/pro")
public class ProjectController extends BaseController{
	@Autowired
	private ProInfoService proInfoService;
	@RequestMapping(value="/listPage")
	public String listPage(Model model){
		String strPageNum = request.getParameter("pageNo");
		String strPageSize = request.getParameter("pageSize");
		String name = request.getParameter("name");
		Integer pageNo = StringUtil.objToInteger(strPageNum);
		Integer pageSize = StringUtil.objToInteger(strPageSize);
		PageBean page = proInfoService.queryPageProInfoByParams(pageNo, pageSize,name);//功能列表
		model.addAttribute("pageBean", page);
		return "project/listpro";
	}
} 