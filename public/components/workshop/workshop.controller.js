/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation.catalogue');

app.controller('workshopCtrl', function ($scope, CatalogueDataProvider, $routeParams) {
    $scope.workshop = "";
    var currentId = $routeParams.catalogueId;
        CatalogueDataProvider.getWorkshop(currentId, function (dataResponse) {

            /*
            for(var i=0; i < dataResponse.data[0].content.steps.length; i++) {
                console.log(dataResponse.data[0].content.steps[i].description);
                dataResponse.data[0].content.steps[i].description = dataResponse.data[0].content.steps[i].description.replace("--", "<li>");
                dataResponse.data[0].content.steps[i].description = dataResponse.data[0].content.steps[i].description.replace("$$", "<ul>");
            }
            */

            $scope.workshop = dataResponse.data[0];
        });

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
});

app.controller('detailCtrl', function ($scope,$http) {

    $scope.count = 0;
    $scope.voter = function () {
        $scope.count++;
        if($scope.count > 5){
            $scope.count = 5 ;
        }

    }


});


app.filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);
