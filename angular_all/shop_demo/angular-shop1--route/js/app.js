//主模块 引入了路由模块
var myapp=angular.module("myapp",['ngRoute']);

//配置路由表

myapp.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/main",{
		templateUrl:"template/main.html",
		controller:"mainController"
	}).when("/detail",{
		templateUrl:"template/detail.html",
		controller:"detailController"
	}).when("/car",{
		templateUrl:"template/car.html",
		controller:"carController"
	}).when("/login",{
		templateUrl:"template/login.html",
		controller:"loginController"
	}).when("/register",{
		templateUrl:"template/register.html",
		controller:"registerController"
	}).otherwise({
		redirectTo:"/main"
	})
}])



