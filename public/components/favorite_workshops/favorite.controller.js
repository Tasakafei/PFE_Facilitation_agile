/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('favoriteCtrl', function ($scope, FavoriteWorkshops) {

    $scope.favoriteWorkshops = [];

    getFavoriteWorkshops();
    function getFavoriteWorkshops() {
        FavoriteWorkshops.getFavoriteWorkshops()
            .success(function(data, status, headers, config) {
            $scope.favoriteWorkshops = data;
            })
            .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }
});



