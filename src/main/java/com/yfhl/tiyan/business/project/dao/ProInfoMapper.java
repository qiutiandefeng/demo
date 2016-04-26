package com.yfhl.tiyan.business.project.dao;

import java.util.List;
import java.util.Map;

import com.yfhl.tiyan.business.project.bean.ProInfo;
import com.yfhl.tiyan.common.persistence.BaseMapper;
//@MyBatisDao
public interface ProInfoMapper extends BaseMapper {
	/***
	 * 根据参数查询项目信息
	 * @author ygq
	 * data 2016-3-19 time 下午10:27:06
	 * @param itemId
	 * @return
	 */
	List<Map<String,Object>> queryProInfoByParams(Map<String,Object> map);
	/***
	 * 该方法用于测试
	 * @param map
	 * @return
	 */
	List<ProInfo> queryPageTest(Map<String,Object> map);
	/***
	 * 查询信息-分页
	 * @param map
	 * @return
	 */
	public List<ProInfo> queryPageProInfoByParams(Map<String,Object> map);
	/***
	 * 查询数量
	 * @param map
	 * @return
	 */
	public int getCount(Map<String,Object> map);
	
}
