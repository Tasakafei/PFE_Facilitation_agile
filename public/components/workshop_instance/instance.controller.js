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
    $scope.deleteInstance = deleteInstance;
    $scope.afficherQrcode = afficherQrcode;
    $scope.focusFeedback= focusFeedback;


    // Local vars
    var currentId = $routeParams.idInstance;

    // Scope vars
    $scope.workshopInstance = "";

    FavoriteWorkshops.getWorkshopInstance(currentId).then(function (dataResponse) {

        $scope.workshopInstance = dataResponse.data;

    });

    socket.emit('join_room', currentId);

    function deleteInstance() {
        /*
        $scope.$emit('notify', {
            type: 'warning',
            title: 'La fonctionnalité n\'est pas encore disponible.'
        });
        */

        var res = $http.delete('/users/instances/'+currentId);
        res.success(function(data, status, headers, config) {

            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'instance de l\'atelier a bien été supprimée.',
            });

            //Redirection after vote
            var url = window.location.href;
            url = url.split("instances");
            window.location.replace(url[0]+'instances');

        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'instance de l\'atelier n\'a pas pu être supprimée.',
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