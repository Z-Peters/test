var ayModule=angular.module("ayModule",[]);

ayModule.filter("ayFirstUpper",function(){
	return function(data){
		var _data=data.toLowerCase();
		return _data.charAt(0).toUpperCase()+_data.substr(1)
	}
})
ayModule.filter("aySomeUpper",function(){
	return function(data,num){
		var _data=data.toLowerCase();
		return _data.substr(0,num).toUpperCase()+_data.substr(num)
	}
})
