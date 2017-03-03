/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instanceCtrl', function (LabelsService, $scope, EventsService, $routeParams, $http, socket) {

    /**
     * Remove the workshop from the user's instances
     * @type {deleteInstance}
     */
    $scope.deleteInstance = deleteInstance;

    /**
     * Display the instance feedback QRCode
     * @type {afficherQrcode}
     */
    $scope.afficherQrcode = afficherQrcode;

    /**
     * Hide/display feedback
     * @type {focusFeedback}
     */
    $scope.focusFeedback = focusFeedback;

    /**
     * Return the label color
     * @type {getLabelColorFct}
     */
    $scope.getLabelColor = getLabelColorFct;

    var currentId = $routeParams.idInstance;
    $scope.workshopInstance = "";


    function updateTimings() {
        var steps = $scope.workshopInstance.steps;
        var timingArray = steps.map(function (step, index) {
            return steps.slice(0, index).reduce(function (accumulateur, currentStep) {
                var tmp = 0;
                if (currentStep.duration.theorical) {
                    tmp = currentStep.duration.theorical;
                }
                return accumulateur + tmp;
            }, 0);
        });
        for (var i = 0; i < timingArray.length; i++) {
            var d = new Date(timingArray[i] * 60000);
            var time = d.toUTCString().split(" ");
            time = time[4].split(":");

            timingArray[i] = time[0] + ":" + time[1];
        }
        $scope.timingArray = timingArray;
    }

    $scope.$watch('workshopInstance.steps', function (newVal) {
        if (newVal) {
            updateTimings()
        }
    }, true);
    $scope.addStep = function () {
        $scope.workshopInstance.steps.push({
            description: "nouvelle itération",
            duration: {
                practical: -1,
                theorical: 5
            },
            timing: {
                practical: -1
            },
            title: "nouvelle itération"
        })
    };

    $scope.deleteStep = function (rank) {
        $scope.workshopInstance.steps.splice(rank, 1);
    };

    $scope.updateInstance = function () {
        EventsService.updateWorkshopInstance($scope.workshopInstance._id, $scope.workshopInstance);
        $scope.setEdition("");
        $scope.$emit('notify', {
            type: 'success',
            title: 'Atelier mis à jour'
        });
    };
    EventsService.getWorkshopInstance(currentId).then(function (dataResponse) {
        $scope.workshopInstance = dataResponse.data.data;
        updateTimings();
    });
    function getLabelColorFct(label) {
        return LabelsService.getText(label);
    }

    socket.emit('join_room', currentId);

    function deleteInstance() {
        var res = $http.delete('/users/instances/' + currentId);
        res.success(function () {
            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'instance de l\'atelier a bien été supprimée.',
            });
            var url = window.location.href;
            url = url.split("instances");
            $timeout(function () {
                window.location.replace(url[0] + 'instances');
            }, 100);
        });
        res.error(function () {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'instance de l\'atelier n\'a pas pu être supprimée.'
            });
        });

    }

    var bool = true;

    function afficherQrcode() {

        if (bool) {
            $('.qrcode-off').addClass('qrcode-on');
            $('.qrcode-on').removeClass('qrcode-off');
            bool = false;
        } else {
            $('.qrcode-on').addClass('qrcode-off');
            $('.qrcode-off').removeClass('qrcode-on');
            bool = true;
        }
    }

    function focusFeedback(type) {
        if ($('.feedback-' + type).css("display") == "block") {
            $('#button-' + type).removeClass('active');
            $('.feedback-' + type).css("display", "none");
        } else {
            $('#button-' + type).addClass('active');
            $('.feedback-' + type).css("display", "block");
        }
    }

    $scope.whichEdition = "";
    $scope.setEdition = function (name) {
        if ($scope.whichEdition == name) {
            $scope.whichEdition = "";
        } else {
            $scope.whichEdition = name;
        }
    }
});