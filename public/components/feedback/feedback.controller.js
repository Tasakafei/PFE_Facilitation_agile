/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', function(FavoriteWorkshops, $scope, $routeParams, $http) {
    var currentId = $routeParams.instanceId;
    $scope.instanceData = {};
    //the image
    $scope.uploadme;

    $scope.uploadImage = function() {
        var fd = new FormData();
        var imgBlob = dataURItoBlob($scope.uploadme);
        fd.append('file', imgBlob);
        console.log("-----------");
        console.log(imgBlob);
        console.log("-------------");
        $http.post(
            "/api/v1/feedback/"+currentId+"/picture",
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
    }
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
   /* var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        });
    };*/


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
            /*var request = {
                method: 'POST',
                url: '/api/v1/feedback',
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
            //console.log("photo envoyée");
            //alert("photo envoyée");*/



            res.success(function (data, status, headers, config) {
                //$scope.message = data;
                $scope.$emit('notify', {
                    type: 'success',
                    title: 'Feedback enregistré'
                });


                //Redirection after vote
                var url = window.location.href;
                url = url.split("feedback");
                var redir = 'window.location.replace("'+url[0]+'thankYou");';
                setTimeout(redir, 1500);
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
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }
]);

