/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var ObjectId = mongoose.Types.ObjectId;

function createEvent(event, callback) {
    var tmp = new Event(event);
    tmp.steps = [];
    tmp.steps.push({
        title: tmp.title,
        description: tmp.description,
        duration: {
            theorical: tmp.duration
        }
    });
    tmp.save(function(err, data) {
        if (err) {
            callback(err)
        } else {
            callback(null,data)
        }
    })
}

function updateEventImpl(id, data, callback) {
    Event.update(
        {_id : ObjectId(id)},
        data,
        {safe: true, multi: false},
        function (err, instanceUpdated) {
            if (err) {
                callback(err);
            } else {
                callback(null,instanceUpdated);
            }
        });
}

module.exports = {
    createEvent: createEvent,
    updateEvent: updateEventImpl
};