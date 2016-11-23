/**
 * Created by user on 23/11/16.
 */

app.controller('detailCtrl', function ($scope,$http) {

    $scope.count = 0;
    $scope.voter = function () {
        $scope.count++;
    }


});