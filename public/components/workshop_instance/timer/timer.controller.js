/**
 * Created by user on 22/11/16.
 */
'use strict';

var app = angular.module('facilitation');

app.controller('timerCtrl', function($scope, $interval, socket){

    $scope.joinRoom = function(room){
        socket.emit('join_room', room);
    };

    $scope.leaveRoom = function(room){
        socket.emit('leave_room', room);
    };

    socket.on('new_user', function(msg){
        console.log(msg);
    });

    socket.on('lost_user', function(msg){
        console.log(msg);
    });

    socket.on('start_timer', function(duration){
        $scope.startTimer(duration);
    });

    socket.on('restart_timer', function (duration) {
        $scope.restartTimer(duration);
    });

    socket.on('resume_timer', function(){
        $scope.resumeTimer();
    });

    socket.on('pause_timer', function(){
        $scope.pauseTimer();
    });

    socket.on('stop_timer', function(){
        $scope.resetTimer();
    });

    var timer, ispaused = false;
    $scope.startTimer = function (timeAmount) {
        ispaused = false;
        if(angular.isDefined(timer)) return;
        $scope.countDown = timeAmount;
        $scope.lastTimeAmount = timeAmount;
        runTimer();
    };

    $scope.pauseTimer = function () {
        ispaused = true;
        stopTimer();
    };

    $scope.resumeTimer = function(){
        if(!ispaused) return;
        ispaused = false;
        runTimer();
    };

    $scope.resetTimer = function(){
        ispaused = false;
        stopTimer();
        $scope.countDown = $scope.lastTimeAmount;
    };

    $scope.restartTimer = function (timeAmount) {
        stopTimer();
        if(timeAmount < 0) timeAmount = 0;
        $scope.startTimer(timeAmount);
    };

    function runTimer(){
        timer = $interval(function(){
            $scope.countDown--;
            if($scope.countDown <= 0){
                $scope.countDown = 0;
                stopTimer();
            }
        }, 1000);
    };

    function stopTimer() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    };

    $scope.humanizeDurationTimer = function(input, units) {
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