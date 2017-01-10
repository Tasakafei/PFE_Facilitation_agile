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
        $scope.data = dataResponse;

        //workshop with a note
        for(var i = 0; i < $scope.data.data.length; i++) {
            if($scope.data.data[i].votes.participants != 0 || $scope.data.data[i].votes.facilitators != 0) {
                $scope.data.data[i].votes.participants = ($scope.data.data[i].votes.participants + $scope.data.data[i].votes.facilitators) /2;
                $scope.dataNote.push($scope.data.data[i]);
            }
        }

    });
});
