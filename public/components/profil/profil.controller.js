/**
 * Created by user on 22/02/17.
 */
/**
 * Created by user on 22/02/17.
 */
'use strict';



var app = angular.module('facilitation');

app.controller('profilCtrl', function( $scope,$location,Auth) {

    $scope.modifier = modifierFct;
    $scope.profile = {};
    $scope.user = {};
    $scope.error = {};

    /**
     * Put the feedback access link in the $scope
     * @type {getUrl}
     */
    if($scope.currentUser) {
        $scope.name = $scope.currentUser.username;
        $scope.email = $scope.currentUser.email;
    }
    else{
        $scope.name = " ";
        $scope.email =" ";

    }
    function modifierFct() {
        Auth.changePseudo({
               // email:$scope.currentUser.email,
               // oldPassword:$scope.currentUser.password,
                newPseudo:$scope.pseudo


            },
            function(err) {
                $scope.errors = {};
                console.log("pseudo ",$scope.pseudo);


                if (!err) {
                    //$location.path('/');
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