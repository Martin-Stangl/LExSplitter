/**
 * Created by Martin on 05.01.2015.
 */

var app = angular.module('addPayment', [])
    .controller('addPaymentController', ['$scope', function($scope) {

        $scope.Payment = new Payment();
        $scope.Person = new Persons();
        $scope.splitMethod = "";
        $scope.amount;

//        Payment.amount = element(by.model('Payment.amount'));
//        alert("Payment.amount = "+Payment.amount);
        alert("amount = "+amount);

    }])