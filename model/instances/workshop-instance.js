/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  24/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var WorkshopInstanceSchema = new Schema({
    status: String,
    title: { type: String, required: true },
    nbParticipants: { type: Number },
    facilitators: [{
        name: String,
        _id: { type: Schema.ObjectId, ref: 'User', required: true }
    }],
    feedbacks:{
        participants: [{
            voteDimension1: Number,
            voteDimension2: Number,
            comment: {type: String, default: ""}
        }],
        facilitators: [{
            voteDimension1: Number,
            voteDimension2: Number,
            comment: {type: String, default: ""}
        }]
    },
    photos: [String],
    steps: [{
        title: String,
        description: String,
        timing: {
            theorical: Number,
            practical: Number
        }
    }],
    workshopId: { type: Schema.ObjectId, ref: 'Workshop', required: true }
});

/**
 * Methods
 */

WorkshopInstanceSchema.methods = {


    getMeanUserGrade: function(password) {
        var total = 0;
        var nbVotes = this.feedbacks.participants.length;
        for ( var i = 0; i < nbVotes; ++i) {
            total+= this.feedbacks.participants[i].vote;
        }
        return (total / nbVotes);
    },

    getMeanFacilitatorGrade: function(password) {
        var total = 0;
        var nbVotes = this.feedbacks.facilitators.length;
        for ( var i = 0; i < nbVotes; ++i) {
            total+= this.feedbacks.facilitators[i].vote;
        }
        return (total / nbVotes);
    }

};

mongoose.model('WorkshopInstance', WorkshopInstanceSchema);