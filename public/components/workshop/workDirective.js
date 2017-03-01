/**
 * Created by user on 20/02/17.
 */
(function () {
    angular
        .module('facilitation')
        .directive('moment-picker', [function () {
            return {
                restrict: 'E',
                templateUrl: '/components/workshop/workshop.html',
                controller: 'ctrl.component'
            };
        }]);
})();
