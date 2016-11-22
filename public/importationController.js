/**
 * Created by user on 22/11/16.
 */

app.controller('importationCtrl', function ($scope,$http) {
    $scope.importer = function () {
       /* var fichier = document.getElementById('InputPhoto').files[0];
        $http.get("fichier").then(function (response) {
            console.log($scope.myData);
            $scope.myData = response.data.records;
        });
    }});

*/


        var fichier = document.getElementById('InputPhoto').files[0];
        var lecture = new FileReader();
        lecture.onloadend = function (evenement) {
            var donnees = evenement.target.result;
//traitement
            console.log(donnees);
        }
        lecture.readAsBinaryString(fichier);
    }
});


