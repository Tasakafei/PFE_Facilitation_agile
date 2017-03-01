/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  20/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/


app.service('LabelsService', function () {
    var labels = {
        "Travail itératif": "label-success",
        "Amélioration continue": "label-primary",
        "Prévisions": "label-info",
        "Rétrospective": "label-warning",
        "TaF - WiP": "label-purple",
        "Lead time vs Throughput": "label-yellow"
    };

    this.getText = function (label) {
        return labels[label] ? labels[label] : "label-default";
    }
});