
//封装的服务，里面有加入购物车等操作的方法
myapp.factory("myService",function($rootScope){
	
	return {
		controlGood:function(id,name,price,type){//加入购物车的操作，并且会根据本地存储来做判断
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
						
						if(type){//判断如果是在购物车页要减少商品的数量
							car[i].num--;
							if(car[i].num==0){	//当商品数量为0的时候就从购物车移除			
								car.splice(i,1);
							}
							localStorage.car=angular.toJson(car);
							this.controlNum(price,'reduce')
						}else{
							car[i].num++;
							localStorage.car=angular.toJson(car);
							this.controlNum(price)
						}
						
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
		controlNum:function(price,type){//根据操作（加、减）控制总钱数和总数量的方法
			if(type){
				$rootScope.allNum--;
				$rootScope.allPrice-=Number(price);
			}else{
				$rootScope.allNum++;
				$rootScope.allPrice+=Number(price);
			}
			
		},
		removeGood:function(id){//从购物车移除当前id的商品，在详情页里使用
			
			var car=this.getCar();
			for (var i=0;i<car.length;i++) {
				if(car[i].id==id){					
					car.splice(i,1);
					localStorage.car=angular.toJson(car);
					break;
				}
			}
			this.countAll();
		},
		countAll:function(){//重新计算总价钱和总数量
			var car=this.getCar();
			$rootScope.allPrice=0;
			$rootScope.allNum=0;
			for (var i=0;i<car.length;i++) {
				$rootScope.allNum+=car[i].num;
				$rootScope.allPrice+=Number(car[i].price)*car[i].num;
			}
		},
		clear:function(){//清空购物车的操作
			localStorage.removeItem('car');
			$rootScope.allNum=0;
			$rootScope.allPrice=0;
		}
	}
})
