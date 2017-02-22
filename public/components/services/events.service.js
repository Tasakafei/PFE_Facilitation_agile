/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var app = angular.module('facilitation');
app.service('EventsService', function ($http) {

    delete $http.defaults.headers.common['X-Requested-With'];
    this.getInstancesWorkshop = function(callbackFunc) {
        var req = {
            method: 'GET',
            url: '/users/instances',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return $http(req);
    };

    this.getEvents = function() {
        var req = {
            method: 'GET',
            url: '/users/events',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return $http(req);
    };

    this.getWorkshopInstance = function(instanceId) {
        var req = {
            method: 'GET',
            url: '/users/instances/'+instanceId,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return $http(req);

    };


    delete $http.defaults.headers.common['X-Requested-With'];
    this.addWorkshopInstance = function(username, workshop) {
        var req = {
            method: 'POST',
            url: '/users/instances',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { workshopId: workshop }
        };
        return $http(req);
    };

    this.updateWorkshopInstance = function(id, instance) {
        var req = {
            method: 'PUT',
            url: '/users/instances/'+id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: instance
        };
        return $http(req);

    };
    this.addEvent = function(event) {
        var req = {
            method: 'POST',
            url: '/users/events',
            headers: {
                'Content-Type': 'application/json'
            },
            data: event
        };
        return $http(req);
    };


    this.addFeedbackToInstance = function(feedback, instanceId) {
        var req = {
            method: 'POST',
            url: '/api/v1/feedback/'+instanceId,
            headers: {
                'Content-Type': 'application/json'
            },
            data: { feedback: feedback }
        };
        return $http(req);
    }
});

