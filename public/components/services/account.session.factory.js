/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

angular.module('facilitation')
    .factory('Session', function ($resource) {
        // TODO : Change for a more specific access control
        return $resource('/auth/session/', {}, {headers: { 'Access-Control-Allow-Origin': '*' }});
    });

