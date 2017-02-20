/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instancesCtrl', function (LabelsService, $scope, FavoriteWorkshops) {

    $scope.instances = [];

    // Scope methods
    /**
     * Return the label color
     * @type {getLabelColor}
     */
    $scope.getLabelColor = getLabelColor;
    getWorkshopsInstances();
    /**
     * Put in $scope.instances the instances workshops to display
     */
    function getWorkshopsInstances() {
        FavoriteWorkshops.getInstancesWorkshop()
            .success(function(data) {
            $scope.instances = data;
            })
    }

    function getLabelColor(label) {
        LabelsService.getText(label);
    }
});



