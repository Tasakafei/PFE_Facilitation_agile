/**
 * Created by user on 22/11/16.
 */

app.controller('importationCtrl', function ($scope,$http) {
    $scope.importer = function () {

        var fichier = document.getElementById('InputJSON').files[0];
        var lecture = new FileReader();
        lecture.onloadend = function (evenement) {
            var donnees = evenement.target.result;

            var res = $http.post('/api/v1/catalogue', donnees);
            res.success(function(data, status, headers, config) {
                $scope.message = data;

                $scope.$emit('notify', {
                    type: 'success',
                    title: 'L\'atelier a bien été importé.',
                });
            });
            res.error(function(data, status, headers, config) {
                $scope.$emit('notify', {
                    type: 'error',
                    title: 'L\'atelier n\'a pas pu être importé.',
                });
            });
        }
        lecture.readAsText(fichier, 'UTF-8')
    }
});