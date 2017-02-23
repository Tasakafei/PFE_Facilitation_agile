/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
        title: { type: String, required: true },
        photo : String,
        description: String,
        duration: {type: Number, required: true},
        begin_at: {type: Date, require: true},
        steps: [{
                title: String,
                description: String,
                duration: {
                        theorical: Number,
                        practical: Number
                }
        }]
    });



mongoose.model('Event', EventSchema);