/**************************************************/
/* GSK Veeva Master Template - Presentation CSS   */
/**************************************************/
/* File version              3.0                  */
/* Last modified             01/05/2023 */
/* Last modified by          Design Center        */
/**************************************************/

// --- CUSTOM TO THIS PRESENTATION --- //

$(document).ready(function() {
	//Reset pi first Tab button
	$('body').on(com.gsk.mt.releaseEvent,'#pi', function(){
		if (com.gsk.mtconfig.piTab && com.gsk.mtconfig.brandTheme && com.gsk.mtconfig.brandThemePi) {
		    $("#piTabs li").removeClass('activeColor');
		    $('.piTabWrapper').hide();
		    if (com.gsk.mtconfig.brandThemeClassification) {
		        let pitabtheme = window.sessionStorage.getItem("brandtheme");
		        let currentTheme = Object.keys(com.gsk.mtconfig.brandThemeClassification).indexOf(pitabtheme);
		        $(`.piTab${currentTheme+1}`).show();
		        $(`#piTab${currentTheme+1}`).addClass('activeColor');
		    }
		} else if (com.gsk.mtconfig.piTab && !com.gsk.mtconfig.brandTheme && !com.gsk.mtconfig.brandThemePi) {
		    $("#piTabs li").removeClass('activeColor');
		    $('#piTab1').addClass('activeColor');
		    $('.piTabWrapper').hide();
		    $('.piTab1').show();
		} else if (!com.gsk.mtconfig.piTab && !com.gsk.mtconfig.brandThemePi) {
		    $('.standrdpi-content').removeClass('hidden');
		}	
	});
	
	// Show/Hide PITabs Content based on the tab click 
	//Note: piTab value in config.json must be true.
	$('body').on(com.gsk.mt.releaseEvent,'#piTabs .piTab', function(){
		var activeDialog = com.gsk.mt.getActiveDialog();
		if (activeDialog != null && activeDialog.hasClass("quickLinkDialog")) {	
			$(this).addClass('activeColor').siblings().removeClass('activeColor');
			let currentButton = $(this).attr('id');
			activeDialog.parent().find(".piTabWrapper").hide();
			$('.'+currentButton).show();
			com.gsk.mt.initScrollable();
		}else{
			$(this).addClass('activeColor').siblings().removeClass('activeColor');
			let currentButton = $(this).attr('id');
			$('.mainContent').find(".piTabWrapper").hide();
			$('.'+currentButton).show();
            com.gsk.mt.initScrollable();
        }
	});
    
    if ($("#setAnimations").length) {
        // --- SET TEXT ON HOME PAGE BUTTON --- //
        if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
            $('#setAnimations').text("Animations are On");
        } else {
            $('#setAnimations').text("Animations are Off");
        }

        com.gsk.mt.bindInteraction("#setAnimations", "tap", {}, function() {
            if (window.sessionStorage.getItem('mtgskAnimations') === '1') {
                window.sessionStorage.setItem('mtgskAnimations', '0');
                $('#setAnimations').text("Animations are Off");
                com.gsk.mt.debug("Animations are Off");
            } else {
                window.sessionStorage.setItem('mtgskAnimations', '1');
                $('#setAnimations').text("Animations are On");
                com.gsk.mt.debug("Animations are On");
            }
        });
    }    
   
});