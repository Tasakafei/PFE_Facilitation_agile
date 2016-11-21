/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');

// Workshop
var WorkshopSchema = new mongoose.Schema({
    title: String,
    author: String,
    workshop_type: {type: String, default: "Production"},
    goals: [String],
    participants_max: {type: Number, default: -1},
    participants_min: {type: Number, default: 3},
    public_targeted: {type: String, default: "Tous"},
    time_min: {type: Number, default: 60},
    time_max: {type: Number, default: 180},
    synopsis: {type: String, default: null},
    preparation_time: {type: Number, default: 30},
    content: {
        steps: [{
            title: String,
            description: {type: String, default: null},
            timing: Number,
            duration: Number
        }],
        source: {type: String, default: null},
        folklore: {type: String, default:null},
        educational_aims: [String],
        equipment: [String],
        logistics: [String],
        participants_profil: [String]
    }
});

exports.Workshop = mongoose.model('Workshop', WorkshopSchema);