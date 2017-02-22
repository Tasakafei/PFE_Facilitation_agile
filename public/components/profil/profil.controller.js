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
        Auth.changePassword({
                email:$scope.currentUser.email,
                oldPassword:$scope.currentUser.password,
                newPassword:$scope.password_

            },
            function(err) {
                $scope.errors = {};

                $('#myModal4').modal('hide');

                if (!err) {
                    //$location.path('/');

                    $scope.$emit('notify', {
                        type: 'success',
                        title: 'Votre compte a bien été créé.'
                    });

                } else {
                    angular.forEach(err.errors, function(error, field) {
                        console.error("ERROR : " + error + " : "+ field);
                    });

                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Votre compte n\'a pas pu être créé.'
                    });
                }
            }
        );
        $scope.user = {};
    }









});