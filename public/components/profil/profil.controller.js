/**
 * Created by user on 22/02/17.
 */
/**
 * Created by user on 22/02/17.
 */
'use strict';



var app = angular.module('facilitation');

app.controller('profilCtrl', function( $scope,$location,Auth) {

    $scope.modifierPseudo = modifierPseudoFct;
    //$scope.modifierModDePasse=modifierModDePasseFct;
    $scope.profile = {};
    $scope.user = {};
    $scope.error = {};
   if($scope.currentUser.username == null || $scope.currentUser.email == null){
      $scope.name = " ";
      $scope.email =" ";

   }
    if($scope.currentUser) {
        $scope.name = $scope.currentUser.username;
        $scope.email = $scope.currentUser.email;
    }
    else{
        $scope.name = " ";
        $scope.email =" ";

    }
    console.log("currentUser ",$scope.currentUser.username);

    function modifierPseudoFct() {
        Auth.changePseudo({

                newPseudo:$scope.pseudo

            },
            function(err) {
                $scope.errors = {};
                console.log("pseudo ",$scope.pseudo);


                if (!err) {
                    console.log("pseudo ",$scope.pseudo);

                    $scope.$emit('notify', {
                        type: 'success',
                        title: 'Votre pseudo a bien été modifier.'
                    });

                } else {
                    angular.forEach(err.errors, function(error, field) {
                        console.error("ERROR : " + error + " : "+ field);
                    });

                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Votre pseudo n\'a pas pu être modifier.'
                    });
                }
            }
        );

    }





});