<?php  
	header('Access-Control-Allow-Headers:*');	
	$page=$_GET['page'];
	$pagesize=$_GET['pagesize'];
    $searchUrl = 'http://japi.juhe.cn/joke/content/list.from?sort=desc&time=1418816972&key=57e054e6a7039cafce3a07a864c491a6&page='.$page.'&pagesize='.$pagesize;  
    echo file_get_contents($searchUrl);  
?> 