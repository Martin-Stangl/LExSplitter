/**
 * Created by Martin on 04.01.2015.
 */


// Animated scroll to object with tag ID targetID
function scrollTo (targetID) {
    $('html, body').animate({scrollTop: $(targetID).offset().top}, 'slow');
}

// round to n decimal places
function round (number, places) {
    return +(Math.round(number + "e+" + places)  + "e-" + places);
}
