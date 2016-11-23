/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('workshopCtrl', function ($scope, CatalogueDataProvider, $routeParams) {
    $scope.workshop = "";
    var currentId = $routeParams.catalogueId;
        CatalogueDataProvider.getWorkshop(currentId, function (dataResponse) {
            $scope.workshop = dataResponse.data[0];

        });

    $scope.getLabelColor = function (label) {
        if(label == "Travail itératif") {
            return "label-success";
        } else if(label == "Amélioration continue") {
            return "label-primary";
        } else if(label == "Prévisions") {
            return "label-info";
        } else if(label == "Rétrospective") {
            return "label-warning";
        } else {
            return "label-default";
        }

    };
});

