package com.yfhl.tiyan.business.project.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.yfhl.tiyan.common.util.PageBean;
import com.yfhl.tiyan.util.tiyan_util.ReflectListUtil;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/resources/spring-context.xml","file:src/main/resources/spring-mvc.xml"})
public class TestProInfoService {
	@Autowired
	private ProInfoService proInfoService;
	@Test
	public void queryPageProInfoByParams() {
		try{
		int pageNo = 1;
		int pageSize = 10;
		String name = "支";
		PageBean page = proInfoService.queryPageProInfoByParams(pageNo, pageSize,name);
		ReflectListUtil.ergodicPage(page.getList(), page.getTotalRecordes());
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}
}
