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
        this.amount = null;
    }

    // Public setters and getters
    Bill.prototype = {
        get date() {
            if (date == null){
                return null;
            }
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
            var dd  = date.getDate().toString();
            return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
        },
        set date(value) {
            var d = new Date(value);
            if ( Object.prototype.toString.call(d) === "[object Date]" ) {
                // it is a date
                if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
                    date = null;
                    // date is not valid
                }
                else {
                    // date is valid
                    date = d;
                }
            }
            else {
                // not a date
                date = null;
            }
        }
    }

    // private variables
    var date = null;



    // Return the constructor function
    return Bill;

});


