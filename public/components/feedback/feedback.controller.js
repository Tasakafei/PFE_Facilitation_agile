/**
 * Created by lucas on 23/11/16.
 */
var app = angular.module('facilitation');

app.controller('feedbackCtrl', function(FavoriteWorkshops, tmpDataFactory, $scope, $routeParams, $http) {

    /* Scope vars */
    $scope.instanceData = {};
    $scope.imagesToDisplay = [];
    $scope.uploading = "";

    /* vars */
    var currentId = $routeParams.instanceId;
    var voteX = -1;
    var voteY = -1;

    tmpDataFactory.set(currentId);

    // Scope methods
    /**
     * Submit the feedback
     * @type {submit}
     */
    $scope.submit = submit;
    /**
     * Display a note from the element pointed by the user on the graph
     * @type {point_it}
     */
    $scope.point_it = point_it;

    /**
     *  Convert the dataURI
     * @param dataURI
     * @returns {*}
     */
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

    /**
     * Display the uploaded photo
     */
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


    function submit() {
        if (voteX != -1 && voteY != -1) {
            var feedback = {
                voteDimension1: voteY,
                voteDimension2: voteX,
                comment: $scope.com,
                photos: null
            };
            var fd = new FormData();
            for(var i = 0;i < $scope.imagesToDisplay.length ;i++) {
                var imgBlob = dataURItoBlob($scope.imagesToDisplay[i]);
                fd.append('photos', imgBlob);
            }

            $scope.uploading = "Envoie en cours, veuillez patienter...";

            $http.post(
                "/api/v1/feedback/"+currentId+"/photos",
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }
            ).success(function (response) {
                feedback.photos = response.data;
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
            })
            .error(function (response) {
                console.log('error', response);
            });

        } else {
            $scope.$emit('notify', {
                type: 'error',
                title: 'Veuillez compléter les champs de notation'
            });
        }

    };

    function point_it(event) {
        pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
        pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
        $("#cross").css({top: (pos_y-12), left: (pos_x+2), position:'absolute'});

        document.getElementById("cross").style.visibility = "visible" ;

        var height = $('#pointer_div').height();
        var width = $('#pointer_div').width();

        var x = 100 * pos_x / height;
        var y = 100 * pos_y / width;

        // x
        if(x > 0 && x <= 16.6) {
            voteX = 0;
        }
        else if (x > 16.6 && x <= 33.33) {
            voteX = 1;
        }
        else if (x > 33.33 && x <= 50) {
            voteX = 2;
        }
        else if (x > 50 && x <= 66.6) {
            voteX = 3;
        }
        else if (x > 66.66 && x <= 83.33) {
            voteX = 4;
        }
        else if (x > 83.33 && x <= 100) {
            voteX = 5;
        }

        // y
        if(y > 0 && y <= 16.6) {
            voteY = 5;
        }
        else if (y > 16.6 && y <= 33.33) {
            voteY = 4;
        }
        else if (y > 33.33 && y <= 50) {
            voteY = 3;
        }
        else if (y > 50 && y <= 66.6) {
            voteY = 2;
        }
        else if (y > 66.66 && y <= 83.33) {
            voteY = 1;
        }
        else if (y > 83.33 && y <= 100) {
            voteY = 0;
        }

        $('#voteX').html(voteX);
        $('#voteY').html(voteY);

    }

});

/**
 * Filereader
 */
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


