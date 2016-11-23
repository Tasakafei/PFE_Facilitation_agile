/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var app = angular.module('facilitation');
app.service('AccountService', function ($http) {
    delete $http.defaults.headers.common['X-Requested-With'];

    this.register = registerFct;
    this.logOut = logOutFct;
    this.logIn = logInFct;

    function logInFct(callbackFunc) {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/v1/catalogue'
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(){
            alert("error : echec de la récupération du catalogue !");
        });
    };

    function registerFct(username, password, callbackFunc) {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/users/register',
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                username: username,
                password: password
            }
        }).success(function(data){
            // With the data succesfully returned, call our callback
            callbackFunc(data);
        }).error(function(error){
            alert("error : echec de l'inscription !");
        });
    };

    function logOutFct(callbackFunc) {

    };

});

