/**
 * Created by user on 22/11/16.
 */
'use strict';

var app = angular.module('facilitation.timer', ['socketio.service', 'timer.service']);

app.controller('timerCtrl', function($scope, $interval, socket, TimerService){

    $scope.joinRoom = function(){
        socket.emit('join_room', 'roomTest');
    };

    $scope.leaveRoom = function(){
        socket.emit('leave_room', 'roomTest');
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

    socket.on('resume_timer', function(){
        $scope.resumeTimer();
    });

    socket.on('pause_timer', function(){
        $scope.pauseTimer();
    });

    socket.on('stop_timer', function(){
        $scope.resetTimer();
    });

    var ispaused = false;
    $scope.startTimer = function (timeAmount) {
        ispaused = false;
        TimerService.startTimer(timeAmount);
    };

    $scope.pauseTimer = function () {
        ispaused = true;
        TimerService.stopTimer();
    };

    $scope.resumeTimer = function(){
        if(!ispaused) return;
        ispaused = false;
        TimerService.runTimer();
    };

    $scope.resetTimer = function(){
        ispaused = false
        TimerService.resetTimer();
    };

    $scope.humanizeDurationTimer = function(input, units) {
        return TimerService.humanizeDurationTimer(input, units);
    };

});