define(['swiper'],function(){
	var mySwiper=new Swiper(".swiper-container",{
		autoplay:1000
	})
	//为啥要return出去？
	return mySwiper;
})
//define(['swiper'],function(){
//	var mySwiper=new Swiper(".swiper-container",{
//		autoplay:1000
//	})
//	return mySwiper;
//})