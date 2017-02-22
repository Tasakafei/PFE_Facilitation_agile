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

    this.addEvent = function(event) {
        var test = {
            title: "Sauvage",
            photo : "https://pfe-facilitation.herokuapp.com/img/sauvage.jpg",
            description: "Coucou sauvage",
            duration: "30",
            begin_at: Date.now()
        };
        var req = {
            method: 'POST',
            url: '/users/instances',
            headers: {
                'Content-Type': 'application/json'
            },
            data: test
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

