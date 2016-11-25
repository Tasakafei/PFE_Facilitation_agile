/**
 * Created by user on 23/11/16.
 */

var app = angular.module('timer.service', []);
app.service('TimerService', function ($rootScope, $interval) {
    var timer;

    this.startTimer = function (timeAmount){
        if(angular.isDefined(timer)) return;
        $rootScope.countDown = timeAmount;
        $rootScope.lastTimeAmount = timeAmount;
        this.runTimer();
    };

    this.runTimer = function () {
        timer = $interval(function(){
            $rootScope.countDown--;
            if($rootScope.countDown == 0) stopTimer();
            $rootScope.$apply();
        }, 1000);
    };

    this.stopTimer = function () {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
            $rootScope.$apply();
        }
    };

    this.resetTimer = function () {
        this.stopTimer();
        $rootScope.countDown = $rootScope.lastTimeAmount;
        $rootScope.$apply();
    };

    this.humanizeDurationTimer = function (input, units) {
        // units is a string with possible values of y, M, w, d, h, m, s, ms
        if (input == 0) {
            return 0;
        } else {
            var duration = moment().startOf('day').add(input, units);
            var format = "";
            if (duration.hour() > 0) {
                format += "H[h] ";
            }
            if (duration.minute() > 0) {
                format += "m[m] ";
            }
            if (duration.second() > 0) {
                format += "s[s] ";
            }
            return duration.format(format);
        }
    };
});
