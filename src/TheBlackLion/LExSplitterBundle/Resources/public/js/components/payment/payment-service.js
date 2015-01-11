/**
 * Created by Martin on 10.01.2015.
 */

angular.module('PaymentModule').factory('Payment', function(Person, Bill) {
    // See https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
    // for how to implement public, private and static properties/methods

    // Constructor, with class name
    function Payment() {
        // public properties
        this.payer = new Person();
        this.bill = new Bill();
        this.split();
    }

    Payment.prototype.split = function() {
        this.method = "";
    }

    // Return the constructor function
    return Payment;

});


