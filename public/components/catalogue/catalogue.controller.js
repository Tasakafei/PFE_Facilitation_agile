/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation.catalogue', [
    'ngRoute',
    'facilitation.catalogue.dataProvider'
]);

app.controller('catalogueCtrl', function ($scope, CatalogueDataProvider) {

    //$scope.dataCatalogue = null;
    $scope.dataCatalogue = CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
        // VOILA !
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






