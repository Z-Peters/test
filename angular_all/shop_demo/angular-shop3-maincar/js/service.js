
//封装的服务，里面有加入购物车等操作的方法
myapp.factory("myService",function($rootScope){
	
	return {
		controlGood:function(id,name,price){//加入购物车的操作，并且会根据本地存储来做判断
			var car=this.getCar();//获取到购物车
			if(!car.length){//如果购物车是空的，那么就添加新的一个商品进去
				car.push(this.makeGood(id,name,price));
				this.controlNum(price)//计算总钱数和总数量
				localStorage.car=angular.toJson(car);				
			}else{//如果购物车里有商品
				var carLen=car.length;
				var flag=true;
				for (var i=0;i<carLen;i++) {
					if(car[i].id==id){//如果有这个商品，数量+1，并且需要把本地存储更新，还要重新设置总钱数和总数量
						car[i].num++;
						localStorage.car=angular.toJson(car);
						this.controlNum(price)
						flag=false;
						break;
					}
				}
				if(flag){//如果购物车里没有这个商品
					car.push(this.makeGood(id,name,price));
					this.controlNum(price)
					localStorage.car=angular.toJson(car);
				}
			}
		},
		getCar:function(){//获取购物车的方法
			var car=localStorage.car?angular.fromJson(localStorage.car):[];
			return car;
		},
		makeGood:function(id,name,price){//返回一个新的商品的object
			var obj={
				id:id,
				name:name,
				price:price,
				num:1
			}
			return obj;
		},
		controlNum:function(price){//控制总钱数和总数量的方法
			$rootScope.allNum++;
			$rootScope.allPrice+=Number(price);
		}
	}
})
