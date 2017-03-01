/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instancesCtrl', function (LabelsService, $scope, EventsService) {

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
        EventsService.getInstancesWorkshop()
            .success(function (data) {
                $scope.instances = data;

                for (var i = 0; i < $scope.instances.data.length; i++) {
                    var d = new Date($scope.instances.data[i].begin_at);
                    moment.locale('fr');
                    $scope.instances.data[i].dateFormat = moment(d).format("L");
                    $scope.instances.data[i].timeFormat = moment(d).format('LT');
                }
            });
    }

    function getLabelColor(label) {
        LabelsService.getText(label);
    }
});



