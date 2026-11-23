// --- local.js --- //

$( document ).ready(function() {    

	// --- CUSTOM ANIMATIONS with control of romote meeting flow(engage call) - ANIMATED AND FLAT VERSIONS ---//
	if (window.sessionStorage.getItem('mtgskAnimations') === '1' && com.gsk.mt.currentFlow!=="Remote_Meeting") {
		// --- ANIMATED ---//
		$('.pageArrow').delay(500).animate({width:'100%', top:'top:33.85%'},2000);	
	} else {
		// --- FLAT ---//
		$('.pageArrow').css({width:'100%', top:'top:33.85%'});
	}
				
});