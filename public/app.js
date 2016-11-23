'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('facilitation', [
    'ngRoute',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'http-auth-interceptor',
]);

app.config(function($routeProvider) {
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

});

app.run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
        // if no currentUser and on a page that requires authorization then try to update it
        // will trigger 401s if user does not have a valid session
        if (!currentUser && (['/'].indexOf($location.path()) == -1 )) {
            Auth.currentUser();
        }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
        $location.path('/login');
        return false;
    });
});
