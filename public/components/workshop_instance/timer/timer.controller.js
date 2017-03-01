/**
 * Created by user on 22/11/16.
 */
'use strict';

var app = angular.module('facilitation');

app.controller('timerCtrl', function($scope, $interval, socket){

    var ispaused;
    var timer;

    $scope.countDown = 0;
    $scope.instructions = "";

    /**
     * Zoom on the timer
     * @type {focusTimer}
     */
    $scope.focusTimer = focusTimer;

    /**
     *  Join the specified room (workshop)
     * @param room
     */
    $scope.joinRoom = function(room){
        socket.emit('join_room', room);
    };

    /**
     * Leave the specified room (workshop)
     * @param room
     */
    $scope.leaveRoom = function(room){
        socket.emit('leave_room', room);
    };

    /**
     *  When a new user arrived
     */
    socket.on('new_user', function(msg){
        console.error(msg);
    });

    /**
     * When a user leave
     */
    socket.on('lost_user', function(msg){
        console.error(msg);
    });

    /**
     * Dispatch the order to LAUNCH the timer
     */
    socket.on('start_timer', function(timerInfo){
        $scope.startTimer(timerInfo.duration);
        $scope.instructions = timerInfo.instructions;
    });

    /**
     * Dispatch the order to RESTART the timer
     */
    socket.on('restart_timer', function (duration) {
        $scope.restartTimer(duration);
    });

    /**
     * Dispatch the order to RESUME the timer
     */
    socket.on('resume_timer', function(){
        $scope.resumeTimer();
    });

    /**
     * Dispatch the order to PAUSE the timer
     */
    socket.on('pause_timer', function(){
        $scope.pauseTimer();
    });

    /**
     * Dispatch the order to STOP the timer
     */
    socket.on('stop_timer', function(){
        $scope.resetTimer();
    });

    /**
     * Dispatch the order to START the sound
     */
    socket.on('start_sound', function () {
        startSound();
    });

    /**
     * Dispatch the order to STOP the sound
     */
    socket.on('stop_sound', function () {
        stopSound();
    });

    //var timer, ispaused = false;
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
    }

    function stopTimer() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
    }

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

    var audio;
    function startSound() {
        audio = new Audio('../../../sound/ALARM-DANGER-WARNING_Sound_Effect.mp3');
        audio.play();
    }

    function stopSound() {
        audio.pause();
    }

    var boolean = true;
    function focusTimer() {
        if(boolean) {
            $('#buttons').hide();
            $('#commentaires').hide();
            $('#photos').hide();
            $('.progress-wrapper').css("zoom", "200%");
            $('.progress-wrapper').css("-moz-transform", "scale(1.7)");
            $('.progress-wrapper').css("-moz-transform-origin", "50% 0%");

            $('#timer-in').removeClass('col-md-4');
            $('#timer-in').addClass('col-md-5');
            $('#instructions-in').removeClass('col-md-8');
            $('#instructions-in').addClass('col-md-7');

            $('#timer #resize').removeClass('glyphicon-resize-full');
            $('#timer #resize').addClass('glyphicon-resize-small');

            $('#timer #close').css("display", "block");

            $('#timer > h4').css("display", "none");

            $('#instructions-in .instructions').css("font-size", "18px");

            $('')

            boolean = false;
        } else {

            $('#timer-in').addClass('col-md-12');
            $('#timer-in').removeClass('col-md-5');
            $('#timer-in').addClass('col-md-4');
            $('#instructions-in').removeClass('col-md-7');
            $('#instructions-in').addClass('col-md-8');

            $('.progress-wrapper').css("zoom", "100%");
            $('.progress-wrapper').css("-moz-transform", "scale(1)");
            $('#buttons').show()
            $('#commentaires').show();
            $('#photos').show();

            $('#timer #resize').removeClass('glyphicon-resize-small');
            $('#timer #resize').addClass('glyphicon-resize-full');

            $('#timer #close').css("display", "none");

            $('#timer > h4').css("display", "block");

            $('#instructions-in .instructions').css("font-size", "14px");
            $('#instructions-in').css("display", "block");

            boolean = true;
        }
    }
});