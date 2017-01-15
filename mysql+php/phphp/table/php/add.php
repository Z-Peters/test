<?php
	//连接数据库
	include "concat.php";
	//插入数据
	$sql="insert into stu(id,name,sex,age) values(null,'','','')";
	//执行语句
	mysql_query($sql);
	//影响行数
	if(mysql_affected_rows()==1){
		$id=mysql_insert_id();
		echo  $id;
	}else{
		echo  "fail";
	}
?>