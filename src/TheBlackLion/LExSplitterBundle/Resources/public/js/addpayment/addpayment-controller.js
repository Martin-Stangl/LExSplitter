/**
 * Created by Martin on 06.01.2015.
 */


angular.module('addPaymentModule').controller('addPaymentController', ['$scope', 'Payment', function ($scope,Payment) {

    $scope.payment = new Payment();

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
                $('#otherSplitFields').collapse('hide');
                // set fields to not be required
                $("[id^='splitPercentage']").removeAttr("required");
                $("[id^='splitAmount']").removeAttr("required");
                break;
            case 'other':
                // switch to split method Other
                // set fields to be required
                $("[id^='splitPercentage']").prop("required", true);
                $("[id^='splitAmount']").prop("required", true);
                // show detail split fields
                $('#otherSplitFields').collapse('show');
                scrollTo('#splitLabel');
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

