var zhqModule=angular.module("zhqModule",[]);


zhqModule.provider("zhqService",function(){
		return {
			isInt:false,
			$get:function(){
				var _provider=this;
				return {
					getRandomNum:function(num1,num2){
						if(!_provider.isInt){
							return Math.random()*(num2-num1)+num1;
						}else{
							return Math.floor(Math.random()*(num2-num1)+num1);
						}
						
					}
				}
			}
		}
	})