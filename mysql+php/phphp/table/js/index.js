//点击add按钮

$(".add").click(function(){
	//在数据库里加入数据
	$.ajax({
		url:"http://localhost/sea_table/php/add.php",
		success:function(data){
			//在页面中加入一条新数据
			console.log(data)
			var num=$("tr").length;
			if(data!="fail"){
				var str="<tr data-id='"+data+"'><td>"+num+"</td><td></td><td></td><td></td><td><button class='btn btn-primary del'>del</button></td></tr>";

				$("table").append(str);
			}else{
				alert("对不起，操作失败...");
			}
		}
	})
	
})




$("table").delegate(".del","click",function(){
	var id=$(this).parents("tr").attr("data-id");

	var that=this;
	$.ajax({
		url:"http://localhost/sea_table/php/del.php",
		data:{
			rowId:id
		},success:function(data){
			if(data=="success"){
				$(that).parents("tr").remove();
			}else{
				alert("对不起，操作失败...");
			}
		}
	})
})