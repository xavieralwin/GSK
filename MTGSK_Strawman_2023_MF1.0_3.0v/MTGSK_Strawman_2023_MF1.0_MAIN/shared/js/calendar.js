// Calendar Functionality Start Here
$(document).ready(function() {
    let dates_length = $(".pickers").length, datesnumm, d_lt, maxsession, minsession, daysMonths, startDate, endDate, sDate = 0, eDate = 1, highlight_date1, highlight_date2, date1Disable, hideUnrequired, showRequired, p_id, d_id, date, dialog_id, yrs, dys, mons, monClass, mshow, mhide;

    if (com.gsk.calendar.DisablePastDates) {
        date1Disable = 0
    }
    $(".date1").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: date1Disable,
        beforeShowDay: highlightDate,
        changeMonth: com.gsk.calendar.changeMonth,
        changeYear: com.gsk.calendar.changeYear,
		dayNamesMin: [ ""+com.gsk.calendar.days[0]+"", ""+com.gsk.calendar.days[1]+"", ""+com.gsk.calendar.days[2]+"", ""+com.gsk.calendar.days[3]+"", ""+com.gsk.calendar.days[4]+"", ""+com.gsk.calendar.days[5]+"", ""+com.gsk.calendar.days[6]+"" ],
		monthNamesShort: [""+com.gsk.calendar.months[0]+"", ""+com.gsk.calendar.months[1]+"", ""+com.gsk.calendar.months[2]+"", ""+com.gsk.calendar.months[3]+"", ""+com.gsk.calendar.months[4]+"", ""+com.gsk.calendar.months[5]+"", ""+com.gsk.calendar.months[6]+"", ""+com.gsk.calendar.months[7]+"", ""+com.gsk.calendar.months[8]+"", ""+com.gsk.calendar.months[9]+"", ""+com.gsk.calendar.months[10]+"", ""+com.gsk.calendar.months[11]+""],
		monthNames: [""+com.gsk.calendar.months[0]+"", ""+com.gsk.calendar.months[1]+"", ""+com.gsk.calendar.months[2]+"", ""+com.gsk.calendar.months[3]+"", ""+com.gsk.calendar.months[4]+"", ""+com.gsk.calendar.months[5]+"", ""+com.gsk.calendar.months[6]+"", ""+com.gsk.calendar.months[7]+"", ""+com.gsk.calendar.months[8]+"", ""+com.gsk.calendar.months[9]+"", ""+com.gsk.calendar.months[10]+"", ""+com.gsk.calendar.months[11]+""],
        onSelect: function (dateText, instance) {
            //Below code is used to dialog open once date selection
            dialog_id = $(this).attr("data-calendar-dialog")
            $("#" + dialog_id).dialog("open");
            $(".ui-widget-overlay").each(function () {
                if ($(this).find(".uiOverlay").length < 1) {
                    $('<div class="uiOverlay"></div>').appendTo($(this));
                }
            });
            $('.date1').fadeIn(0);
            $(".cDialog").each(function () {
                $(this).removeClass("disable-click");
            })
            $('.avoid-click').css({
                "width": "100%",
                "height": "70%",
                "position": "absolute",
                "top": "41rem"
            });
			
            sessionStorage.setItem("reset_calendar", 0)
            //Its used to get selected Date
            date = $.datepicker.parseDate(instance.settings.dateFormat, dateText, instance.settings);

            //Highlighted Dates Start
            sessionStorage.setItem("highlight_date1", new Date(date.setDate(date.getDate() - parseInt(com.gsk.calendar.highlightedPrevDates))));
            sessionStorage.setItem("highlight_date2", new Date(date.setDate(date.getDate() + parseInt(com.gsk.calendar.highlightedTotalDates))));

            //stored the defaultsessionvariable in sessionStorage
            sessionStorage.setItem("defaultSessionVariable", 1);

            //Showing required
            sessionStorage.setItem("showRequired", 1);
            //stored the selected date of date1 in sessionStorage

            if (com.gsk.calendar.highlightedPrevDates === 0 && com.gsk.calendar.highlightedTotalDates === 0 && com.gsk.calendar.highlightedNextDates === 0) {
                sessionStorage.setItem("dates1", new Date(date.setDate(date.getDate())));

                sessionStorage.setItem("hideUnrequired", 1);
                $(".pickers-info").fadeIn(0);
                $(".gap").fadeIn(0);
                $(".date-content").fadeIn(0);
            } else {
                sessionStorage.setItem("dates1", new Date(date.setDate(date.getDate() - 0)));

                sessionStorage.setItem("dates1", new Date(date.setDate(date.getDate() - parseInt(com.gsk.calendar.highlightedNextDates))));

                //Hiding unrequired
                sessionStorage.setItem("hideUnrequired", 0);
                $(".gap").fadeIn(0);
                $(".date-content").fadeIn(0);
                $(".pickers-info").fadeIn(0);
            }
            //uncomment this if dynamic dates length within samepage to store in sessionStorage Start
            //sessionStorage.setItem("lengths",dates_length);
            //d_lt = sessionStorage.getItem("lengths");
            //uncomment this if dynamic dates length within samepage to store in sessionStorage End
			
            for (let i = 2; i <= com.gsk.calendar.totaldoses; i++) {
                //Its used to set Month
				
				setTimeout(function(){
					//Below code is used to remove Tooltip titles
					$(document).find(".date1").find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
					$(document).find(".date"+i).find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
				},500)
				
                //Doses Content Displaying
                if (com.gsk.calendar.dosesContentDisplay) {
                    //Below is used to add content to 1st Datepicker
                    $(".date-content-1").html(com.gsk.calendar.dosesContent1);
                    //Below is used to add content to their respective Datepicker
                    $(".date-content-" + i).html(com.gsk.calendar['dosesContent' + i]);
                }
                if (!com.gsk.calendar.dosesContentDisplay) {
                    $(".date-content-1").html("");
                    $(".date-content-" + i).html("");
                }

                //Only Days add
                if (com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && !com.gsk.calendar.dosesAddedMonthsBoolean && !com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate() + com.gsk.calendar.dosesAddedDays - 0)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate() + com.gsk.calendar.dosesAddedDaysVariations[i - 2])));
                    }
                }
                //Only Weeks add
                if (!com.gsk.calendar.dosesAddedDaysBoolean && com.gsk.calendar.dosesAddedWeeksBoolean && !com.gsk.calendar.dosesAddedMonthsBoolean && !com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate() + com.gsk.calendar.dosesAddedWeeks)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate() + com.gsk.calendar.dosesAddedWeeksVariations[i - 2])));
                    }
                }
                //Only Months add
                if (!com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && com.gsk.calendar.dosesAddedMonthsBoolean && !com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth() + com.gsk.calendar.dosesAddedMonths)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth() + com.gsk.calendar.dosesAddedMonthsVariation[i - 2])));
                    }

                }
                //Only Years add
                if (!com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && !com.gsk.calendar.dosesAddedMonthsBoolean && com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYears)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYearsVariation[i - 2])));
                    }
                }
                //Days & Months combinations add
                if (com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && com.gsk.calendar.dosesAddedMonthsBoolean && !com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth() + com.gsk.calendar.dosesAddedMonths)));
                        dateMonths = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateMonths)) + com.gsk.calendar.dosesAddedDays)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth() + com.gsk.calendar.dosesAddedMonthsVariation[i - 2])));
                        dateMonths = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateMonths)) + com.gsk.calendar.dosesAddedDaysVariations[i - 2])));
                    }
                }
                //Days & Years both add in combination
                if (com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && !com.gsk.calendar.dosesAddedMonthsBoolean && com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYears)));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateYears)) + com.gsk.calendar.dosesAddedDays)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYearsVariation[i - 2])));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateYears)) + com.gsk.calendar.dosesAddedDaysVariations[i - 2])));
                    }
                }
                //Months & Years add in combination
                if (!com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && com.gsk.calendar.dosesAddedMonthsBoolean && com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYears)));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth(new Date(dateYears)) + com.gsk.calendar.dosesAddedMonths + 0)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYearsVariation[i - 2])));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth(new Date(dateYears)) + com.gsk.calendar.dosesAddedMonthsVariation[i - 2])));
                    }
                }
                //Days, Months & Years add in combination
                if (com.gsk.calendar.dosesAddedDaysBoolean && !com.gsk.calendar.dosesAddedWeeksBoolean && com.gsk.calendar.dosesAddedMonthsBoolean && com.gsk.calendar.dosesAddedYearsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYears)));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth(new Date(dateYears)) + com.gsk.calendar.dosesAddedMonths + 0)));
                        dateMonths = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateMonths)) + com.gsk.calendar.dosesAddedDays)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("dates" + i, new Date(date.setFullYear(date.getFullYear() + com.gsk.calendar.dosesAddedYearsVariation[i - 2])));
                        dateYears = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setMonth(date.getMonth(new Date(dateYears)) + com.gsk.calendar.dosesAddedMonthsVariation[i - 2])));
                        dateMonths = sessionStorage.getItem("dates" + i);

                        sessionStorage.setItem("dates" + i, new Date(date.setDate(date.getDate(new Date(dateMonths)) + com.gsk.calendar.dosesAddedDaysVariations[i - 2])));
                    }
                }

                ssdates = sessionStorage.getItem("dates" + i);

                //recode
                $('.date' + i).fadeIn(0);
                //Clearing the minDate & maxDate's	
                $('.date' + i).datepicker("option", "maxDate", "");
                $('.date' + i).datepicker("option", "minDate", "");
				
				$('.date' + i).datepicker("option", "monthNames", [ ""+com.gsk.calendar.months[0]+"", ""+com.gsk.calendar.months[1]+"", ""+com.gsk.calendar.months[2]+"", ""+com.gsk.calendar.months[3]+"", ""+com.gsk.calendar.months[4]+"", ""+com.gsk.calendar.months[5]+"", ""+com.gsk.calendar.months[6]+"", ""+com.gsk.calendar.months[7]+"", ""+com.gsk.calendar.months[8]+"", ""+com.gsk.calendar.months[9]+"", ""+com.gsk.calendar.months[10]+"",""+com.gsk.calendar.months[11]+"" ]);
				
				$('.date' + i).datepicker( "option", "dayNamesMin", [ ""+com.gsk.calendar.days[0]+"", ""+com.gsk.calendar.days[1]+"", ""+com.gsk.calendar.days[2]+"", ""+com.gsk.calendar.days[3]+"", ""+com.gsk.calendar.days[4]+"", ""+com.gsk.calendar.days[5]+"", ""+com.gsk.calendar.days[6]+"" ] );

                //Based on the Date Displaying the Dates will displayed in other Calendars
                sessionStorage.setItem("datenum" + i, i);
                datesnumm = eval(sessionStorage.getItem("datenum" + i));
                $(".date" + datesnumm).datepicker("setDate", new Date(ssdates));

                $(".date1").datepicker("setDate", new Date(sessionStorage.getItem("dates1")));

                //Code for Dates Gap Start
                sDate++;
                eDate++;

                // for below condition used "com.gsk.calendar.totaldoses" instead of "dates_length"
                if (sDate > com.gsk.calendar.totaldoses - 1) {
                    sDate = 1;
                }
                if (eDate > com.gsk.calendar.totaldoses) {
                    eDate = 2;
                }

                startDate = $(".date" + sDate).datepicker('getDate');
                endDate = $(".date" + eDate).datepicker('getDate');
                //alert("startDate: "+startDate+" sDate: "+sDate)

                //Code for Dates Gap between 2 calendars
                age_year = Math.floor((new Date(endDate) - new Date(startDate)) / 31536000000);
                age_month = Math.floor(((new Date(endDate) - new Date(startDate)) % 31536000000) / 2628000000);
                age_day = Math.floor((((new Date(endDate) - new Date(startDate)) % 31536000000) % 2628000000) / 86400000);
				
				if(parseInt(age_day) === 1){
					dys = com.gsk.calendar.day;
				}else if(parseInt(age_day) === 0){
					dys = com.gsk.calendar.day;
				}else{
					dys = com.gsk.calendar.day_s;
				}
				
				if(parseInt(age_month) === 1){
					mons = com.gsk.calendar.month;
				}else if(parseInt(age_month) === 0){
					mons = com.gsk.calendar.month;
				}else{
					mons = com.gsk.calendar.month_s;
				}
				
				if(parseInt(age_year) === 1){
					yrs = com.gsk.calendar.year;
				}else if(parseInt(age_year) === 0){
					yrs = com.gsk.calendar.year;
				}else{
					yrs = com.gsk.calendar.year_s;
				}
				
				$(".gap" + i).html("<span class='c-year'>"+"<span class='z-year'>"+parseInt(age_year)+"</span>" + " " + yrs + "</span> <span class='c-month'>" + "<span class='z-month'>"+parseInt(age_month)+"</span>" + " " + mons + "</span> <span class='c-day'>" + "<span class='z-day'>"+parseInt(age_day)+"</span>" + " " + dys + "</span>");
				
                sessionStorage.setItem("gapdates" + i, $(".gap" + i).html());
                $(".gap" + i).html(sessionStorage.getItem("gapdates" + i));
                //Code for Dates Gap End
				$(document).find(".z-year").each(function(){
					if($(this).text() === "0"){
						$(this).parents(".c-year").hide();
					}else{
						$(this).parents(".c-year").show();
					}
				});
				$(document).find(".z-month").each(function(){
					if($(this).text() === "0"){
						$(this).parents(".c-month").hide();
					}else{
						$(this).parents(".c-month").show();
					}
				});
				$(document).find(".z-day").each(function(){
					if($(this).text() === "0"){
						$(this).parents(".c-day").hide();
					}else{
						$(this).parents(".c-day").show();
					}
				});
				
                if (i > com.gsk.calendar.totaldoses) {
                    i = com.gsk.calendar.totaldoses;
                }

                //Based on the Date setting max Date to Dates in Calendar
                var dt = new Date(date);
                if (com.gsk.calendar.dosesMaxDateDaysBoolean && !com.gsk.calendar.dosesMaxDateWeeksBoolean && !com.gsk.calendar.dosesMaxDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setDate(dt.getDate() + com.gsk.calendar.dosesMaxDateDays)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setDate(dt.getDate() + com.gsk.calendar.dosesMaxDateDaysVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMaxDateDaysBoolean && com.gsk.calendar.dosesMaxDateWeeksBoolean && !com.gsk.calendar.dosesMaxDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setDate(dt.getDate() + com.gsk.calendar.dosesMaxDateWeeks)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setDate(dt.getDate() + com.gsk.calendar.dosesMaxDateWeeksVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMaxDateDaysBoolean && !com.gsk.calendar.dosesMaxDateWeeksBoolean && com.gsk.calendar.dosesMaxDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setMonth(dt.getMonth() + com.gsk.calendar.dosesMaxDateMonths)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("maxsession" + i, new Date(dt.setMonth(dt.getMonth() + com.gsk.calendar.dosesMaxDateMonthsVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMaxDateDaysBoolean && !com.gsk.calendar.dosesMaxDateWeeksBoolean && !com.gsk.calendar.dosesMaxDateMonthsBoolean) {
                    sessionStorage.setItem("maxsession" + i, new Date(dt.setMonth(dt.getMonth() + 1000)));
                }
                $(".date" + i).datepicker({
                    dateFormat: "dd/mm/yy"
                })
                $('.date' + i).datepicker("option", "maxDate", new Date(sessionStorage.getItem("maxsession" + i)));

                //Based on the Date setting min Date to Dates in Calendar
                var dtt = new Date(date);
                //					sessionStorage.setItem("minsession"+i,new Date(dtt.setDate(dtt.getDate()-7)));
                if (com.gsk.calendar.dosesMinDateDaysBoolean && !com.gsk.calendar.dosesMinDateWeeksBoolean && !com.gsk.calendar.dosesMinDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setDate(dtt.getDate() - com.gsk.calendar.dosesMinDateDays)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setDate(dtt.getDate() - com.gsk.calendar.dosesMinDateDaysVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMinDateDaysBoolean && com.gsk.calendar.dosesMinDateWeeksBoolean && !com.gsk.calendar.dosesMinDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setDate(dtt.getDate() - com.gsk.calendar.dosesMinDateWeeks)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setDate(dtt.getDate() - com.gsk.calendar.dosesMinDateWeeksVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMinDateDaysBoolean && !com.gsk.calendar.dosesMinDateWeeksBoolean && com.gsk.calendar.dosesMinDateMonthsBoolean) {
                    if (com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setMonth(dtt.getMonth() - com.gsk.calendar.dosesMinDateMonths)));
                    }
                    if (!com.gsk.calendar.dosesGapSame) {
                        sessionStorage.setItem("minsession" + i, new Date(dtt.setMonth(dtt.getMonth() - com.gsk.calendar.dosesMinDateMonthsVariations[i - 2])));
                    }
                }
                if (!com.gsk.calendar.dosesMinDateDaysBoolean && !com.gsk.calendar.dosesMinDateWeeksBoolean && !com.gsk.calendar.dosesMinDateMonthsBoolean) {
                    sessionStorage.setItem("minsession" + i, new Date(dtt.setMonth(dtt.getMonth() - 1000)));
                }
                $(".date" + i).datepicker({
                    dateFormat: "dd/mm/yy"
                })
                $('.date' + i).datepicker("option", "minDate", new Date(sessionStorage.getItem("minsession" + i)));

            }
			
				sessionStorage.setItem("content_display",1)
				for (let i = 1; i <= com.gsk.calendar.totaldoses; i++) {
					if (com.gsk.calendar.dosesContentDisplay) {
						string = com.gsk.calendar['dosesContent' + i];
						len = parseInt($(".limitcontent.date-content-" + i).attr("data-characters"));

						trimmedString = string.length > len ? string.substring(0, len - 3) + "..." : string;
                        
						ival = "dosesContent"+i;
                        
						if(string.length > len){
							$(".date-content-" + i).next(".cal-btn").attr("data-rel",ival)
							$(".date-content-" + i).next(".cal-btn").show();
							$(".date-content-" + i).next(".cal-btn").attr("data-content", string)
						}else{
							$(".date-content-" + i).next(".cal-btn").hide();
						}
						$(".limitcontent.date-content-" + i).html(trimmedString);
					}
				}
			
				$(".pickers").find(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").css({"height":"auto"});
			setTimeout(function(){
				//Below code is used to set max height to all calendars
				var h3height = 0;
				$('.pickers').each(function() {
					if(h3height < $(this).outerHeight()){
						h3height = $(this).outerHeight();
					};
				});
				$(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").height(h3height);
			},0)
			
            //Below code is used to initiate scroller to Datepickers dynamically\
            setTimeout(function () {
                p_id = $(".pickersParent").attr("data-id");
                $(".pickersParent").each(function () {
                    d_id = $(this).attr("data-id");
                    if ($("#pickersParent" + p_id).height() < $("#pickersChild" + d_id).height()) {
                        com.gsk.mt.initScroller($("#pickersParent" + d_id));

                    } else {
                        com.gsk.mt.destroyDialogIscroll($("#pickersParent" + d_id));
                    }
                });
            }, 1000);
			
        },
        onChangeMonthYear: function () {
            setTimeout(function () {
				$(".pickers").find(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").css({"height":"auto"});
				setTimeout(function(){
					for (let i = 2; i <= com.gsk.calendar.totaldoses; i++) {
						//Below code is used to remove Tooltip titles
						$(document).find(".date1").find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
						$(document).find(".date"+i).find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
					}
				},500);
            }, 0);
        }
        //Theme change for Calendars End
    });
    let reset_calendar;
    //sessionStorage.setItem("reset_calendar",1)

    $("body").on(com.gsk.mt.releaseEvent, ".reset-calendar", function () {
		//Used to hide content
		sessionStorage.setItem("content_display",0)
		$(".cal-btn").hide();
		//Used to reset calendars
        if (sessionStorage.getItem("reset_calendar") === "0") {
            sessionStorage.setItem("highlight_date1", new Date());
            sessionStorage.setItem("highlight_date2", new Date());
            sessionStorage.setItem("dates" + 1, new Date())
            $(".date" + 1).datepicker({
                dateFormat: "dd/mm/yy"
            })
            $(".date" + 1).datepicker("setDate", new Date(sessionStorage.getItem("dates" + 1)));
            sessionStorage.setItem("reset_calendar", 1);
            $(".date-reset").fadeOut(0);
        }
        //datetheme();
        $(".cDialog").each(function () {
            $(this).addClass("disable-click");
        })

        setTimeout(function () {
            p_id = $(".pickersParent").attr("data-id")

            $(".pickersParent").each(function () {
                d_id = $(this).attr("data-id");
                if ($("#pickersParent" + p_id).height() < $("#pickersChild" + d_id).height()) {
                    com.gsk.mt.initScroller($("#pickersParent" + d_id));
                } else {
                    com.gsk.mt.destroyDialogIscroll($("#pickersParent" + d_id));
                }
            });
        }, 500)
    });

    let default_Session_Variable = 1;

    setTimeout(function () {
        //Used to hide unrequired
        if (sessionStorage.getItem("hideUnrequired") === "0") {
            $(".gap").fadeIn(0);
            $(".date-content").fadeIn(0);
        }
        if (sessionStorage.getItem("hideUnrequired") === "1") {
            $(".gap").fadeIn(0);
            $(".date-content").fadeIn(0);
        }

        if ($(".pickersParent").hasClass("reset-width")) {
            $(".reset-width").find(".pickersChild").removeClass("scrollableInner");
            $(".reset-width").css({
                "display": "inline-block",
                "width": "auto",
                "height": "auto"
            })
        }
        //Used to show required
        if (sessionStorage.getItem("showRequired") === "1") {
            $(".pickers-info").fadeIn(0);
        }
        //Reset Calendar Items
        if (sessionStorage.getItem("reset_calendar") === "1") {
            $(".date-reset").fadeOut(0);
        }
    }, 600)
    for (let i = 2; i <= com.gsk.calendar.totaldoses; i++) {
		//Below code is used disable last 3days from calendar 2 to last calendar	
		$(".date"+i).datepicker({
        	beforeShowDay: highlightDate
		});

		$('.date' + i).datepicker("option", "monthNames", [ ""+com.gsk.calendar.months[0]+"", ""+com.gsk.calendar.months[1]+"", ""+com.gsk.calendar.months[2]+"", ""+com.gsk.calendar.months[3]+"", ""+com.gsk.calendar.months[4]+"", ""+com.gsk.calendar.months[5]+"", ""+com.gsk.calendar.months[6]+"", ""+com.gsk.calendar.months[7]+"", ""+com.gsk.calendar.months[8]+"", ""+com.gsk.calendar.months[9]+"", ""+com.gsk.calendar.months[10]+"",""+com.gsk.calendar.months[11]+"" ]);
			
		$('.' + com.gsk.calendar.calendars[i-1]).datepicker( "option", "dayNamesMin", [ ""+com.gsk.calendar.days[0]+"", ""+com.gsk.calendar.days[1]+"", ""+com.gsk.calendar.days[2]+"", ""+com.gsk.calendar.days[3]+"", ""+com.gsk.calendar.days[4]+"", ""+com.gsk.calendar.days[5]+"", ""+com.gsk.calendar.days[6]+"" ] );
		
        $(".date-content-1").html(com.gsk.calendar.dosesContent1);
        $(".date-content-" + i).html(com.gsk.calendar['dosesContent' + i]);

        if ($(".pickers").hasClass("date" + i)) {
            sessionStorage.setItem("datenum" + i, i);
            datesnumm = eval(sessionStorage.getItem("datenum" + i));
            ssdate = new Date(sessionStorage.getItem("dates" + i))
            $(".date1").fadeIn(0)
            $(".date" + datesnumm).fadeIn(0)
            $(".date" + datesnumm).datepicker({
                dateFormat: "dd/mm/yy"
            });
            if (sessionStorage.getItem("defaultSessionVariable")) {
                $(".date1").datepicker("setDate", new Date(sessionStorage.getItem("dates1")));
                $(".date" + datesnumm).datepicker("setDate", new Date(sessionStorage.getItem("dates" + datesnumm)));

                //Based on the Date setting max Date to Dates in Calendar
                $(".date" + i).datepicker({
                    dateFormat: "dd/mm/yy"
                })
                $('.date' + i).datepicker("option", "maxDate", new Date(sessionStorage.getItem("maxsession" + i)));

                //Based on the Date setting min Date to Dates in Calendar
                $(".date" + i).datepicker({
                    dateFormat: "dd/mm/yy"
                })
                $('.date' + i).datepicker("option", "minDate", new Date(sessionStorage.getItem("minsession" + i)));
                //Gap between dates
                $("#gap" + i).html(sessionStorage.getItem("gapdates" + i));

            } else {
                $(".date" + datesnumm).datepicker("setDate", new Date());
            }
        }
    }

    $('body').on(com.gsk.mt.releaseEvent, '.openDialog', function () {
		
		if($(this).parents(".pickersParent").hasClass("pickersParent")){
			p_id = $(this).parents(".pickersParent").attr("data-id");
		}else{
			p_id = $(this).attr("data-id");
		}
        setTimeout(function () {
            
            $(".date1").datepicker("setDate", new Date(sessionStorage.getItem("dates1")));

            $(".pickersParent").each(function () {
                if ($("#pickersParent" + p_id).height() < $("#pickersChild" + p_id).height()) {
                    com.gsk.mt.initScroller($("#pickersParent" + p_id));
                } else {
                    com.gsk.mt.destroyDialogIscroll($("#pickersParent" + p_id));
                }
            });
			
			//Below code is used to remove Tooltip titles
			$(document).find(".date1").find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
        }, 100)
    });

//Highlighting Dates Start
function highlightDate(date) {
    sessionStorage.setItem("date", date);
	var today = new Date();
	var d = date.getDate();  
	var dd = today.getDate();
	
    if (new Date(sessionStorage.getItem("date")) >= new Date(sessionStorage.getItem("highlight_date1")) && new Date(sessionStorage.getItem("date")) <= new Date(sessionStorage.getItem("highlight_date2"))) {
        
		
		if((d==29 || d== 30 || d==31) && com.gsk.calendar.disablelast3days){
			return [true,'ui-state-hightlight ui-datepicker-unselectable ui-state-disabled na_dates',''];
		}
		else{
			return [true, 'ui-state-hightlight', 'tooltipText'];
		}
    }

	
	if(com.gsk.calendar.disablelast3days){
		if(d==29 || d== 30 || d==31){
			return [false,'na_dates',''];
		}else{
			return [true,'   ',''];
		}
	}else{
		return [true,'   ',''];
	}
	//return [true, '', ''];
}

let r, abc;

if ($(".pickersParent").hasClass("reset-width")) {
    $(".reset-width").find(".pickersChild").removeClass("scrollableInner");
    $(".reset-width").removeClass("scrollable");
    $(".reset-width").css({
        "display": "inline-block",
        "width": "auto",
        "height": "auto"
    });
    $(".date-reset").fadeOut(0);
}

	setTimeout(function(){
		
		for (let i = 1; i <= com.gsk.calendar.totaldoses; i++) {
			//alert(com.gsk.calendar.dosesContentDisplay)
			if (sessionStorage.getItem("content_display") === "1") {
				string = com.gsk.calendar['dosesContent' + i];
				len = parseInt($(".limitcontent.date-content-" + i).attr("data-characters"));

				trimmedString = string.length > len ? string.substring(0, len - 3) + "..." : string;
				ival = "dosesContent"+i
				if(string.length > len){
					$(".date-content-" + i).next(".cal-btn").attr("data-content", string)
					$(".date-content-" + i).next(".cal-btn").show();
				}else{
					$(".date-content-" + i).next(".cal-btn").hide();
				}
				$(".limitcontent.date-content-" + i).html(trimmedString);
			}else{
				$(".date-content-" + i).next(".cal-btn").hide();
			}
			//Below code is used to remove Tooltip titles
			$(document).find(".date1").find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
			$(document).find(".date"+i).find(".ui-datepicker-calendar .ui-state-hightlight").attr("title","");
		}		
	},500)
		let popCon;
	$("body").on(com.gsk.mt.releaseEvent, ".cal-btn", function(){
		popCon = $(this).attr("data-dialog");
		d_id = $(this).parents(".pickersParent").attr("data-id");
		//alert($(this).attr("data-content"))
		
		$(popCon).find(".dialogBody #calendar-data1").html($(this).attr("data-content"));
		
		setTimeout(function(){
			if ($("#calendar-data-parent1").height() < $("#calendar-data1").height()) {
				com.gsk.mt.initScroller($("#calendar-data-parent1"));
			} else {
				com.gsk.mt.destroyDialogIscroll($("#calendar-data-parent1"));
			}
		},0)
	})

//Below code is used to set max height to all calendars
setTimeout(function(){
	//Below code is used to set max height to all calendars
	var h3height = 0;
	$('.pickers').each(function() {
		if(h3height < $(this).outerHeight()){
			h3height = $(this).outerHeight();
		};
	});
	$(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").height(h3height);
	
	$(document).on(com.gsk.mt.releaseEvent, ".ui-datepicker-next, .ui-datepicker-prev", function(){
		$(".pickers").find(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").css({"height":"auto"});
		setTimeout(function(){
			//Below code is used to set max height to all calendars
			var h3height = 0;
			$('.pickers').each(function() {
				if(h3height < $(this).outerHeight()){
					h3height = $(this).outerHeight();
				};
			});
			$(".ui-datepicker-inline.ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all").height(h3height);
		},10)
	})
	
	$(document).find(".z-year").each(function(){
		if($(this).text() === "0"){
			$(this).parents(".c-year").hide();
		}else{
			$(this).parents(".c-year").show();
		}
	});
	$(document).find(".z-month").each(function(){
		if($(this).text() === "0"){
			$(this).parents(".c-month").hide();
		}else{
			$(this).parents(".c-month").show();
		}
	});
	$(document).find(".z-day").each(function(){
		if($(this).text() === "0"){
			$(this).parents(".c-day").hide();
		}else{
			$(this).parents(".c-day").show();
		}
	});
},700);
    
});

//Below code is used to initiate scroller to Datepickers dynamically
$(window).on("load", function () {
    //to Reset selected dates and hide
    $('.avoid-click').css({
        "width": "100%",
        "height": "70%",
        "position": "absolute",
        "top": "41rem"
    });
    setTimeout(function () {
        if (com.gsk.calendar.resetDate) {
			//Used to hide the content
			sessionStorage.setItem("content_display",0);
			$(".cal-btn").hide();
			//Used to reset the calendars on page refresh
            if (sessionStorage.getItem("reset_calendar") === "0") {
                sessionStorage.setItem("highlight_date1", new Date());
                sessionStorage.setItem("highlight_date2", new Date());
                sessionStorage.setItem("dates" + 1, new Date())
                $(".date" + 1).datepicker({
                    dateFormat: "dd/mm/yy"
                })
                $(".date" + 1).datepicker("setDate", new Date(sessionStorage.getItem("dates" + 1)));
                sessionStorage.setItem("reset_calendar", 1);
                $(".date-reset").fadeOut(0);
                $(".cDialog").each(function () {
                    $(this).addClass("disable-click");
                })
            }
        }

        setTimeout(function () {
			
            p_id = $(".pickersParent").attr("data-id");
            $(".pickersParent").each(function () {
                d_id = $(this).attr("data-id");
                if ($("#pickersParent" + p_id).height() < $("#pickersChild" + p_id).height()) {
                    com.gsk.mt.initScroller($("#pickersParent" + p_id));
                } else {
                    com.gsk.mt.destroyDialogIscroll($("#pickersParent" + p_id));
                }
            });

            if (sessionStorage.getItem("reset_calendar") === "0") {

                $(document).find(".cDialog").each(function () {
                    $(this).removeClass("disable-click");
                })
            }
        }, 1000)
    })
});
// Calendar Functionality End Here