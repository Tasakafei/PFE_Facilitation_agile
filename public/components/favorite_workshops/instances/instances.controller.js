/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instancesCtrl', function ($scope, FavoriteWorkshops) {

    $scope.instances = [];

    getWorkshopsInstances();
    function getWorkshopsInstances() {
        FavoriteWorkshops.getWorkshopsInstances()
            .success(function(data, status, headers, config) {
            $scope.instances = data;
            })
            .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
});



