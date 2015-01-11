/**
 * Created by Martin on 06.01.2015.
 */


angular.module('addPaymentModule').controller('addPaymentController', ['$scope', 'Payment', function ($scope,Payment) {

    $scope.payment = new Payment();
    $scope.descriptions = [];

    $scope.myDebug = function(msg) {
        console.log(msg);
    }

//    $( "input[name='paymentBy']" ).change($scope.myDebug('Clicked! payment.payer.personId = '+$scope.payment.payer.personId));

    $scope.toggleSplitMethodForm = function(splitMethod) {
        console.log('splitMethod = '+splitMethod);
        switch(splitMethod) {
            case 'equal':
                // switch to split method Equal
                // hide detail split fields
                angular.element('#otherSplitFields').collapse('hide');
                // set fields to not be required
                angular.element("[id^='splitPercentage']").removeAttr("required");
                angular.element("[id^='splitAmount']").removeAttr("required");
                break;
            case 'other':
                // switch to split method Other
                // set fields to be required
                angular.element("[id^='splitPercentage']").prop("required", true);
                angular.element("[id^='splitAmount']").prop("required", true);
                // show detail split fields
                angular.element('#otherSplitFields').collapse('show');
                Helper.scrollToId('#splitLabel');
                break;
            default:
                console.log('Unknown split method '+splitMethod);
        }
    }

    // Animated scroll to object with tag ID targetID
    function scrollTo (targetID) {
        $('html, body').animate({scrollTop: $(targetID).offset().top}, 'slow');
    }

}]);

