/**
 * Created by Martin on 10.01.2015.
 */

// Object: Person
angular.module('PersonModule').factory('Person', function() {
// See https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// for how to implement public, private and static properties/methods

    // Constructor, with class name
    function Person() {
        // public properties
        this.personId = null;
    }

    // Return the constructor function
    return Person;

});

// Object: List of Persons
angular.module('PersonModule').factory('Persons', function() {
// See https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// for how to implement public, private and static properties/methods

    // Constructor, with class name
    function Persons() {
        // public properties
        this.persons = {};
    }

    // Return the constructor function
    return Persons;

});
