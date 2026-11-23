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
 *  This will store the popup's ID, the time it was opened and how long it was
 *  open for and write this data once it has been closed.
 */
com.gsk.mt.onDialogOpen = function() {	
    var activeDialog = com.gsk.mt.getActiveDialog(); 
    if (activeDialog != null && !activeDialog.hasClass("quickLinkDialog") && !activeDialog.hasClass("refQuickLinkDialog")) {
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
        
        //on dialog open initiate the scroll Start
        var scrollable = $(".scrollable"),
        $this;
        if (scrollable.length > 0) {
            $.each(scrollable, function() {
                $this = $(this);
 
                if (parseInt($this.outerHeight()) < parseInt($this.find(".scrollableInner").css("height"))) {
                    com.gsk.mt.initScroller($this);
                }
            });
        }
        //on dialog open initiate the scroll End
    }
	
};

com.gsk.mt.onDialogClose = function() {
    var activeDialog = com.gsk.mt.getActiveDialog(); 
    if (activeDialog != null && !activeDialog.hasClass("quickLinkDialog") && !activeDialog.hasClass("refQuickLinkDialog")) {
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
			com.gsk.mt.clickStreamSubmit(clickStreamArray);																									
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
                mainClickStreamArray.push(clickStreamArray[ii]);
            }
        }
        // Remove the last popup (no need to close it, that will just slow down the write)
        com.gsk.mt.dialogStack.pop();
    }

    // Return the main clickStream to be written, this is not optional
    return mainClickStreamArray;
};

/**
 *  On inline content swipe start scope to write custom code for animations.
 */
    com.gsk.mt.onSwipeStart = function($swiper, swipeDirection) {
        if (swipeDirection === "prev" && $swiper.activeIndex === 0) {
            /*write your custom code by swiper id Vs Direction */ 
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent5"){                
               $(".swiper-slide2").find(".animation-1").removeClass("active");
            }
        }else if (swipeDirection === "prev" && $swiper.activeIndex === 1) {
            /*write your custom code by swiper id Vs Direction */            
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent5"){                
               $(".swiper-slide2").find(".animation-1").addClass("active");
            }
        }else if (swipeDirection === "next" && $swiper.activeIndex === 1) {
           /*write your custom code by swiper id Vs Direction */
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent5"){                
               $(".swiper-slide2").find(".animation-1").addClass("active");
            }
        }else if (swipeDirection === "next" && $swiper.activeIndex === 2) {
           /*write your custom code by swiper id Vs Direction */
			if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent5"){                
               $(".swiper-slide2").find(".animation-1").removeClass("active");
            }
        }else if (swipeDirection === "prev" && $swiper.activeIndex === 2) {
           /*write your custom code by swiper id Vs Direction */
			console.log("Swipe inlineContent5")
        }
        
    };
/**
 *  On inline content swipe end scope to write custom code for animations.
 */
    com.gsk.mt.onSwipeEnd = function($swiper, swipeDirection) {	
        if (swipeDirection === "prev" && $swiper.activeIndex === 1) {
            /*write your custom code by swiper id Vs Direction */
            if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent4"){                
                console.log("End inlineContent4")
            }if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent5"){                
                console.log("End inlineContent5")
            }
            
        }else if (swipeDirection === "next" && $swiper.activeIndex === 1) {
           if($swiper.$el["0"].id ==="MTGSK_Strawman_2023_MF1.0_007_inlineContent6"){                
                console.log("End inlineContent6")
            }
        }
		
		// Scroll reset option for every swipe end
		/*var scrollContent = $swiper.$el.find(".scrollable");
		com.gsk.mt.initScrollable(scrollContent);*/
    };



