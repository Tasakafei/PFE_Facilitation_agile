/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('catalogueCtrl', function ($scope, CatalogueDataProvider) {
    $scope.educational_aims_search = {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
    };
    $scope.searchEduc = function (row) {
        var isSet = false;
        for (var educ in row.workshop.content.educational_aims) {
            for (var toCheck in $scope.educational_aims_search) {
                if ($scope.educational_aims_search[toCheck] != '') {
                    isSet = true;
                    if ($scope.educational_aims_search[toCheck] == row.workshop.content.educational_aims[educ]) {
                        return true;
                    }
                }
            }
        }
        return isSet != true;
    };

    $scope.searchTitle = function (row) {
        return angular.lowercase(row.workshop.title).indexOf(angular.lowercase($scope.query) || '') !== -1;
    };




    //$scope.dataCatalogue = null;
    $scope.dataCatalogue = CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
        // VOILA !
    });

    $scope.getLabelColor = function (label) {
        if (label == "Travail itératif") {
            return "label-success";
        } else if (label == "Amélioration continue") {
            return "label-primary";
        } else if (label == "Prévisions") {
            return "label-info";
        } else if (label == "Rétrospective") {
            return "label-warning";
        } else if (label == "TaF - WiP") {
            return "label-purple"
        } else if (label == "Lead time vs Throughput") {
            return "label-yellow"
        } else {
            return "label-default";
        }

    };
    $scope.rechercher = function () {
        $scope.$emit('notify', {
            type: 'success',
            title: 'recherche en cours',

        });
    };

    var bool = false;

    $scope.dropDown = function () {
        if (!bool) {
            $('#avancedSearch').addClass('open');
            bool = true;
        } else {
            $('#avancedSearch').removeClass('open');
            bool = false;
        }
        $scope.checkboxModel = {
            value1: 'paper',
            value2: 'YES'
        };
    };
    $scope.close = function () {
        $('#avancedSearch').removeClass('open');
        bool = false;
    };
});

