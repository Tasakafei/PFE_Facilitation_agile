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

    function getCleanedValues(map) {
        var values = Object.values(map);
        var test = [];
        values.forEach(function (v){
            if (v != "") {
                test.push(v);
            }
        });
        return test;
    }
    function searchEduc(row) {
        var values = getCleanedValues($scope.educational_aims_search);
        if (values.length == 0) {
            return true;
        } else {
            for (var i = 0; i < values.length; ++i) {
                var elem = values[i];
                if (!row.content.educational_aims.includes(elem)) {
                    return false;
                }
            }
            return true;
        }

    }

    function searchTitle(row) {
        return angular.lowercase(row.title).indexOf(angular.lowercase($scope.query) || '') !== -1;
    }

    $scope.dataCatalogue = CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
    });

    function getLabelColor(label) {
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

