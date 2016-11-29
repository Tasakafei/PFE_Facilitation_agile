/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instanceCtrl', function ($scope, FavoriteWorkshops, $routeParams, $http, socket) {

    // Local vars
    var currentId = $routeParams.idInstance;

    // Scope vars
    $scope.workshopInstance = "";


    FavoriteWorkshops.getWorkshopInstance(currentId).then(function (dataResponse) {

        $scope.workshopInstance = dataResponse.data;

    });

    console.log("AAAAAA");
    socket.emit('join_room', currentId);

});



