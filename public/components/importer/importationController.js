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
                alert("Succes");
            });
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }
        lecture.readAsText(fichier, 'UTF-8')
    }
});


