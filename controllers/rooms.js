/**
 * Controller of socket io rooms (Real-time connection with the tab)
 * @author Pierre Massanès <pierre.massanes@gmail.com>
 * @module controller/rooms
 */
module.exports = function (io) {
    'use strict';

    io.on('connection', function (socket) {

        // Join the specified room (workshop)
        socket.on('join_room', function(room){
            socket.join(room);
            io.to(socket.id).emit('join_success','Successfully synchronized');
        });

        // Leave the specified room (workshop)
        socket.on('leave_room', function(room){
            socket.leave(room);
            io.to(room).emit('lost_user','A user has been lost !');
        });

        // Dispatch in the specified room the order to LAUNCH the timer
        socket.on('launch_timer', function(timerInfo){
            io.to(timerInfo.workshop).emit('start_timer', timerInfo);
        });

        // Dispatch in the specified room the order to RESTART the timer
        socket.on('restart_timer', function(timerInfo){
            io.to(timerInfo.workshop).emit('restart_timer', timerInfo.duration);
        });

        // Dispatch in the specified room the order to PAUSE the timer
        socket.on('pause_timer', function(room){
            io.to(room).emit('pause_timer');
        });

        // Dispatch in the specified room the order to RESUME the timer
        socket.on('resume_timer', function(room){
            io.to(room).emit('resume_timer');
        });

        // Dispatch in the specified room the order to STOP the timer
        socket.on('stop_timer', function(room){
            io.to(room).emit('stop_timer');
        });

        // Dispatch in the specified room the information that the instance is finished
        socket.on('end_of_instance', function(room){
            io.to(room).emit('end_of_instance');
        });

        // Case when the socket is disconnected
        socket.on('disconnect', function () {
        });

        //Start sound
        socket.on('start_sound', function (room) {
            io.to(room).emit('start_sound');
        });

        //Stop sound
        socket.on('stop_sound', function (room) {
            io.to(room).emit('stop_sound');
        });
    });
};
