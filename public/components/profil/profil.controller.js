/**
 * Created by user on 22/02/17.
 */
/**
 * Created by user on 22/02/17.
 */
'use strict';



var app = angular.module('facilitation');

app.controller('profilCtrl', function( $scope) {


    /**
     * Put the feedback access link in the $scope
     * @type {getUrl}
     */
    $scope.name =$scope.currentUser.username;
    $scope.email=$scope.currentUser.email;
    console.log("hahha")



});