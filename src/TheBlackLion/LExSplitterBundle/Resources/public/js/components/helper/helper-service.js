/**
 * Created by Martin on 11.01.2015.
 */

angular.module('HelperModule').service('Helper', function() {

    this.scrollToId = function (targetId) {
        angular.element('html, body').animate({scrollTop: angular.element(targetId).offset().top}, 'slow');
    }

});