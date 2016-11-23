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
        templateUrl: "components/home/home.html"
      })
      .when("/importer", {
          templateUrl: "components/importer/importer.html",
          controller:"importationCtrl"
      })
      .when("/catalogue", {
          templateUrl: "components/catalogue/catalogue.html",
          controller: "catalogueCtrl"
      })
      .when("/feedback", {
          templateUrl: "components/feedback/feedback.html"

      })
      .when("/catalogue/:catalogueId", {
          templateUrl: "components/workshop/workshop.html",
          controller: "workshopCtrl"
      })
      .otherwise({
          redirectTo: '/'
      });

}]);
