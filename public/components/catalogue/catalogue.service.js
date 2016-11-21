/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var app = angular.module('facilitation.catalogue.dataProvider', []);
app.service('CatalogueDataProvider', function ($http) {

    delete $http.defaults.headers.common['X-Requested-With'];
    this.getWorkshops = function(callbackFunc) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/catalogue'
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error");
        });
    }

});

