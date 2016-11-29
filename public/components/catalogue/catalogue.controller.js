/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  08/11/16                     *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var app = angular.module('facilitation');

app.controller('catalogueCtrl', function ($scope, CatalogueDataProvider) {
    $scope.Previsions=" ";
    $scope.TaF_WiP='';
    $scope.Retrospective='';
    $scope.Amelioartion_continue='';
    $scope.Travail_iterative='';
    $scope.Lead_time_vs_Throufhtput='';
    $scope.resultant=" ";

    $scope.stateChanged = function (Previsions) {
        console.log("retros");

        if($scope.answers[Previsions]){ //If it is checked
            alert('Previsions');
            $scope.Previsions='Prévisions';
            // $scope.answers[Retrospective]=true;
            $scope.resultant="Prévisions";
            console.log("Previsions");

        }


    }


    $scope.stateChanged2 = function (Retrospective,TaF_WiP,Previsions) {
        console.log("retros");

        if($scope.answers[Retrospective]){ //If it is checked
            alert('Retro');
            $scope.Retrospective='Rétrospective';
           // $scope.answers[Retrospective]=true;
            console.log("retros2");

        }

    }
    $scope.stateChanged3 = function (TaF_WiP) {

        console.log("taf_wip");
        if($scope.answers[TaF_WiP]){ //If it is checked
            alert('TaF_WiP');
            $scope.TaF_WiP='TaF - WiP';
           // $scope.answers[TaF_WiP]=true;
            console.log("taf_wip");
            $scope.resultant="TaF - WiP";

        }

    }

    $scope.stateChanged4 = function (Amelioartion_continue) {

        console.log("Amelioartion_continue");
        if($scope.answers[Amelioartion_continue]){ //If it is checked
            alert('Amelioartion_continue');
            $scope.Amelioartion_continue='Amélioartion continue';
          //  $scope.answers[Amelioartion_continue]=true;
            console.log("Amelioartion_continue");

        }

    }

    $scope.stateChanged5 = function (Travail_iterative) {

        console.log("Travail_iterative");
        if($scope.answers[Travail_iterative]){ //If it is checked
            alert('ATravail_iterative');
            $scope.Travail_iterative='Travail itérative';
           // $scope.answers[Travail_iterative]=true;
            console.log("Travail_iterative");

        }

    }


    $scope.stateChanged6 = function (Lead_time_vs_Throufhtput) {

        console.log("Lead_time_vs_Throufhtput");
        if($scope.answers[Lead_time_vs_Throufhtput]){ //If it is checked
            alert('Lead_time_vs_Throufhtput');
            $scope.Lead_time_vs_Throufhtput='Lead time vs Throufhtput';
           // $scope.answers[Lead_time_vs_Throufhtput]=true;
            console.log("Lead_time_vs_Throufhtput");

        }
    }




    //$scope.dataCatalogue = null;
    $scope.dataCatalogue = CatalogueDataProvider.getWorkshops(function (dataResponse) {
        $scope.data = dataResponse;
        console.log($scope.data);
        // VOILA !
    });

    $scope.getLabelColor = function (label) {
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

    };
    $scope.rechercher=function(){
        $scope.$emit('notify', {
            type: 'success',
            title: 'recherche en cours',

        });
    };

    var bool = false;

    $scope.dropDown = function() {
        if(!bool) {
            $('#avancedSearch').addClass('open');
            bool = true;
        } else {
            $('#avancedSearch').removeClass('open');
            bool = false;
        }
        $scope.checkboxModel = {
            value1 : 'paper',
            value2 : 'YES'
        };






    };







    $scope.close = function() {
        $('#avancedSearch').removeClass('open');
        bool = false;

        /*if($scope.Previsions){
            $scope.Previsions='Prévisions'
            console.log("previsions")
        }else{
            $scope.Previsions='a';
        }*/

       /* if($scope.Retrospective){
            $scope.Retrospective='Rétrospective'
            console.log("Rétrospective")
        }else{
            $scope.Retrospective='a';

        }*/

        /*if($scope.TaF_WiP){
            $scope.TaF_WiP="TaF - WiP"
            console.log("Taf wip")
        }
        else{
            $scope.TaF_WiP='a';

        }*/





    };




});


/*
app.controller('ExampleController', function($scope) {
    $scope.props = [
        'c1',
        'c2',
        'c3',
        'c4'
    ];
    $scope.atelier = {
        props: ['atelier']
    };

});
*/

/*app.filter('myfilter', function() {
   // var types = workshop.content.educational_aims;
    return function( items,types) {
        var filtered = [];

        angular.forEach(items, function(item) {
            if(types.prévisions == false && types.Travail == false) {
                filtered.push(item);
            }
            else if(types.prévisions == true && types.Travail == false && item.workshop.content.educational_aims == 'Travail'){
                filtered.push(item);
            }
            else if(types.prévisions == true && types.Travail == false && item.workshop.content.educational_aims == 'prévisions'){
                filtered.push(item);
            }
        });

        return filtered;
    };
});

app.controller('ExampleController', function($scope, $filter)
{

    $scope.types = {Travail: false, prévisions:false};



    $scope.search=[];
    /!*$scope.hotels = [
        {
            name: 'the taj hotel',
            star: 5,
            type: 'luxury',
            price: 5675
        },
        {
            name: 'vivanta Palace',
            star: 5,
            type: 'luxury',
            price: 8670
        },
        {
            name: 'aviary',
            star: 4,
            type: 'double suite',
            price: 3000
        },
        {
            name: 'dummy',
            star: 4,
            type: 'dummy',
            price: 33333100
        },
        {
            name: 'good guest',
            star: 3,
            type: 'double suite',
            price: 3500
        },
        {
            name: 'the ramada',
            star: 3,
            type: 'luxury',
            price: 7500
        }
    ];*!/
});*/


/*
 app.controller('ExampleController', ['$scope', function($scope) {
 $scope.checkboxModel = {
 value1 : false,
 value2 : 'YES'
 };

 }]);


 it('should change state', function() {
 var value1 = element(by.binding('checkboxModel.value1'));
 var value2 = element(by.binding('checkboxModel.value2'));

 expect(value1.getText()).toContain('true');
 expect(value2.getText()).toContain('YES');

 element(by.model('checkboxModel.value1')).click();
 element(by.model('checkboxModel.value2')).click();

 expect(value1.getText()).toContain('false');
 expect(value2.getText()).toContain('NO');
 });
 */


/*
 app.controller('CheckCtrl',function($scope){

 $scope.types = [];

 $scope.availableTypes = {
 'apple': 'Pomme',
 'peach': 'Peche',
 'pear':  'Poire'
 }

 // Dit si une case est cochée
 // en testant si le tableau types contient la propriété testée.
 $scope.isTypeChecked = function(typeName){
 return $scope.types.indexOf(typeName) > -1;
 }

 // Coche ou décoche une case
 // en ajoutant ou supprimant une propriété du tableau types
 $scope.toggleTypeSelection = function(typeName){
 if ($scope.isTypeChecked(typeName)) {
 var index = $scope.types.indexOf(typeName);
 $scope.types.splice(index, 1);
 }
 else {
 $scope.types.push(typeName);
 }
 }

 });
 */
/*app.controller('CheckCtrl', ['$scope', 'filterFilter', function CheckCtrl($scope, filterFilter) {
 // Listes des choix
 $scope.tabelauChoix = [
 { nom: 'choix 1', selectionne: true },
 { nom: 'choix 2', selectionne: false },
 { nom: 'choxi 3', selectionne: true }
 ];
 // Eléments choisis par l'utilisateur
 $scope.selection = [];
 // Méthode helper pour récupérer les choix de l'utilisateur
 $scope.elementsChoisis = function elementsChoisis() {
 return filterFilter($scope.choix, { selected: true });
 };
 // On surveille les changements dans les cases à cocher
 $scope.$watch('tableauChoix|filter:{selected:true}', function (nv) {
 $scope.selection = nv.map(function (choix) {
 return choix.nom;
 });
 }, true);
 }]);*/
/*
 app.controller('CheckCtrl',function($scope){
 $scope.showMe = !$scope.showMe;
 $scope.items = [1,2,3,4,5];
 $scope.selected = [1];
 $scope.toggle = function (item, list) {
 var idx = list.indexOf(item);
 if (idx > -1) {
 list.splice(idx, 1);
 }
 else {
 list.push(item);
 }
 };

 $scope.exists = function (item, list) {
 return list.indexOf(item) > -1;
 };

 $scope.isIndeterminate = function() {
 return ($scope.selected.length !== 0 &&
 $scope.selected.length !== $scope.items.length);
 };

 $scope.isChecked = function() {
 return $scope.selected.length === $scope.items.length;
 };

 $scope.toggleAll = function() {
 if ($scope.selected.length === $scope.items.length) {
 $scope.selected = [];
 } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
 $scope.selected = $scope.items.slice(0);
 }
 };
 });




 */

