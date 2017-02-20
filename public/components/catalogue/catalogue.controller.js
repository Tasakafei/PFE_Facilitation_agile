/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('catalogueCtrl', function (LabelsService, $scope, CatalogueDataProvider) {

    // Scope methods
    /**
     * Put in the scope workshops that the user is looking for from educational aims
     * @type {searchEduc}
     */
    $scope.searchEduc = searchEduc;
    /**
     * Put in the scope workshops that the user is looking for from the search bar
     * @type {searchTitle}
     */
    $scope.searchTitle = searchTitle;
    /**
     * Return the label color
     * @type {getLabelColor}
     */
    $scope.getLabelColor = getLabelColor;
    /**
     * Open the advanced search
     * @type {dropDown}
     */
    $scope.dropDown = dropDown;
    /**
     * Close the advanced search
     * @type {close}
     */
    $scope.close = close;

    $scope.educational_aims_search = {
        value1: '',
        value2: '',
        value3: '',
        value4: ''
    };
    function searchEduc(row) {
        var isSet = false;
        for (var educ = 0; educ < row.content.educational_aims.length; ++educ) {
            for (var i = 0; i < $scope.educational_aims_search.length ; ++i) {
                if ($scope.educational_aims_search[i] != '') {
                    isSet = true;
                    if ($scope.educational_aims_search[i] == row.workshop.content.educational_aims[educ]) {
                        return true;
                    }
                }
            }
        }
        return isSet != true;
    }

    function searchTitle(row) {
        return angular.lowercase(row.title).indexOf(angular.lowercase($scope.query) || '') !== -1;
    }

    $scope.dataCatalogue = CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
    });

    function getLabelColor(label) {
        // if (label == "Travail itératif") {
        //     return "label-success";
        // } else if (label == "Amélioration continue") {
        //     return "label-primary";
        // } else if (label == "Prévisions") {
        //     return "label-info";
        // } else if (label == "Rétrospective") {
        //     return "label-warning";
        // } else if (label == "TaF - WiP") {
        //     return "label-purple"
        // } else if (label == "Lead time vs Throughput") {
        //     return "label-yellow"
        // } else {
        //     return "label-default";
        // }
        return LabelsService.getText(label);
    }

    var bool = false;

    function dropDown() {
        if (!bool) {
            $('#avancedSearch').addClass('open');
            bool = true;
        } else {
            $('#avancedSearch').removeClass('open');
            bool = false;
        }
        $scope.checkboxModel = {
            value1: 'paper',
            value2: 'YES'
        };
    }

    function close() {
        $('#avancedSearch').removeClass('open');
        bool = false;
    }
});

