require.config({
	baseUrl:"js/modules",//配置模块的基础路径，这个路径下的js文件会自动被当成模块
	//理解为引入js文件
	paths:{//配置的是不在基础路径里的模块的路径，键值对的键就是这个模块的名字（自定义），值就是这个模块的路径，这个路径是相对与基础路径里面来配置的,注意，千万不要加.js后缀
		"iscroll":"../lib/iscroll",
		"swiper":"../lib/swiper-3.3.1.min",
		"touch":"../lib/touch",
		"zepto":"../lib/zepto",
	}
});
//规定 使用引入的文件
//define(['banner'],function(mys){
	//添加点击按钮，让轮播停止，主要的目的是将banner里面的swiper传递过来，做一些事件处理。
//	document.getElementById('stop').onclick=function(){
//		mys.stopAutoplay();
//	}
//})
//为什么只需要引入useData就可以了？
define(['banner','useData'],function(){
	
})