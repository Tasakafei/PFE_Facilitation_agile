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

    // Local vars
    var currentId = $routeParams.idInstance;

    // Scope vars
    $scope.workshopInstance = "";

    FavoriteWorkshops.getWorkshopInstance(currentId).then(function (dataResponse) {

        $scope.workshopInstance = dataResponse.data;

    });

    socket.emit('join_room', currentId);

    function deleteInstance() {
        $scope.$emit('notify', {
            type: 'warning',
            title: 'La fonctionnalité n\'est pas encore disponible.'
        });
    }

});

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


