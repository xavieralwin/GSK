// --- local.js --- //
$(document).ready(function () {
    if (com.gsk.mtconfig.piTab && com.gsk.mtconfig.brandTheme && com.gsk.mtconfig.brandThemePi) {
        if (com.gsk.mtconfig.brandThemeClassification) {
            let pitabtheme = window.sessionStorage.getItem("brandtheme");

            let currentTheme = Object.keys(com.gsk.mtconfig.brandThemeClassification).indexOf(pitabtheme);
            let addNumber = currentTheme + 1
            setTimeout(function () {
                $("#piTabs li").removeClass('activeColor');
                $('.piTabWrapper').hide();
                $('.piTab' + addNumber).show();
                $('#piTab' + addNumber).addClass('activeColor');
            }, 50)


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