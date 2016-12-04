/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', function(FavoriteWorkshops, $scope, $routeParams, $http) {
    var currentId = $routeParams.instanceId;
    $scope.instanceData = {};

    //you need this function to convert the dataURI
    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    }



    $scope.imagesToDisplay = [];
    //Photo
    document.getElementById('InputPhotos').addEventListener('change', function(){
        for(var i = 0; i < this.files.length; i++){
            var file =  this.files[i];

            var reader = new FileReader();
            reader.onload = function(loadEvent) {
                $scope.$apply(function() {
                    $scope.imagesToDisplay.push(loadEvent.target.result);
                });
            };
            reader.readAsDataURL(this.files[i]);
        }
    }, false);

    $scope.submit = function () {
        if ($scope.note_u && $scope.note_a) {
            var feedback = {
                voteDimension1: $scope.note_u,
                voteDimension2: $scope.note_a,
                comment: $scope.com,
            };
            var fd = new FormData();
            for(var i = 0;i < $scope.imagesToDisplay.length ;i++) {
                var imgBlob = dataURItoBlob($scope.imagesToDisplay[i]);
                fd.append('photos', imgBlob);
            }

            $http.post(
                "/api/v1/feedback/"+currentId+"/photos",
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            )
                .success(function (response) {

                    console.log('success', response);
                })
                .error(function (response) {
                    console.log('error', response);
                });










            var res = FavoriteWorkshops.addFeedbackToInstance(feedback, currentId);

            res.success(function (data, status, headers, config) {
                $scope.$emit('notify', {
                    type: 'success',
                    title: 'Feedback enregistré'
                });

                //Redirection after vote
                var url = window.location.href;
                url = url.split("feedback");
                window.location.replace(url[0]+'thankYou');
            });

        } else {
            $scope.$emit('notify', {
                type: 'error',
                title: 'Veuillez compléter les champs de notation'
            });
        }

    };

});
//your directive
app.directive("fileread", [
    function() {
        return {
            scope: {
                fileread: "="
            },
            link: function(scope, element, attributes) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]);

