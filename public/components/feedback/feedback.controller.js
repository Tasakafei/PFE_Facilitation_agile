/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', function(FavoriteWorkshops, $scope, $routeParams, $http) {
    var currentId = $routeParams.instanceId;
    $scope.instanceData = {};

    //Photo
    /*document.getElementById('InputPhotos').addEventListener('change', function(){
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

*/
    var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };


    $scope.submit = function () {

        if ($scope.note_u && $scope.note_a) {
            console.log($scope.note_u);
            console.log($scope.note_a);
            console.log($scope.com);

            var feedback = {
                voteDimension1: $scope.note_u,
                voteDimension2: $scope.note_a,
                comment: $scope.com,
                //photos: this.files
            };
            console.log("=================");
            console.log(this.files);
            console.log("=================");
            var res = FavoriteWorkshops.addFeedbackToInstance(feedback, currentId);

            // UPLOAD THE PHOTOS.
            var request = {
                method: 'POST',
                url: '/api/v1/',
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };
            console.log("photo enregistée");
            alert("photo enregistrée");

            // SEND THE PHOTOS.
            $http(request)
                .success(function (d) {
                    alert(d);
                })
                .error(function () {
                });
            console.log("photo envoyée");
            alert("photo envoyée");



            res.success(function (data, status, headers, config) {
                //$scope.message = data;
                $scope.$emit('notify', {
                    type: 'success',
                    title: 'Feedback enregistré'
                });
            });

        } else {
            $scope.$emit('notify', {
                type: 'error',
                title: 'Veuillez compléter les champs de notation'
            });
        }

    };

});
app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
}])

