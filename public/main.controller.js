/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

'use strict';

angular.module('facilitation')
    .controller('MainCtrl', function () {
        /**
         * This controller is empty because we add dynamically some properties to access them from everywhere
         */
    })
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);

            for (var i=0; i<total; i++) {
                input.push(i);
            }

            return input;
        }
    })

;