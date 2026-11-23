// --- local.js --- //
/**
 * Override default orientation based linking destination to demonstrate the use of a variable to determine the
 * destination slide. Will determine slide using a random number for demonstration purposes only.
 * @returns {{slide,presentation}}
 */
com.gsk.mt.custom.orientationLinkOverride = function() {
    var slides = [
            { slide: "MTGSK_Strawman_2023_MF1.0_VERTICAL", presentation: "MTGSK_Strawman_2023_MF1.0_MAIN" },
            { slide: "MTGSK_Strawman_2023_MF1.0_VERTICAL_ALT", presentation: "MTGSK_Strawman_2023_MF1.0_MAIN" },
            { slide: "MTGSK_Strawman_2023_MF1.0_VERTICAL_MAIN", presentation: "MTGSK_Strawman_2023_MF1.0_MAIN" }
        ],
        index = Math.floor(Math.random() * (slides.length));

    return slides[index];
};

