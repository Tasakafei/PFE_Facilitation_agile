/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', ['$scope', function($scope) {

    //Photo
    document.getElementById('InputPhotos').addEventListener('change', function(){
        for(var i = 0; i < this.files.length; i++){
            var file =  this.files[i];
            // Test only...
            console.group("File "+i);
            console.log("name : " + file.name);
            console.log("size : " + file.size);
            console.log("type : " + file.type);
            console.log("date : " + file.lastModified);
            console.groupEnd();
        }
    }, false);

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

        $scope.$emit('notify', {
            type: 'success',
            title: 'Envoyée !',
        });

    };

}]);

