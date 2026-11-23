/**************************************************/
/* GSK Veeva Master Template - Presentation CSS   */
/**************************************************/
/* File version              3.0                  */
/* Last modified             01/05/2023 */
/* Last modified by          Design Center        */
/**************************************************/

// --- Attitudinal segmentation local.js --- //

var html = html || {};
html.gsk = html.gsk || {};
html.gsk.local_Attitude = {   
    account_id: "",    
    product_Id: "",    
    final_productsWithId: [],
    
    initialise: function() {
        console.log("Attitudinal segmentation initialise started");
        com.veeva.clm.getDataForCurrentObject("Account", "Id", function(result) {
            if (result.success) {
                this.account_id = result.Account.Id;
                html.gsk.local_Attitude.getCurrentProduct();
            }
        });
    },
    getCurrentProduct: function() {
        com.veeva.clm.getDataForCurrentObject("KeyMessage", "Product_vod__c", html.gsk.local_Attitude.getProducts);
    },

    getProducts: function(result) {
        if (result.success) {
            product_Id = result.KeyMessage.Product_vod__c;
            var fields = "Name, Id";
            var whereClause = "Id='" + product_Id + "'";
            com.veeva.clm.queryRecord("Product_vod__c", fields, whereClause, null, null, html.gsk.local_Attitude.getProductMatrics)
        };
    },

    getProductMatrics: function(result) {
        callIds = [];
        if (result.success) {
            for (var i = 0; i < result.Product_vod__c.length; i++) {
                html.gsk.local_Attitude.final_productsWithId.push(result.Product_vod__c[i]);
                callIds.push(result.Product_vod__c[i].Id);
            }
            var fields = "CORE_GSK_Attitudinal_Segmentation__c, Products_vod__c, ID, LastModifiedDate";
            var whereClause = "Account_vod__c='" + this.account_id + "' AND Products_vod__c IN {'" + callIds.join("','") + "'}";
            com.veeva.clm.queryRecord("Product_Metrics_vod__c", fields, whereClause, null, null, html.gsk.local_Attitude.Callback_ProductMatrics)
        };
    },
    
    Callback_ProductMatrics: function(result) {
        if (result.success) {
            if (result.record_count == 0 || result.Product_Metrics_vod__c[0]['CORE_GSK_Attitudinal_Segmentation__c']=="") {
                 asDetailing("Attitude 1");
            } else {                
				var temp = result.Product_Metrics_vod__c[0]['CORE_GSK_Attitudinal_Segmentation__c'];                
                asDetailing(temp);
            }            

        } else {
            return false;
        }
    }    

};


function asDetailing(temp){
      temp = temp.replace(/ /g,"_"); console.log("Attitudinal Segmentation is:"+temp);
	if($('.Attitudinal_Segmentation-block .block-list li').length > 0){
		$('.Attitudinal_Segmentation-block .block-list li').each(function(){
			if($(this).attr('data-id')==temp ){
				$('.Attitudinal_Segmentation-block .block-list li').removeClass('active')
				$(this).addClass('active');
			}
		});
	};
};
$(document).ready(function() {    
	if(com.gsk.mt.isVeeva){
        if($(html.gsk.local).length < 1){
            html.gsk.local_Attitude.initialise();
		    $(".reach-block").hide();
            $(".Attitudinal_Segmentation-block").show();
        }
	}   
})