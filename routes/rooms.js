/**
 * Created by user on 23/11/16.
 */

module.exports = function (io) {
    'use strict';

    io.on('connection', function (socket) {

        socket.on('join_room', function(room){
            console.log('JOIN ROOM');
            socket.join(room);
            io.to(room).emit('new_user','New user logged in !');
        });

        socket.on('leave_room', function(room){
            console.log('LEAVE ROOM');
            socket.leave(room);
            io.to(room).emit('lost_user','A user has been lost !');
        });

        socket.on('launch_timer', function(room){
            console.log("LAUNCH TIMER");
            io.to(room).emit('start_timer');
        });

        socket.on('stop_timer', function(room){
            console.log("STOP TIMER");
            io.to(room).emit('stop_timer');
        });

    });
};
