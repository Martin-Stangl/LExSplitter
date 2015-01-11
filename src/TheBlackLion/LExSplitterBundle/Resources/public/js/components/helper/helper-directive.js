/**
 * Created by Martin on 11.01.2015.
 */

// Scroll to element with specified id
angular.module('HelperModule').directive('appOnFocusScrollTo', function (Helper) {
    return function (scope, element, attrs) {
        element.bind('focus', function() {
            //angular.element('html, body').animate({scrollTop: angular.element(attrs.appOnFocusScrollTo).offset().top}, 'slow');
            Helper.scrollToId(attrs.appOnFocusScrollTo);
        })
    }
});
