/**
 * Created by lucas on 23/11/16.
 */
'use strict';

var app = angular.module('facilitation');

app.controller('homeCtrl', function ($scope, CatalogueDataProvider) {
    $scope.data = {};
    CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
    });
});
