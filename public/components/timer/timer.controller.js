/**
 * Created by user on 22/11/16.
 */
'use strict';

var app = angular.module('facilitation.timer', [
    'timer'
]);

app.controller('timerCtrl', function($scope, $injector){

    $scope.testTimer = function(){
      $scope.$broadcast('timer-addCDSeconds("countdown-timer", 10)');
    };

    $scope.startTimer = function (){
        var domEl = document.getElementById("timer");
        domEl.setAttribute("countdown", "42");

        var el = angular.element(domEl);
        $scope = el.scope();
        $injector = el.injector();
        $injector.invoke(function($compile){
            $compile(el)($scope)
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        });

       // $scope.$broadcast('timer-start');
    };

});