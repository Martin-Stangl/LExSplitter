/**
 * Created by Martin on 06.01.2015.
 */

angular.module('BillModule').factory('Bill', function() {
    // See https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
    // for how to implement public, private and static properties/methods

    // Constructor, with class name
    function Bill() {
        // public properties
        this.description = "";
        this.date = new Date();
        this.amount = 0.00;
    }

    // Return the constructor function
    return Bill;

});


