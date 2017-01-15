
//给根作用域上绑定用户名的数据，并根据本地存储来设置值
myapp.run(["$rootScope",'myService',function($rootScope,myService){	
	$rootScope.userName=localStorage.user?localStorage.user:'';
	var car=myService.getCar();
	$rootScope.allPrice=0;
	$rootScope.allNum=0;
	for (var i=0;i<car.length;i++) {
		$rootScope.allNum+=car[i].num;
		$rootScope.allPrice+=Number(car[i].price)*car[i].num;
	}
	
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
myapp.controller("detailController",['$scope',function($scope){
	
}])

//购物车控制器
myapp.controller("carController",['$scope',function($scope){
	
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
