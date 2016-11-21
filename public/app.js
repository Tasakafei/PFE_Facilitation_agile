'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('facilitation', [
    'ngRoute',
    'facilitation.catalogue',
    'facilitation.catalogue.dataProvider'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when("/", {
        templateUrl: "home.html"
      })
      .when("/detail", {
          templateUrl: "detail.html"
      })
      .when("/importer", {
          templateUrl: "importer.html"
      })
      .when("/catalogue", {
          templateUrl: "components/catalogue/catalogue.html",
          controller: "catalogueCtrl"
      })
      .when("/feedBack", {
          templateUrl: "feedBack.html"

      })
      .otherwise({
          redirectTo: '/'
      });

}]);
