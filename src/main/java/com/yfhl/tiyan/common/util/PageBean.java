package com.yfhl.tiyan.common.util;

import java.util.ArrayList;
import java.util.List;

public class PageBean {
	public PageBean(){
		
	}
	public PageBean(Integer pageNo,Integer pageSize){
		if(null != pageNo){
			this.pageNo = pageNo;
		}
		if(null != pageSize){
			this.pageSize = pageSize;
		}
	}
	private int pageNo =1; // 页号
	private int pageSize = 10; // 页大小
	private int totalRecordes; // 总记录数
	private List list = new ArrayList(); // 封装每一条记录

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecordes() {
		return totalRecordes;
	}

	public void setTotalRecordes(int totalRecordes) {
		this.totalRecordes = totalRecordes;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	// 求总页数
	public int getPageTotalPages() {
		return (this.getTotalRecordes() + this.pageSize - 1)/this.pageSize;
	}

	// 求上一页
	public int getUpprPage() {
		if (this.pageNo == 1) {
			return 1;
		}
		return this.pageNo - 1;
	}

	// 求下一页
	public int getDownPage() {
		if (this.pageNo == this.getEndPage()) {
			return this.getEndPage();
		}
		return this.pageNo + 1;
	}

	// 求首页
	public int getHomePage() {
		return 1;
	}

	// 求尾页
	public int getEndPage() {
		return this.getPageTotalPages();
	}
	/***
	 * 获取开始的数据
	 * @return
	 */
	public int getStrart(){
		return (pageNo-1)*pageSize;
	}
}
