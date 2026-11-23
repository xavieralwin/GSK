// --- local.js --- //

$( document ).ready(function() {

	// --- CUSTOM ANIMATIONS - ANIMATED AND FLAT VERSIONS ---//
	if (window.sessionStorage.getItem('mtgskAnimations') === '1' && com.gsk.mt.currentFlow!=="Remote_Meeting") {
		// --- ANIMATED ---//	
		$(".pageArrow").addClass("load1");	
	} else {
		// --- FLAT ---//
		$(".pageArrow").addClass("load2");
	}
				
});