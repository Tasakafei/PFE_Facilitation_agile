'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('facilitation', [
    'ngRoute',
    'facilitation.catalogue',
    'facilitation.catalogue.dataProvider',
    'facilitation.timer'
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
      .when("/catalogue/:catalogueId", {
          templateUrl: "components/workshop/workshop.html",
          controller: "workshopCtrl"
      })
      .when("/timer",{
          templateUrl: "components/timer/timer.html",
          controller: "timerCtrl"
      })
      .otherwise({
          redirectTo: '/'
      });

}]);
