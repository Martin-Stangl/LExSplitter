/**
 * Created by Martin on 06.01.2015.
 */

/*
// Load initial values of HTML input fields into bound angularjs variables ($scope)
angular.module('ngInitModule').directive('input', function ($parse) {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            if (attrs.ngModel && attrs.value) {
                var value;
                switch(attrs.type) {
                    case 'date':
                        value = new Date(attrs.value);
                        break;
                    case 'number':
                        value = Number(attrs.value);
                        break;
                    case 'radio':
                        if (attrs.checked) {
                            value = attrs.value;
                        };
                        break;
                    default:
                        value = attrs.value;
                        console.log('Unknown attrs.type '+attrs.type);
                        console.log(element);
                        console.log(attrs);
                }
                if (value) {
                    $parse(attrs.ngModel).assign(scope, value);
                }
            }
        }
    }
});
 */

/*
// Load initial values of HTML angular UI Bootstrap radio buttons into bound angularjs variables ($scope)
angular.module('ngInitModule').directive('btnRadio', function ($parse) {
    return {
        // restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs) {

            console.log(attrs);
            $parse(attrs.ngModel).assign(scope, attrs.btnRadio);
                }
            }
    });
*/