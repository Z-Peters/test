
//给根作用域上绑定用户名的数据，并根据本地存储来设置值

myapp.run(["$rootScope",'myService',function($rootScope,myService){	
	$rootScope.userName=localStorage.user?localStorage.user:'';
	//把总价钱和总数量的数据挂载在跟作用域上，这样的话多个路由页面都可以访问到这个数据
	//当进入应用的时候从本地存储里取出购物车并且计算总价钱和总数量
	myService.countAll();
	
}])

//最外层的大控制器
myapp.controller("bController",['$scope',"$rootScope",function($scope,$rootScope){
	//退出登陆操作
	$scope.exit=function(){
		$rootScope.userName='';
		localStorage.removeItem('user');
	}
}])

//主页控制器
myapp.controller("mainController",['$scope','$http','myService',function($scope,$http,myService){
	$scope.dataList=[];
	$http({url:"./json/goods.json",method:'get'}).success(function(data){
		$scope.dataList=data;
	})
	$scope.addCar=function(id,name,price){
		myService.controlGood(id,name,price)
	}
	
}])

//详情页控制器
myapp.controller("detailController",['$scope','$routeParams','myService','$http',function($scope,$routeParams,myService,$http){
	$scope.good={};
	$http({url:"./json/goods.json",method:'get'}).success(function(data){
		for (var i=0;i<data.length;i++) {
			if($routeParams.id==data[i].id){
				$scope.good=data[i];
				$scope.goodInfo=[
					{name:"胡萝卜素",img:"img/r"+data[i].hlb+".png",have:getInfo(data[i].hlb)},
					{name:"VC",img:"img/r"+data[i].vc+".png",have:getInfo(data[i].vc)},
					{name:"叶酸",img:"img/r"+data[i].ys+".png",have:getInfo(data[i].ys)},
					{name:"钾",img:"img/r"+data[i].jia+".png",have:getInfo(data[i].jia)},
					{name:"纤维素",img:"img/r"+data[i].qws+".png",have:getInfo(data[i].qws)},
				]
				break;
			}
		}
	})		
	$scope.add=function(id,name,price){//添加到购物车
		myService.controlGood(id,name,price)
	}
	$scope._remove=function(id){	//从购物车移除	
		myService.removeGood(id);
	}	
}])



function getInfo(num){//把商品的维生素含量改成一段信息
	
	var text='';
	switch(num){
		case '0':
			text='微乎其微(低于5%)';
		break;
		case '1':
			text='含量低(5 ~ 10%)';
		break;
		case '2':
			text='平均水平(10 ~ 20%)';
		break;
		case '3':
			text='含量高(20~40%)';
		break;
		case '4':
			text='富含(高于40%)';
		break;
	}
	return text;
}



//购物车控制器
myapp.controller("carController",['$scope','myService',function($scope,myService){
	
	$scope.goods=myService.getCar();//从本地存储里获取到购物车然后在页面中循环数据
	
	$scope.add=function(id,name,price){//添加
		myService.controlGood(id,name,price);
		$scope.goods=myService.getCar();
	}
	$scope.reduce=function(id,name,price){//减少
		myService.controlGood(id,name,price,'reduce');
		$scope.goods=myService.getCar();
	}
	$scope.clear=function(){//清空购物车
		myService.clear();
		$scope.goods=myService.getCar();
	}
	
}])

//登陆控制器
myapp.controller("loginController",['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
	//登陆逻辑
	$scope.login=function(){
		$http({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			method:"get",
			params:{
				status:'login',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(data){
			if(data.userID){
				a('成功');
				//保留登陆状态
				$rootScope.userName=data.userID;
				localStorage.user=data.userID;
				$location.path('/main');
			}else{
				a('失败');
			}
		})
	}
}])

//注册控制器
myapp.controller("registerController",['$scope','$http','$location',function($scope,$http,$location){
	//注册逻辑
	$scope.register=function(){
		$http({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			method:"get",
			params:{
				status:'register',
				userID:$scope.uname,
				password:$scope.upass
			}
		}).success(function(data){
			if(data==1){
				a('成功');
				$location.path('/login');
			}else{
				a('失败');
			}
		})
	}	
}])
