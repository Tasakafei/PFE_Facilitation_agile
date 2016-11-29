/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('qrcodeCtrl', function ($scope, $routeParams, $location) {
    // Scope vars
    $scope.feedbackLink = location.protocol+"//"+location.host+":"+location.port+"/#/feedback/"+$routeParams.idInstance;
});



