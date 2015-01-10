/**
 * Created by Martin on 06.01.2015.
 */


angular.module('addPaymentModule').controller('addPaymentController', ['$scope', 'Bill', function ($scope,Bill) {

    $scope.Bill = new Bill();

    alert("Bill.amount = " + $scope.Bill.amount);
}]);