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
        $scope.data = dataResponse.data;

        //workshop with a note
        console.log(dataResponse);
        for(var i = 0; i < $scope.data.length; i++) {
            if($scope.data[i].grade.participants != 0 || $scope.data[i].grade.facilitators != 0) {
                $scope.data[i].grade.participants = ($scope.data[i].grade.participants + $scope.data[i].grade.facilitators) /2;
                $scope.dataNote.push($scope.data[i]);
            }
        }

    });
});
