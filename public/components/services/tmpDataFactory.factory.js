/**
 * Created by lucas on 11/01/17.
 */

var app = angular.module('facilitation');
app.factory('tmpDataFactory', function() {
    var savedData = null;
    function set(data) {
        savedData = data;
    }
    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

});
