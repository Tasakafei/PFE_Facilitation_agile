/**
 * Created by lucas on 23/11/16.
 */

var app = angular.module('facilitation');

app.controller('feedbackCtrl', function (CloudinaryClient, FavoriteWorkshops, tmpDataFactory, $scope, $rootScope, $routeParams) {
    /* Scope vars */
    $scope.instanceData = {};
    $scope.isFacilitator = false;
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
     * Retrieve the current instance data
     */
    FavoriteWorkshops.getInstancesWorkshop(currentId).success(function (response) {
        $scope.instanceData = response;
        response.data[0].facilitators.forEach(function (elem) {
            if (elem._id == $rootScope.currentUser._id) {
                $scope.isFacilitator = true;
            }
        })
    });

    /**
     * Display the uploaded photo
     */
    document.getElementById('InputPhotos').addEventListener('change', function () {
        for (var i = 0; i < this.files.length; i++) {
            var reader = new FileReader();
            reader.onload = onLoadFunction;
            reader.readAsDataURL(this.files[i]);
        }
    }, false);

    function onLoadFunction(loadEvent) {
        $scope.$apply(function () {
            $scope.imagesToDisplay.push(loadEvent.target.result);
        });
    }

    function submit() {
        if (voteX != -1 && voteY != -1) {
            var feedback = {
                voteDimension1: voteY,
                voteDimension2: voteX,
                comment: $scope.com,
                photos: null
            };

            $scope.uploading = "Envoie en cours, veuillez patienter...";
            CloudinaryClient.uploadPhotos($scope.imagesToDisplay)
                .success(function (response) {
                    feedback.photos = response.data;
                    var res = FavoriteWorkshops.addFeedbackToInstance(feedback, currentId);
                    res.success(function () {
                        $scope.$emit('notify', {
                            type: 'success',
                            title: 'Feedback enregistré'
                        });

                        //Redirection after vote
                        var url = window.location.href;
                        url = url.split("feedback");
                        window.location.replace(url[0] + 'thankYou');
                    });
                })
                .error(function (response) {
                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Erreur lors de l\'ajout de Feedback'
                    });
                    console.error('error', response);
                });

        } else {
            $scope.$emit('notify', {
                type: 'error',
                title: 'Veuillez compléter les champs de notation'
            });
        }

    }

    function point_it(event) {
        var pos_x = event.offsetX ? (event.offsetX) : event.pageX - document.getElementById("pointer_div").offsetLeft;
        var pos_y = event.offsetY ? (event.offsetY) : event.pageY - document.getElementById("pointer_div").offsetTop;
        $("#cross").css({top: (pos_y - 12), left: (pos_x + 2), position: 'absolute'});

        document.getElementById("cross").style.visibility = "visible";

        var height = $('#pointer_div').height();
        var width = $('#pointer_div').width();

        var x = 100 * pos_x / height;
        var y = 100 * pos_y / width;


        voteX = Math.floor(x / 16.7);
        voteY = Math.abs(Math.floor(y / 16.7) - 5);

        $('#voteX').html(voteX);
        $('#voteY').html(voteY);

    }

});


