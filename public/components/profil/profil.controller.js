/**
 * Created by user on 22/02/17.
 */
/**
 * Created by user on 22/02/17.
 */
'use strict';


var app = angular.module('facilitation');

app.controller('profilCtrl', function ($scope, $location, Auth) {


    // Scope methods
    /**
     * Update the pseudo
     * @type {modifierPseudo}
     */
    $scope.modifierPseudo = modifierPseudoFct;


    /**
     * Update the email
     * @type {modifierEmail}
     */
    $scope.modifierEmail = modifierEmailFct;

    /**
     * Update the password
     * @type {modifierMotPasse}
     */
    $scope.modifierMotPasse = modifierMotPasseFct;

    // Scope variables
    $scope.profile = {};
    $scope.user = {};
    $scope.error = {};

    if ($scope.currentUser.username == null || $scope.currentUser.email == null) {
        $scope.name = " ";
        $scope.email = " ";
    }

    if ($scope.currentUser) {
        $scope.name = $scope.currentUser.username;
        $scope.email = $scope.currentUser.email;
        $scope.password = $scope.currentUser.password;
    } else {
        $scope.name = " ";
        $scope.email = " ";
    }

    function modifierPseudoFct() {
        Auth.updateUser({
                username: $scope.pseudo
            },
            function (err) {
                $scope.errors = {};
                if (err) {
                    $scope.$emit('notify', {
                        type: 'success',
                        title: 'Votre pseudo a bien été modifier.'
                    });

                } else {
                    angular.forEach(err.errors, function (error, field) {
                        console.error("ERROR : " + error + " : " + field);
                    });

                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Votre pseudo n\'a pas pu être modifier.'
                    });
                }
            }
        );
    }

    function modifierEmailFct() {
        Auth.updateUser({
                email: $scope.email_
            },
            function (err) {
                $scope.errors = {};
                if (err) {
                    $scope.$emit('notify', {
                        type: 'success',
                        title: 'Votre email a bien été modifier.'
                    });
                } else {
                    angular.forEach(err.errors, function (error, field) {
                        console.error("ERROR : " + error + " : " + field);
                    });
                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Votre email n\'a pas pu être modifier.'
                    });
                }
            }
        );
    }

    function modifierMotPasseFct() {
        Auth.updateUser({
                password: $scope.password_
            },
            function (err) {
                $scope.errors = {};
                if (err) {
                    $scope.$emit('notify', {
                        type: 'success',
                        title: 'Votre password a bien été modifier.'
                    });
                } else {
                    angular.forEach(err.errors, function (error, field) {
                        console.error("ERROR : " + error + " : " + field);
                    });
                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Votre password n\'a pas pu être modifier.'
                    });
                }
            }
        );
    }
});