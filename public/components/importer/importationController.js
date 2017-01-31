/**
 * Created by user on 22/11/16.
 */

app.controller('importationCtrl', function ($scope,$http) {

    // Scope methods
    /**
     * Import a workshop from a JSON file
     * @type {importer}
     */
    $scope.importer = importer;

    $scope.getFields = getFields;

    $scope.inputStepTitle = "inputStepTitle";
    $scope.inputStepDuration = "inputStepDuration";
    $scope.stepsTextarea = "stepsTextarea";
    $scope.stepsTextareaAncre = "steps-textarea-ancre"
    var cpt = 1;

    $('#folklore-textarea').wysihtml5({
        toolbar: {
            "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
            "link": false, //Button to insert a link. Default true
            "image": false, //Button to insert an image. Default true,
            "color": false, //Button to change color of font
            "blockquote": false, //Blockquote
            "fa": true // Font Awesome icons
        }
    });

    $('#equipment-textarea').wysihtml5({
        toolbar: {
            "font-styles": false,
            "link": false,
            "image": false,
            "color": false,
            "blockquote": false,
            "fa": true
        }
    });

    $('#steps-textarea').wysihtml5({
        toolbar: {
            "font-styles": false,
            "link": false,
            "image": false,
            "color": false,
            "blockquote": false,
            "fa": true
        }
    });

    $(".add-more").click(function(){
        console.log("Add more");
        cpt++;
        $scope.inputStepTitle = "inputStepTitle-"+cpt;
        $scope.inputStepDuration = "inputStepDuration-"+cpt;
        $scope.stepsTextarea = "stepsTextarea-"+cpt;
        $scope.stepsTextareaAncre = "steps-textarea-ancre-"+cpt;
        $scope.$apply();

        var html = $(".copy").html();
        $(".after-add-more").after(html);

        $('#stepsTextarea-'+cpt).wysihtml5({
            toolbar: {
                "font-styles": false,
                "link": false,
                "image": false,
                "color": false,
                "blockquote": false,
                "fa": true
            }
        });

        $(".after-add-more").addClass("last-after-add-more-"+cpt);
        $(".after-add-more").removeClass("after-add-more");
        $(".control-group:first").addClass("after-add-more");
        $(".control-group:first").removeClass("control-group");

        if(cpt >= 3) {
            for(var i=0; i < document.getElementsByClassName("remove").length - 2; i++) {
                document.getElementsByClassName("remove")[i].style.display = "none";
            }
        }
    });

    $("body").on("click",".remove",function(){

        $(this).parents(".after-add-more").remove();
        $(".last-after-add-more-"+cpt).addClass("after-add-more");
        $(".last-after-add-more-"+cpt+" .remove").css("display", "table-cell");
        $(".last-after-add-more-"+cpt).removeClass("last-after-add-more-"+cpt);

        cpt--;
    });


    function getFields() {

        /*
        input = document.getElementById('inputPhoto');
        if(input.files[0]) {
            file = input.files[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                console.log(reader.result); //this is an ArrayBuffer
            };
            reader.readAsDataURL(file);

        }
        */

        var json = {};
        var jsonContent = {};
        var educArray = [];
        json.title = document.getElementById('inputTitle').value;
        json.author = document.getElementById('inputAuthor').value;
        if(document.getElementById('inputPhoto').value != "") {
            json.photo = document.getElementById('inputPhoto').value;
        }
        json.duration = document.getElementById('inputDuration').value;
        json.synopsis = document.getElementById('inputSysnopsis').value;
        jsonContent.source = document.getElementById('inputSource').value;
        jsonContent.folklore = $('#folklore-textarea').val();
        jsonContent.equipment = $('#equipment-textarea').val();
        $(".labelCheckbox:checked").each(function(){
            educArray.push($(this).val());
        });

        jsonContent.educational_aims = educArray;

        var jsonArr = [];
        jsonArr.push({
            title: document.getElementById('inputStepTitle').value,
            description: $('#steps-textarea').val(),
            duration: document.getElementById('inputStepDuration').value
        });

        for (var y = 2; y <= cpt; y++) {
            jsonArr.push({
                title: document.getElementById('inputStepTitle-'+y).value,
                description: $('#stepsTextarea-'+y).val(),
                duration: document.getElementById('inputStepDuration-'+y).value
            });
        }

        jsonContent.steps = jsonArr;
        json.content = jsonContent;

        //Post
        //TODO vérifier les champs textes spéciaux
        //TODO requiere titre ajout step
        //TODO : required="required" au moins 1 sur les labels ?
        postJSON(json);

        window.top.window.scrollTo(0,0)
    }

    function importer() {

        var fichier = document.getElementById('InputJSON').files[0];
        var lecture = new FileReader();
        lecture.onloadend = function (evenement) {
            var donnees = evenement.target.result;
            var type = fichier.name.split(".");

            //Check if the file is a JSON
            if(type[1] == "json") {

                var data = JSON.parse(donnees);

                //Check if the JSON file got what we expect in
                if( data.title && data.duration && data.synopsis && data.content.folklore && data.content.educational_aims && data.content.steps) {

                    //Post
                    postJSON(donnees);
                } else {
                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'Format de l\'atelier incomptatible.',
                    });
                }
            }
            else {
                    $scope.$emit('notify', {
                        type: 'error',
                        title: 'L\'atelier doit être en format JSON.',
                    });
            }

        }
        lecture.readAsText(fichier, 'UTF-8')
    }


    function postJSON(donnees) {
        //Post
        var res = $http.post('/api/v1/catalogue', donnees);
        res.success(function(data, status, headers, config) {
            $scope.message = data;

            $scope.$emit('notify', {
                type: 'success',
                title: 'L\'atelier a bien été importé.',
                content: '/#/catalogue/'+data.data._id +'$$Lien vers votre atelier'
            });
        });
        res.error(function(data, status, headers, config) {
            $scope.$emit('notify', {
                type: 'error',
                title: 'L\'atelier n\'a pas pu être importé.',
            });
        });
    }
});