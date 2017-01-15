<?php	
	error_reporting(0);
	//连接总数据库
	$a=mysql_connect("localhost","root","");
	//挑选出要执行的数据表
	mysql_select_db("tabletest",$a);
	mysql_query("set names utf8");
?>
 
