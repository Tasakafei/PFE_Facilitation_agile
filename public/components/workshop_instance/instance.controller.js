/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('instanceCtrl', function ($scope, FavoriteWorkshops, $routeParams, $http, socket) {

    // Scope methods
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
    $scope.focusFeedback= focusFeedback;

    /**
     * Return the label color
     * @type {getLabelColorFct}
     */
    $scope.getLabelColor = getLabelColorFct;


    // Local vars
    var currentId = $routeParams.idInstance;

    // Scope vars
    $scope.workshopInstance = "";

    FavoriteWorkshops.getWorkshopInstance(currentId).then(function (dataResponse) {
        $scope.workshopInstance = dataResponse.data.data;

        var timingArray = $scope.workshopInstance.steps.map(function(step, index){
            var stepArray = $scope.workshopInstance.steps.slice(0, index);
            return stepArray.reduce(function (accumulateur, currentStep) {
                if(currentStep.duration.theorical) return accumulateur + currentStep.duration.theorical;
                else return accumulateur;
            }, 0);
        });

        for(var i = 0; i<timingArray.length; i++) {
            var d = new Date(timingArray[i] * 60000); //en miniseconde
            var time = d.toUTCString().split(" ");
            time = time[4].split(":");

            timingArray[i] =  time[0]+":"+time[1];
        }
        $scope.timingArray = timingArray;

        //Add word "minutes" to duration
        for(var j=0; j < $scope.workshopInstance.steps.length; j++) {
            if($scope.workshopInstance.steps[j].duration.theorical) {
                $scope.workshopInstance.steps[j].duration.theorical = $scope.workshopInstance.steps[j].duration.theorical + " minutes";
            }
        }
    });

    function getLabelColorFct (label) {
        if(label == "Travail itératif") {
            return "label-success";
        } else if(label == "Amélioration continue") {
            return "label-primary";
        } else if(label == "Prévisions") {
            return "label-info";
        } else if(label == "Rétrospective") {
            return "label-warning";
        } else if(label == "TaF - WiP") {
            return "label-purple"
        } else if(label == "Lead time vs Throughput") {
            return "label-yellow"
        } else {
            return "label-default";
        }

    }

    socket.emit('join_room', currentId);

    function deleteInstance() {
        var res = $http.delete('/users/instances/'+currentId);
        res.success(function() {
            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'instance de l\'atelier a bien été supprimée.',
            });
            var url = window.location.href;
            url = url.split("instances");
            window.location.replace(url[0]+'instances');
        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'instance de l\'atelier n\'a pas pu être supprimée.'
            });
        });

    }

    var bool = true;
    function afficherQrcode() {

        if(bool) {
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
        if($('.feedback-'+type).css("display") == "block") {
            $('#button-'+type).removeClass('active');
            $('.feedback-'+type).css("display", "none");
        } else {
            $('#button-'+type).addClass('active');
            $('.feedback-'+type).css("display", "block");
        }
    }


});



;