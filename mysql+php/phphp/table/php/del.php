<?php
	include "concat.php";
	$id=$_GET['rowId'];
	$sql="delete from stu where id=".$id;
	mysql_query($sql);
	if(mysql_affected_rows()==1){
		echo "";
	}else{
		echo "fail";
	}
?>