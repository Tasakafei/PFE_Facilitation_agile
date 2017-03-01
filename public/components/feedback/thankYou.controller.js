/**
 * Created by lucas on 11/01/17.
 */

var app = angular.module('facilitation');

app.controller('thankYouCtrl', function (tmpDataFactory, $scope) {

    var instanceId = tmpDataFactory.get();

    /**
     * Put the feedback access link in the $scope
     * @type {getUrl}
     */
    $scope.getUrl = getUrl;

    getUrl();
    function getUrl() {
        var url = window.location.href.split("/thankYou");
        var finalUrl;
        if (instanceId) {
            finalUrl = url[0] + "instances/" + instanceId;
        } else {
            finalUrl = null;
        }
        $scope.finalUrl = finalUrl;
    }

});