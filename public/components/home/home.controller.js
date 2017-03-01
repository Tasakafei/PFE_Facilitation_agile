/**
 * Created by lucas on 23/11/16.
 */
'use strict';

var app = angular.module('facilitation');

app.controller('homeCtrl', function ($scope, CatalogueDataProvider) {
    $scope.data = {};
    $scope.dataNote = [];

    /**
     * Put in the $scope.dataNote workshops with a note to display them on the first page
     */
    CatalogueDataProvider.getWorkshops(function (dataResponse) {
        var response = dataResponse.data;
        $scope.data = [];

        //workshop with a note
        for (var i = 0; i < response.length; i++) {
            if (response[i].grade.participants != 0 || response[i].grade.facilitators != 0) {
                response[i].grade.participants = (response[i].grade.participants + response[i].grade.facilitators) / 2;
                $scope.data.push(response[i]);
            }
        }

    });
});
