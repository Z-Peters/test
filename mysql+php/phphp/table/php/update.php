<?php
	include "concat.php";
	$zd=$_GET['zd'];
	$val=$_GET['val'];
	$id=$_GET['id'];
	$sql="update stu set ".$zd."='".$val."' where id=".$id;
	mysql_query($sql);
	//问题出在if这里，执行成功则返回受影响的行的数目，如果最近一次查询失败的话，函数返回 -1
	if(mysql_affected_rows()==1){
		echo "success";
	}else{
		echo "fail";
	}
?>