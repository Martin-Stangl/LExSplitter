/**
 * Created by Martin on 06.01.2015.
 */

angular.module('ngInitModule').directive('input', function ($parse) {
    return {
        restrict: 'E',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            if (attrs.ngModel && attrs.value) {
                var value;
                switch(attrs.type) {
                    case 'number':
                        value = Number(attrs.value);
                        break;
                    default:
                        value = attrs.value;
                }
                $parse(attrs.ngModel).assign(scope, value);
            }
        }
    }
});
