package com.yfhl.tiyan.business.project.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yfhl.tiyan.business.project.bean.ProInfo;
import com.yfhl.tiyan.business.project.dao.ProInfoMapper;
import com.yfhl.tiyan.common.service.BaseService;
import com.yfhl.tiyan.common.util.PageBean;
@Service
public class ProInfoService extends BaseService{
	@Autowired
	private ProInfoMapper proInfoMapper;
	@SuppressWarnings("unchecked")
	public PageBean queryPageProInfoByParams(Integer pageNo,Integer pageSize,String name){
		PageBean page = new PageBean(pageNo,pageSize);
		Map map = new HashMap();
		map.put("start",page.getStrart());
		map.put("end", page.getPageSize());
		map.put("name", name);
		
		List<ProInfo> list = proInfoMapper.queryPageProInfoByParams(map);
		int totalRecordes = proInfoMapper.getCount(map);
		page.setList(list);
		page.setTotalRecordes(totalRecordes);
		return page;
	}
	@SuppressWarnings("unchecked")
	public PageBean queryPageTest(Integer pageNo,Integer pageSize,String name){
		PageBean page = new PageBean(pageNo,pageSize);
		Map map = new HashMap();
		map.put("start",page.getStrart());
		map.put("end", page.getPageSize());
		map.put("name", name);
		List<ProInfo> list = proInfoMapper.queryPageTest(map);
//		page.setList(list);
//		page.setTotalRecordes(totalRecordes);
		return page;
	}
}
