/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  22/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('workshopCtrl', function ($scope, CatalogueDataProvider, FavoriteWorkshops, $routeParams, $http) {

    // Local vars
    var currentId = $routeParams.catalogueId;

    // Scope vars
    $scope.workshop = "";
    $scope.timingArray = "";

    // Scope methods
    /**
     * Return the label color
     * @type {getLabelColorFct}
     */
    $scope.getLabelColor = getLabelColorFct;

    /**
     * Add the workshop to the user's favorites
     * @type {addToFavoriteFct}
     */
    $scope.addToFavorite = addToFavoriteFct;

    /**
     * Add the workshop to the user's instances
     * @type {addToInstancesFct}
     */
    $scope.addToInstances = addToInstancesFct;

    /**
     * Delete a workshop
     * @type {deleteWorkshop}
     */
    $scope.deleteWorkshop = deleteWorkshop;

    /**
     * Remove the workshop from user's favorites
     * @type {deleteFavorite}
     */
    $scope.deleteFavorite = deleteFavorite;

    CatalogueDataProvider.getWorkshop(currentId, function (dataResponse) {

        var timingArray = dataResponse.data.content.steps.map(function(step, index){
            var stepArray = dataResponse.data.content.steps.slice(0, index);
            return stepArray.reduce(function (accumulateur, currentStep) {
                if(currentStep.duration) return accumulateur + currentStep.duration;
                else return accumulateur;
            }, 0);
        });

        for(var i = 0; i<timingArray.length; i++) {
            var d = new Date(timingArray[i]* 60000); //en miniseconde
            var time = d.toUTCString().split(" ")
            time = time[4].split(":")

            timingArray[i] =  time[0]+":"+time[1];
        }
        $scope.timingArray = timingArray;


        for(var i=0; i < dataResponse.data.content.steps.length; i++) {
            if(dataResponse.data.content.steps[i].duration) {
                dataResponse.data.content.steps[i].duration = dataResponse.data.content.steps[i].duration + " minutes";
            }
        }
        console.log(dataResponse.data);
        $scope.workshop = dataResponse.data;

        if(dataResponse.isFavorite) {
            $('.favorite-false').css("display", "none");
            $('.favorite-true').css("display", "inline-block");
        }

    });

    function getLabelColorFct (label) {
        if(label == "Travail itératif") {
            return "label-success";
        } else if(label == "Amélioration continue") {
            return "label-primary";
        } else if(label == "Prévisions") {
            return "label-info";
        } else if(label == "Rétrospective") {
            return "label-warning";
        } else if(label == "TaF - WiP") {
            return "label-purple"
        } else if(label == "Lead time vs Throughput") {
            return "label-yellow"
        } else {
            return "label-default";
        }

    }

    function addToFavoriteFct() {

        if ($scope.currentUser) {
            var res = FavoriteWorkshops.addToFavoriteWorkshops($scope.currentUser.username, currentId);
            res.success(function (data, status, headers, config) {
                $scope.message = data;

                $('.favorite-false').css("display", "none");
                $('.favorite-true').css("display", "inline-block");

                $scope.$emit('notify', {
                    type: 'success',
                    title: 'L\'atelier a bien été ajouté.',
                    content: '/#/favoriteWorkshops $$Voir mes ateliers favoris'
                });
            });
            res.error(function (data, status, headers, config) {
                $scope.$emit('notify', {
                    type: 'error',
                    title: 'L\'atelier n\'a pas pu être ajouté.'
                });
            });
        } else {
            $scope.$emit('notify', {
                type: 'info',
                title: 'Vous devez être connecté.'
            });
        }
    }

    function deleteFavorite() {
        var res = $http.delete('/users/favorites/'+currentId);
        res.success(function(data, status, headers, config) {

            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'atelier a bien été retiré de vos favoris.',
            });

            $('.favorite-false').css("display", "inline-block");
            $('.favorite-true').css("display", "none");

        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'atelier n\'a pas pu être retiré de vos favoris.',
            });
        });

    }

    function addToInstancesFct() {
        if ($scope.currentUser) {
        var res = FavoriteWorkshops.addWorkshopInstance($scope.currentUser.username, currentId);

        res.success(function(data, status, headers, config) {
            $scope.message = data;
            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'atelier a bien été ajouté.',
                content: '/#/instances $$Voir mes ateliers préparés'
            });
        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'atelier n\'a pas pu être ajouté.'
            });
        });
        } else {
            $scope.$emit('notify', {
                type: 'info',
                title: 'Vous devez être connecté.',
            });
        }
    }

    function deleteWorkshop() {
        var res = $http.delete('/api/v1/catalogue/'+currentId);
        res.success(function(data, status, headers, config) {

            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'atelier a bien été supprimé.',
            });

            //Redirection
            var url = window.location.href;
            url = url.split("catalogue");
            window.location.replace(url[0]+'catalogue');

        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'atelier n\'a pas pu être supprimé.',
            });
        });
    }

});

/* To interpret HTML balise in JSON */
app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


