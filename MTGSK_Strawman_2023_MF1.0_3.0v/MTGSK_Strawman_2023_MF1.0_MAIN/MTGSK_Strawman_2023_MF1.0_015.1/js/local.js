// --- local.js --- //

/**
 *  Custom effect example.
 *  Source: https://api.jqueryui.com/jQuery.effects.define/
 */
$.effects.define( "fader", "toggle", function( options, done ) {
  var show = options.mode === "show";

  $( this )
    .css( "opacity", show ? 0 : 1 )
    .animate( {
      opacity: show ? 1 : 0
    }, {
      queue: false,
      duration: options.duration,
      easing: options.easing,
      complete: done
    } );
} );



/**
 *  On dialog open/close example.
 *  Dialog box tracing(how long it was open) is disabled. Only tabs duration tracking is enabled.
 *  if dialog box tracking also wants to eanble, Need to uncomment line#74 & line#103 from the below code.
 */
com.gsk.mt.onDialogOpen = function() {	
    var activeDialog = com.gsk.mt.getActiveDialog(); 
    if (activeDialog != null && !activeDialog.hasClass("quickLinkDialog")) {
		var activeTabId = activeDialog.parent().find(".tab:first").attr('id');
			$.each(activeDialog.parent().find(".tab"), function (index, el) {
			  var $this = $(this).attr('id');             
			  $('.'+$this).hide();
			 });				
			$('.'+activeTabId).show();
			$('#'+activeTabId).addClass('activeColor');
        var startTime = new Date(),
            slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide),
            clickStreamArray = [
                {
                    Track_Element_Id_vod__c: com.gsk.mtconfig.pagesTitles[slideIndex],
                    Track_Element_Type_vod__c: "Popup",
                    Track_Element_Description_vod__c: activeDialog.attr("data-description")
                }
            ];

        // Store data in the dialog
        activeDialog.data("data-clickstream", JSON.stringify(clickStreamArray))
                    .data("data-start-time", startTime);			
    }
	
};

com.gsk.mt.onDialogClose = function() {
    var activeDialog = com.gsk.mt.getActiveDialog(); 	
    if (activeDialog != null && !activeDialog.hasClass("quickLinkDialog")) {
		activeDialog.parent().find(".tab").removeClass('activeColor');
        // Retrieve the data and store in a variable.
        var clickStreamArray = JSON.parse(activeDialog.data("data-clickstream")),
            startTime = Date.parse(activeDialog.data("data-start-time"));

        // Clear the data from the dialog
        activeDialog.data("data-clickstream", null)
                    .data("data-start-time", null);
		
        // Add the duration
        clickStreamArray[0].Usage_Duration_vod__c = Math.round((new Date() - startTime) / 1000);

        // Write
        setTimeout(function() {
			//com.gsk.mt.clickStreamSubmit(clickStreamArray);																									
		}, 300);
    }
};

/**
 *  On slide exit custom callback example
 *  Used in this instance to enable storage of the metadata for popups on transition
 *  Note that this accepts a parameter (an array)
 *  @param {Array} mainClickStreamArray
 *  @returns {Array}
 */
com.gsk.mt.onSlideExit = function(mainClickStreamArray) {
    while (com.gsk.mt.dialogStack.length > 0) {
        // Retrieve popup data
        var activeDialog = com.gsk.mt.getActiveDialog();

        if (!activeDialog.hasClass("quickLinkDialog") && !activeDialog.hasClass("refQuickLinkDialog")) {
            var clickStreamArray = JSON.parse(activeDialog.data("data-clickstream")),
                startTime = Date.parse(activeDialog.data("data-start-time"));

            // Add the object for this call
            com.gsk.mt.callObjectArray.push("Call_Clickstream_vod__c");

            // update the clickstream data for the popup
            clickStreamArray[0].Usage_Duration_vod__c = Math.round((new Date() - startTime) / 1000);

            // Push clickstreams into the main array
            for (var ii = 0; ii < clickStreamArray.length; ii++) {
               // mainClickStreamArray.push(clickStreamArray[ii]);
            }
        }
        // Remove the last popup (no need to close it, that will just slow down the write)
        com.gsk.mt.dialogStack.pop();
    }

    // Return the main clickStream to be written, this is not optional
    return mainClickStreamArray;
};


$(document).ready(function(e) {
	
	$('.tab3').show();
	$('#tab3').addClass('activeColor');
	$('.tab').on(com.gsk.mt.releaseEvent ,function(){
        /*external DialogBody tabs sample code start */   
		var activeDialog = com.gsk.mt.getActiveDialog();
		if (activeDialog != null && !activeDialog.hasClass("quickLinkDialog")) {			
			var activeTabId = activeDialog.parent().find(".tab.activeColor").attr('id'); 
			$('.'+activeTabId).hide();
			activeDialog.parent().find(".tab").removeClass('activeColor');
			var currentButton = $(this).attr('id');
			$('.'+currentButton).show();
			$('#'+currentButton).addClass('activeColor');		 
			com.gsk.mt.rebuildDialogIscroll(activeDialog);            
		}else{
            /*inline content single tab set sample code*/
            var activeTabId = $('.mainContent').find(".tab.activeColor").attr('id');
            $('.'+activeTabId).hide();
            $('.mainContent').find(".tab").removeClass('activeColor');
            var currentButton = $(this).attr('id');
            $('.'+currentButton).show();
			$('#'+currentButton).addClass('activeColor');
            com.gsk.mt.initScrollable();
        }
	});
	
});

