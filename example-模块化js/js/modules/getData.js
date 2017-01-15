define(['zepto'],function(){
	return {
		//倒是可以输出内容，但是没法使用
		get:function(callBack){
			$.ajax({
				url:"goods.json",
				dataType:"json",
				success:function(data){
//					function callBack(data){}
//					callBack(data)
					//ajax作用域内，无法直接返回到函数外面
					callBack(data)
				}
			});
		}	
	}
})

//define(['zepto'],function(){
//	return {
//		//倒是可以输出内容，但是没法使用
//		get:function(){
//			$.ajax({
//				url:"goods.json",
//				dataType:"json",
//				success:function(data){
//					//ajax作用域内，无法直接返回到函数外面
//					console.log(data)
//				}
//			});
//		}	
//	}
//})

//define(['zepto'],function(){
//	var _data;
//	$.ajax({
//		//ajax里面的数据如何获取？
//		//为啥goods.json。因为最后json文件都要被引用到index.html中？
//		url:"goods.json",
//		dataType:"json",
//		success:function(data){
//			//ajax作用域内，无法直接返回到函数外面
//			_data=data;
//		}
//	});
//	return _data;//返回undefined
//	//原因：ajax是异步执行，当执行到获取数据的时候程序继续往下执行，ok?
//})



//define(['zepto'],function(){
//	$.ajax({
//		//ajax里面的数据如何获取？
//		//为啥goods.json。因为最后json文件都要被引用到index.html中？
//		url:"goods.json",
//		dataType:"json",
//		success:function(data){
//			//ajax作用域内，无法直接返回到函数外面
//			retuen data;
//		}
//	});
//})