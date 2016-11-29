/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instanceCtrl', function ($scope, FavoriteWorkshops, $routeParams, $http) {

    // Local vars
    var currentId = $routeParams.idInstance;

    // Scope vars
    $scope.workshopInstance = "";

    FavoriteWorkshops.getWorkshopInstance(currentId).then(function (dataResponse) {

        console.log(dataResponse.data);
        $scope.workshopInstance = dataResponse.data;
    });

});

/* To interpret HTML balise in JSON */
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);



