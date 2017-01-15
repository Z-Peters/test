<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<link rel="stylesheet" href="//cdn.bootcss.com/bootstrap/3.1.1/css/bootstrap.min.css">
		<style type="text/css">
			th{text-align: center;line-height: 39px;}
			table{table-layout:fixed;}
			.btn{padding: 0 10px 0 10px!important;}
			.addBtn{display:block;width:150px;margin:20px auto}
			.inpt{width:142px;height:30px;margin-top: 4px;}
		</style>
	</head>
	<body>
		<div class="panel panel-primary" style="width: 800px;margin: 0 auto;">
			<div class="panel-heading text-center">学生信息表</div>
		<table class="table table-bordered">
			<tr>
				<th>id</th>
				<th>name</th>
				<th>sex</th>
				<th>age</th>
				<th>control</th>
			</tr>
			<?php
				//获取从后台修改后的数据
				include "php/concat.php";
				$sql="select * from stu";
				$result=mysql_query($sql);
				$num=0;
				while ($row=mysql_fetch_array($result)){
//					var_dump($row)可以输出获取的内容
					$num++;				
					echo "<tr data-id=".$row['id'].">";
					//获取当前id
					echo "<th>".$num."</th>";
					//名字看有没有
					echo "<th class='can'>".$row['name']."</th>";
					if($row['name']){
						if($row['sex']==1){
							echo "<th class='can'>男</th>";
						}else{
							echo "<th class='can'>女</th>";
						};
						echo "<th class='can'>".$row['age']."</th>";
					}else{
							echo  "<th class='can'></th>";
    						echo  "<th class='can'></th>";
					};
					echo '<th><button class="btn btn-primary del">del</button></th>';
					echo "</tr>";
				};	
			?>
		</table>	
			<button class="btn btn-primary addBtn">+</button>
		</div>
	</body>
	<script src="js/jq.js"></script>
	<script type="text/javascript">
	//点击的时，给数据库创建一个列表，给页面创建一个列表
	$('.addBtn').click(function(){
		$.ajax({
			url:"http://localhost/phphp/table/php/add.php",
			success:function(data){
					var num=$("tr").length;
					if(data!="fail"){
				var str="<tr data-id='"+data+"'><th>"+num+"</th><th class='can'></th><th class='can'></th><th class='can'></th><th><button class='btn btn-primary del'>del</button></th></tr>";
				   $('table').append(str);
				}else{
					alert("对不起，操作失败");
				};
		   }
		});
	});
	//删除操作
	$("table").delegate(".del","click",function(){
		var id=$(this).parents("tr").attr("data-id");
		var that=this;
		$.ajax({
			url:"http://localhost/phphp/table/php/del.php",
			data:{
				rowId:id
			},success:function(data){
				console.log(data.length)//长度是4
				if(data.length==3){
					$(that).parents('tr').remove();
				}else{
					alert("对不起，操作失败")
				}
			}
		})
	});
	//修改学生列表
	$('table').on("dblclick",".can",function(){
		var oval=$(this).html();
		var w=$(this).width();
		var h=$(this).height();
		$(this).css("padding",0)
		$(this).html('');
		//创建一个input标签
		var inp=$("<input>").addClass("inpt").appendTo($(this));
		inp.val(oval).focus();
		//this变成that目的，现在的内容不是this的了，作了修改了
		var that=this;
		var index=$(that).index();
		//获取修改后的内容
		var zd=$("th").eq(index).html();
		//获取当前th的父元素的id
		var id=$(this).parents("tr").attr("data-id");
		inp.blur(function(){
			var nval=this.value;//获取当前的value值。以便传参后使用
			$(that).css("padding-top","8px").html(nval);
			switch (nval){
				case "男":
					nval=1;
					break;
				case "女":
					nval=0;
					break;
			};
			$.ajax({
				url:"http://localhost/phphp/table/php/update.php",
				data:{
					zd:zd,
					val:nval,
					id:id
				},
				success:function(data){
					if(data.length=="fail"){
						alert("对不起，操作失败");
						$(that).html(oval)
					}
				}
			});
			
		})
	})
	</script>
</html>