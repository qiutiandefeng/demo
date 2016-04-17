function queryUpdate(){
		
		var pageSize = document.getElementById("pageSize").value;
		window.location="emp.do?pageNo=" + 1 + "&pageSize=" + pageSize;
  }

function fun(){
	if(!(/^\d{1,}$/.test(f.pageNo.value))){
		return false;
	}
	return true;
}

function del(ename,empno){
	if(window.confirm("确定删除“雇员姓名为："+ename+"”？")){
		window.location="emp.do?method=remove&empno="+ empno;
	}
}
//
//function del(ename,empno){
//	if(window.confirm("确定删除“雇员姓名为："+ename+"”？")){
//		$.post("emp.do?method=remove&empno="+ empno,function(data){
//			if(data == "true"){
//				$("#"+empno).remove();
//			}else{
//				alert("删除失败！");
//			}
//		});
//	}
//}