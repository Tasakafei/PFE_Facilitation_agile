/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', ['$scope', function($scope) {

    $scope.submit = function () {

        if($scope.note_u) {
            console.log($scope.note_u);
            $scope.note_u = '';
        }
        if ($scope.note_a) {
            console.log($scope.note_a);
            $scope.note_a = '';
        }
        if ($scope.com) {
            console.log($scope.com);
            $scope.com = '';
        }
    };

}]);