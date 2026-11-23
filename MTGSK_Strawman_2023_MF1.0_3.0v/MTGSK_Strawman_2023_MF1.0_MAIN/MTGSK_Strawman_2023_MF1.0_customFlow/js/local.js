// --- local.js --- //

$( document ).ready(function() {    

	// --- CUSTOM ANIMATIONS with control of romote meeting flow(engage call) - ANIMATED AND FLAT VERSIONS ---//
	if (window.sessionStorage.getItem('mtgskAnimations') === '1' && com.gsk.mt.currentFlow!=="Remote_Meeting") {
		// --- ANIMATED ---//
		$('.pageAnimation').delay(500).animate({left:'94.53%', top:'top:33.85%'},2000);	
	} else {
		// --- FLAT ---//
		$('.pageAnimation').css({left:'94.53%', top:'top:33.85%'});
	}
				
});