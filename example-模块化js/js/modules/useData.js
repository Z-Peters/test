define(['getData','iscroll'],function(obj){
	//ajax里面的数据如何获取？
	obj.get(function(data){
		var str=""
		$(data).each(function(){
			str+="<li><img src='"+this.imgUrl+"'/><h3>"+this.name+"</h3>"	
		});
		$('ul').html(str);
		//滑不动的原因是高度的问题
		var scroll=new iScroll('wrapper')
	});
	
})