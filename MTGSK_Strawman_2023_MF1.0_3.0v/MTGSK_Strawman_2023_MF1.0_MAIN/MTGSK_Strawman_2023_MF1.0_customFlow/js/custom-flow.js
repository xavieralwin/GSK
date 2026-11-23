/**************************************************/
/* GSK Veeva Master Template - Custom Flow */
/**************************************************/
/* File version              1.0                  */
/* Last modified             25/01/2023           */
/* Last modified by          Design Center        */
/**************************************************/

// --- Custom Flow local.js --- //
$("document").ready(function () {

    if (window.sessionStorage.getItem("customFlowObj")) {
        var createdFlowsData = window.sessionStorage.getItem("customFlowObj");
        var cr = JSON.parse(createdFlowsData);
        $.each(cr, function (key, value) {
            create_flow_item(value, key);
        });
    }

    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();


    /* Close the dropdown if the user clicks outside of it */
    window.onclick = function (event) {
        if (!event.target.matches('#btn-dropdown')) {
            var dropdowns = $("#custom-flow-content");
            if (!dropdowns.hasClass('hidden'))
                dropdowns.addClass('hidden');
        }
    }


    /*  call create new flow function on click */

    $("#btn-create-flow").on(com.gsk.mt.releaseEvent, function () {
        create_flow();
    });

    /*	Call update flow function on click  */

    $("#btn-update-flow").on(com.gsk.mt.releaseEvent, function () {
        update_flow();
    });

    /* Starts selected flow */

    $('#btn-flow-start').on(com.gsk.mt.releaseEvent, function () {
        //alert('Go to home page of custom flow');
        var customFlow = $("#add-flow").val(),
            customFlowActive = $(".custom-flow-item.active"),
            customFlowIndex = customFlowActive.attr("data-flow"),
            createdFlows = $(".custom-flow-lists .custom-flow-item"),
            customFlowObj = {};
        if (customFlow == "" && customFlowActive.length == 0) {
            window.sessionStorage.removeItem("customFlow")
            window.sessionStorage.removeItem("customFlowIndex")
            window.sessionStorage.removeItem("customFlowObj")

            com.gsk.mt.gotoSlide(com.gsk.mtconfig.homepage, com.gsk.mtconfig.presentation);
            //(or)
            //com.gsk.mt.gotoSlide("MTGSK_Strawman_2023_MF1.0_001", com.gsk.mtconfig.presentation);

        } else {
            var firstSlide = customFlowIndex.split(",")[0];
            for (var crF of createdFlows) {
                customFlowObj[crF.lastChild.textContent] = crF.getAttribute("data-flow");
                console.log(crF.getAttribute("data-flow").split(","), crF.lastChild.textContent);
                console.log(firstSlide);
            }
            window.sessionStorage.setItem("customFlow", customFlow);
            window.sessionStorage.setItem("customFlowIndex", customFlowIndex);
            window.sessionStorage.setItem("customFlowObj", JSON.stringify(customFlowObj));
            com.gsk.mt.gotoSlide(com.gsk.mtconfig.pagesAll[firstSlide], com.gsk.mtconfig.presentation);
        }


    });

    /*	Remove selected flow  */

    $("#btn-remove-flow").on(com.gsk.mt.releaseEvent, function () {
        $('#custom-flow-lists').find('.active').remove();
        $('#add-flow').val('');
        moveItemsToTableOne();
        if ($('#custom-flow-lists li').length === 0) {
            $('#btn-dropdown, #btn-remove-flow, #btn-reset-flow').addClass('disabled');
            $("#btn-update-flow, #btn-cancel-flow").addClass('hidden');
            $("#btn-create-flow").removeClass('hidden');
        } else {
            $('#btn-dropdown, #btn-remove-flow, #btn-reset-flow').removeClass('disabled');
        }
    });

    /*  Remove all custom flows  */

    $("#btn-reset-flow").on(com.gsk.mt.releaseEvent, function () {
        $('#custom-flow-lists').empty();
        $('#add-flow').val('');
        $("#btn-update-flow, #btn-cancel-flow").addClass('hidden');
        $("#btn-create-flow").removeClass('hidden');
        $('#btn-dropdown, #btn-remove-flow, #btn-reset-flow').addClass('disabled');
        moveItemsToTableOne();
        window.sessionStorage.removeItem("customFlowObj");
        window.sessionStorage.removeItem("customFlow");
        window.sessionStorage.removeItem("customFlowIndex");
    });


    /*	Cancel selected flow  */

    $("#btn-cancel-flow").on(com.gsk.mt.releaseEvent, function () {
        $('#custom-flow-lists li').removeClass('active');
        $(this).addClass('hidden');
        $('#add-flow').val('');
        $("#btn-update-flow").addClass('hidden');
        $("#btn-create-flow").removeClass('hidden');
        $('#btn-remove-flow').addClass('disabled');
        moveItemsToTableOne();
    });

    /*  Open flowlist  */

    $("#btn-dropdown").on(com.gsk.mt.releaseEvent, function () {
        $("#custom-flow-content").toggleClass("hidden");
    });

    /*  Select flow from flowlist  */

    $("#custom-flow-lists").on(com.gsk.mt.releaseEvent, 'li', function () {
        $("#custom-flow-lists li").removeClass('active');
        let active_flow = $(this).attr('data-flow').split(',').map(Number);
        let flow_name = $(this).addClass('active').find('.custom-flow-link').text();
        $('#add-flow').val(flow_name).focus();
        $("#btn-create-flow").addClass('hidden');
        $("#btn-update-flow, #btn-cancel-flow").removeClass('hidden');
        $("#btn-remove-flow, #btn-reset-flow").removeClass("disabled");
        moveItemsToTableTwo(active_flow);
    });


});

/*  Create flow()  */
function create_flow() {
    let flow_name = $('#add-flow').val().toLowerCase();
    let flow_items = $('#custom-flow-lists').find('li');
    let flow_index = [];

    let cur_flow = $('#sortable2 li').each(function () {
        let li_index = parseInt($(this).attr("data-index"));
        flow_index.push(li_index);
    });

    let isSC = checkFirstLetterSpecialOrNumber(flow_name);

    if (flow_index.length === 0 || flow_name == '') {
        alert('Select slides and give flow name');
        if(flow_name == '' && flow_index.length !== 0){
            document.getElementById("add-flow").focus();
        }
    } else if (isSC == true) {
        alert('Flow name cannot be start with Number or Special charecter');
    } else {
        if (flow_items.length > 0) {
            for (let i = 0; i < flow_items.length; i++) {
                let isCommonFlow = ''
                let item_name = $(flow_items[i]).find('.custom-flow-link').text().toLowerCase();
                let k = flow_items.length - 1;
                if (flow_name === item_name) {
                    alert('Flow name already exists');
                    $('#add-flow').focus();
                    break;
                } else {
                    let aa = $(flow_items[i]).attr('data-flow');
                    let existed_flow = aa.split(',').map(aa => Number(aa));

                    isCommonFlow = isEqual(flow_index, existed_flow);

                    if (isCommonFlow === 'True') {
                        alert('Flow already exists');
                        break;
                    } else {
                        if (k === i)
                            create_flow_item(flow_index, flow_name);
                    }
                }
                if (isCommonFlow === 'True') break;
            }
        } else {
            create_flow_item(flow_index, flow_name);
        }
    }
}


/* Update flow() */
function update_flow() {
    let flow_name = $('#add-flow').val().toLowerCase();
    let flow_items = $('#custom-flow-lists').find('li');
    let flow_index = [];

    let cur_flow = $('#sortable2 li').each(function () {
        let li_index = parseInt($(this).attr("data-index"));
        flow_index.push(li_index);
    });

    let isSC = checkFirstLetterSpecialOrNumber(flow_name);

    if (flow_index.length === 0 || flow_name == '') {
        alert('Select slides and give flow name');
    } else if (isSC == true) {
        alert('Flow name cannot be start with Number or Special charecter');
    } else {
        if (flow_items.length > 1) {
            for (let i = 0; i < flow_items.length; i++) {
                let isCommonFlow;
                let k = flow_items.length - 1;
                if (!$(flow_items[i]).hasClass('active')) {
                    let item_name = $(flow_items[i]).find('.custom-flow-link').text().toLowerCase();
                    if (flow_name === item_name) {
                        alert('Flow name already exists');
                        $('#add-flow').focus();
                        break;
                    } else {
                        let aa = $(flow_items[i]).attr('data-flow');
                        let existed_flow = aa.split(',').map(aa => Number(aa));

                        isCommonFlow = isEqual(flow_index, existed_flow);

                        if (isCommonFlow === 'True') {
                            alert('Flow already exists');
                            break;
                        } else {
                            if (k === i)
                                update_flow_item(flow_index, flow_name);
                        }
                    }
                } else if ($(flow_items[i]).hasClass('active') && (k === i)) {
                    update_flow_item(flow_index, flow_name);
                }

                if (isCommonFlow === 'True') break;
            }
        } else {
            update_flow_item(flow_index, flow_name);
        }
    }
}

/*  Create flow item()  */
function create_flow_item(index, name) {
    flow_name = capitalizeFirstLetter(name);
    let flow_items = `<li class="custom-flow-item" data-flow="${index}"><a class="custom-flow-link" href="#">${flow_name}</a></li>`;

    $('#custom-flow-lists').append(flow_items);
    $('#btn-dropdown, #btn-reset-flow').removeClass('disabled');
    $('#add-flow').val('');
    moveItemsToTableOne();
}

/*  Update flow item()  */
function update_flow_item(index, name) {
    flow_name = capitalizeFirstLetter(name);
    $("#custom-flow-lists li.active").attr('data-flow', index).find('.custom-flow-link').text(flow_name);
    $('#btn-dropdown, #btn-reset-flow').removeClass('disabled');
    $('#btn-remove-flow').addClass('disabled');
    $("#btn-update-flow, #btn-cancel-flow").addClass('hidden');
    $("#btn-create-flow").removeClass('hidden');
    $("#custom-flow-lists li").removeClass('active');
    $('#add-flow').val('');
    moveItemsToTableOne();
}

// Define function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Check if a string starts with a special charecter */
function checkFirstLetterSpecialOrNumber(_string) {
    let firstChar = _string.charAt(0);
    let spCharsRegExp = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let isSpecialChar = spCharsRegExp.test(_string);

    if (firstChar <= '9' && firstChar >= '0' || isSpecialChar == true)
        return true;
    else
        return false;
}

/* Check if a string  */


/* Sort custom flow list in table1  */
function sort_li(a, b) {
    return ($(b).data('index')) < ($(a).data('index')) ? 1 : -1;
}

/*  Compare new flow with existing flow  */
function isEqual(newFlow, existedFlow) {
    if (newFlow.length != existedFlow.length)
        return 'False';
    else {
        for (let i = 0; i < newFlow.length; i++)
            if (newFlow[i] != existedFlow[i])
                return 'False';

        return 'True';
    }
}

/*  Move slides from table2 to table1  */
function moveItemsToTableOne() {
    $('#sortable2 li').map(function () {
        $(this).appendTo($("#sortable1"));
    });
    let sorted_list = $("#sortable1").find('li').sort(sort_li);
    $('#sortable1').html(sorted_list);
}

/*  Move slides table1 to table2  */
function moveItemsToTableTwo(items) {
    let table1_items = $('#sortable1').find('li');
    for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < table1_items.length; j++) {
            let data_index = $(table1_items[j]).attr('data-index');
            let index_name = $(table1_items[j]).text();
            data_index = parseInt(data_index);

            if (data_index === items[i]) {
                let flow_items = '<li class="ui-state-default ui-sortable-handle" data-index="' + items[i] + '">' + index_name + '</li>';
                $(flow_items).appendTo("#sortable2");
                $('#sortable1').find('li[data-index=' + items[i] + ']').remove();
            }
        }
    }
}