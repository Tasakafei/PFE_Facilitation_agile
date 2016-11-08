'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('facilitation', [
    'ngRoute',
    'facilitation.catalogue'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when("/", {
        template: "home.html"
      })
      .when("/catalogue", {
          templateUrl: "components/catalogue/catalogue.html",
          controller: "catalogueCtrl"
      })
      .otherwise({
          redirectTo: '/'
      });

}]);
