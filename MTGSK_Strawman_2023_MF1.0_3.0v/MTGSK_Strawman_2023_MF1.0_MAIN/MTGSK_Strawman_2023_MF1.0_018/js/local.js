// --- local.js --- //

$(document).ready(function() {

    var flag = true;

    //Add Row functionality Start here
    function Add() {
		$("#loggedTable").removeClass("disableBtn");
        if (flag) {
            $("#tblData tbody").append(
                "<tr>" +
                "<td><input value='' type='text'/></td>" +
                "<td><input value='' type='text'/></td>" +
                "<td><input value='' type='text'/></td>" +
                "</tr>");
        } else if (!flag) {
            var cloneele = $("#tblData tbody tr:first-child").clone();					
            $("#tblData tbody").append(cloneele);
			$("#tblData tbody tr:not(:first-child)").addClass("cloneRow");
			$(".cloneRow:last-child td input").val("");
			if($("#tblData tbody tr").length >= 7){
				$('.iScrollVerticalScrollbar').remove();
			 var myScroll = new IScroll("#scroll", {
				scrollbars: true,
				preventDefault: false
			  });
			}	
        }
        flag = false;
    };

    $("#addRow").bind(com.gsk.mt.releaseEvent, Add);

});