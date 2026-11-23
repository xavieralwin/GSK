// --- local.js --- //
$( document ).ready(function() {    
	let swiper_id;
    com.gsk.mt.onSwipeStart = function($swiper, swipeDirection) {
		//alert($swiper.activeIndex)
		//alert(document.getElementById(swiper_id).getAttribute("class"))
		if (swipeDirection === "prev" && $swiper.activeIndex === 0) {
            /*write your custom code by swiper id Vs Direction */
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide1").find(".animation-1").addClass("active");
				$(".swiper-slide2").find(".animation-1").removeClass("active");
			}
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent2"){ 
				
               console.log('inlineContent2');
            }
        }else if (swipeDirection === "prev" && $swiper.activeIndex === 1) { 
            /*write your custom code by swiper id Vs Direction */
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){ 
				
				$(".swiper-slide1").find(".animation-1").addClass("active");
				$(".swiper-slide2").find(".animation-1").removeClass("active");
				
			} 
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent2"){ 
				
               console.log('inlineContent2');
				
            }           
        }else if(swipeDirection === "prev" && $swiper.activeIndex === 2){
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide1").find(".animation-1").removeClass("active");
				$(".swiper-slide2").find(".animation-1").addClass("active");
			} 
		}else if(swipeDirection === "prev" && $swiper.activeIndex === 3){
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide2").find(".animation-1").addClass("active");
				$(".swiper-slide2").find(".animation-1").removeClass("active");
			}  
		}else if (swipeDirection === "next" && $swiper.activeIndex === 1) {
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){ 
				
				$(".swiper-slide1").find(".animation-1").addClass("active");
				$(".swiper-slide2").find(".animation-1").removeClass("active");
				
			}else if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent2"){
				
            	console.log('inlineContent2');
			   
            }else if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent3"){ 
				
            	console.log('inlineContent3');
			   
            }
        }else if (swipeDirection === "next" && $swiper.activeIndex === 2) {
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide2").find(".animation-1").addClass("active");
				$(".swiper-slide1").find(".animation-1").removeClass("active");
				
            }
        }
		else if (swipeDirection === "next" && $swiper.activeIndex === 3) {
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide2").find(".animation-1").removeClass("active");
				$(".swiper-slide1").find(".animation-1").removeClass("active");
				
            }
        }
		else if (swipeDirection === "next" && $swiper.activeIndex === 4) {
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				$(".swiper-slide2").find(".animation-1").removeClass("active");
				$(".swiper-slide1").find(".animation-1").addClass("active");
				
            }
        }
        
    };

    com.gsk.mt.onSwipeEnd = function($swiper, swipeDirection) { 
        if (swipeDirection === "prev" && $swiper.activeIndex === 1) {
            /*write your custom code by swiper id Vs Direction */
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){
				console.log('SwipeEnd inlineContent1');
            }
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent2"){                
              	console.log('SwipeEnd inlineContent2');
            }
            
        }else if (swipeDirection === "next" && $swiper.activeIndex === 1) {
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent1"){                
               console.log('SwipeEnd inlineContent1');
			}
           	if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent3"){                
                console.log('SwipeEnd inlineContent2');
			}
        }
    };
				
});

