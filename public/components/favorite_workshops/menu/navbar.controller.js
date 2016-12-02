/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('menuCtrl', function ($scope, $location) {

    // Scope methods
    $scope.isActive = isActive;

    function isActive(viewLocation) {
        return viewLocation === $location.path();
    };
});

