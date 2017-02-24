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
            .success(function(data) {
            $scope.instances = data;

                for (var i = 0; i < $scope.instances.data.length; i++) {
                    var d = new Date($scope.instances.data[i].begin_at),
                        dformat = [d.getDate().padLeft(),(d.getMonth() + 1).padLeft(), d.getFullYear()].join('/'),
                        hformat = [d.getHours().padLeft(), d.getMinutes().padLeft()].join(':');

                    $scope.dateFormat= dformat;
                    $scope.timeFormat = hformat;
                }
            });
    }

    function getLabelColor(label) {
        LabelsService.getText(label);
    }

    //To display the date in format hh:mm dd/mm/yy
    Number.prototype.padLeft = function(base,chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };
});



