<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@include file="/WEB-INF/pages/include/taglib.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>测试-首页</title>
    <link href="${ctx}/plugins/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
    <script type="text/javascript" src="${ctx}/plugins/bootstrap/assets/js/vendor/jquery.min.js"></script>
    <script type="text/javascript" src="${ctx}/plugins/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="text/javascript" s></script>
  </head>
  <body>
  		<center>
  			<h1>分页测试</h1>
  				<form action="${pageContext.request.contextPath }/pro/listPage.do" method="post">
	  				<table  border="0" cellpadding="0" cellspacing="0" width="900">
	  					<tr>
	  						<td align="center">雇员姓名：<input type="text" name="ename" size="12" value="${ename }"/>
	  						<input type="submit" value="确定"/></td>
	  					</tr>
	  				</table>
  				</form>
  				<h3><a href="add_modify_mergeEmp.jsp">增加</a></h3>
  				<table border="1" cellpadding="0" cellspacing="0" width="900">
  					<tr>
  						<td align="center"><strong>雇员姓名</strong></td>
  					</tr>
  					<c:forEach items="${pageBean.list}" var="emp">
  					<tr>
  						<td align="center"><font color="orange">${emp.name }</font></td>
  					</tr>
  					</c:forEach>
  				</table>
				<ul class="pager">
				  <li>
				    <a href="#">Previous</a>
				  </li>
				  <li>
				    <a href="#">Next</a>
				  </li>
				</ul>
  		</center>
  </body>
</html>
