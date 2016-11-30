/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('favoriteCtrl', function ($scope, FavoriteWorkshops) {

    $scope.favoriteWorkshops = [];

    getFavoriteWorkshops();
    function getFavoriteWorkshops() {
        FavoriteWorkshops.getFavoriteWorkshops()
            .success(function(data, status, headers, config) {
            $scope.favoriteWorkshops = data;
            })
            .error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.getLabelColor = function (label) {
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

    };

    /*
    //TODO : Move it
    setTimeout(function(){

        var divDuSpan = document.getElementsByClassName('bugSpan');

        for(var i = 0; i < divDuSpan.length; i++) {
            var aSpan = divDuSpan[i].getElementsByClassName('bugSpan2');
            console.log(divDuSpan[i].offsetWidth);
            console.log(aSpan);

            var cptWidth = 0;

            for(var y = 0; y < aSpan.length; y++) {
                console.log(aSpan[y].offsetWidth);
                cptWidth += aSpan[y].offsetWidth;

                if(divDuSpan[i].offsetWidth < cptWidth) {

                    console.log("Ca dépasse");
                    console.log(y);
                    console.log(aSpan);
                    console.log(aSpan[y]);

                    var br = document.createElement("br");
                    //Ajout du br dans la div
                    divDuSpan[i].appendChild(br);

                    //Swap
                    aSpan[y].parentNode.insertBefore(aSpan[y], br);
                    break;
                }
            }
        }
    }, 100);
    */
});



