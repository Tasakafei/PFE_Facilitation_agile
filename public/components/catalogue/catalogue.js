/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation.catalogue', ['ngRoute']);

app.controller('catalogueCtrl', ['$scope', '$http', catalogueCtrlDef]);
function catalogueCtrlDef($scope, $http) {
    var req = {
        method: 'GET',
        url: 'localhost:3000'
    };
    $scope.catalogue = LoadingStateCatalogue;
    $scope.getCatalogueRequestState = getCatalogueRequestStateFct;
    $http(req).then(function successCallback(response){
        $scope.catalogue = {
            "state": "success",
            "data": response
        }
    }, function errorCallback(response){
        $scope.catalogue = {
            "state": "error",
            "data": response
        }
    });

    /*
     * Objects definition
     */
    var CatalogueStates = {
        "loadingState": {
            "state": "loading"
        },
        "successState": {
            "state": "success"
        },
        "errorState": {
            "state": "error"
        }
    };
    console.log("catalogueCtrl");
    function getCatalogueRequestStateFct () {
        return $scope.catalogue.state;
    }
}

