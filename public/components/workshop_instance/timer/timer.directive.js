/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
(function() {
    angular
        .module('facilitation')
        .directive('timer', [function () {
            return {
                restrict: 'E',
                templateUrl: '/components/workshop_instance/timer/timer.html',
                controller: 'timerCtrl'
            };
        }]);
})();





