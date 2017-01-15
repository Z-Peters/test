
myapp.run(["$rootScope",function($rootScope){
	
	$rootScope.userName=localStorage.user?localStorage.user:'';
	console.log($rootScope.userName)
}])

//最外层的大控制器
myapp.controller("bController",['$scope',"$rootScope",function($scope,$rootScope){
	$scope.exit=function(){
		$rootScope.userName='';
		localStorage.removeItem('user');
	}
}])

//主页控制器
myapp.controller("mainController",['$scope',function($scope){
	
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
