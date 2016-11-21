/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation.catalogue', ['ngRoute']);
app.service('catalogueService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function () {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/catalogue'
            //params: 'limit=10, sort_by=created:desc'
        })
    }
});

app.controller('catalogueCtrl', ['$scope', '$http', function ($scope, catalogueService) {
    //$scope.dataCatalogue = null;
    catalogueService.getData().then(function (data) {
        $scope.dataCatalogue = data;
    })
   // $scope.dataCatalogue = catalogueService.getData();
}
]);






