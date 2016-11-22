/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation.catalogue');

app.controller('workshopCtrl', function ($scope, CatalogueDataProvider, $routeParams) {
    $scope.workshop = "";
    var currentId = $routeParams.catalogueId;
        CatalogueDataProvider.getWorkshop(currentId, function (dataResponse) {
            $scope.workshop = dataResponse;

        });

});

