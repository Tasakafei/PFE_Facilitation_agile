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
            console.log("ok");
            console.log(donnees);

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }


            //TODO post

            /* $http.post('/', donnees, config)
                .success(function (donnees, status, headers, config) {
                    $scope.PostDataResponse = donnees;
                    console.log("cest fait");
                })
                .error(function (donnes, status, header, config) {
                    $scope.ResponseDetails = "Donnees: " + donnees +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });

*/

//traitement


        }
        lecture.readAsBinaryString(fichier)

       // console.log(lecture.readAsBinaryString(fichier));
       // console.log(a);
    }
});


