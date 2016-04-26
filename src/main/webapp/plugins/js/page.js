function test(){
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
    $ul.append("<li class='firstPage'><a href='javascript:;' title='首页'>&laquo;</a></li>").append("<li class='prePage'><a href='javascript:;' title='上一页'>&lsaquo;</a></li>");
}