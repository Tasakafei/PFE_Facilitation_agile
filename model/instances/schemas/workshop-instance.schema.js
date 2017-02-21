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
var User = mongoose.model("User");

var ObjectID = require('mongodb').ObjectID;

var WorkshopInstanceSchema = new Schema({
    status: String,
    title: { type: String, required: true },
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
    photos: [{
        filename: String
    }],
    steps: [{
        title: String,
        description: String,
        timing: {
            theorical: Number,
            practical: Number
        },
        duration: {
            theorical: Number,
            practical: Number
        }
    }],
    photo : {type: String},
    workshop_type: {type: String},
    goals: [String],
    participants_max: {type: Number, default: -1},
    participants_min: {type: Number, default: 3},
    public_targeted: {type: String},
    duration: Number,
    synopsis: {type: String, default: null},
    preparation_time: {type: Number, default: 30},
    source:{type: String, default:null},
    folklore: {type: String, default:null},
    educational_aims: [String],
    equipment: {type: String},
    logistics: [String],
    author: {type: String, default:null},
    participants_profil: [String],
    workshopId: { type: Schema.ObjectId, ref: 'Workshop', required: true },
    user_dateC:{type: String,default:'mm/dd/yyyy'},
    user_groupC:{type:String,default:null}


},
{
    toJSON: {
        virtuals:true
    },
    toObject: {
        virtuals: true
    }
});


WorkshopInstanceSchema.pre('remove', function(next) {
    var id = new ObjectID(this._id);
    User.update({"workshops_instances._id": id}, {$pull: { "workshops_instances": {"_id": id }}}).exec(function() {
        next();
    });
});
WorkshopInstanceSchema
    .virtual('grade.participants')
    .get(function() {
        var total = 0;
        var nbVotes = this.feedbacks.participants.length;
        for ( var i = 0; i < nbVotes; ++i) {
            total = total + (this.feedbacks.participants[i].voteDimension1 + this.feedbacks.participants[i].voteDimension1)/2 ;
        }
        if (nbVotes === 0) {
            nbVotes = 1;
        }
        return (total / nbVotes);
    });

WorkshopInstanceSchema
    .virtual('grade.facilitators')
    .get(function() {
        var total = 0;
        var nbVotes = this.feedbacks.facilitators.length;
        for ( var i = 0; i < nbVotes; ++i) {
            total = total + (this.feedbacks.facilitators[i].voteDimension1 + this.feedbacks.facilitators[i].voteDimension1)/2 ;

        }
        if (nbVotes === 0) {
            nbVotes = 1;
        }
        return (total / nbVotes);
    });

mongoose.model('WorkshopInstance', WorkshopInstanceSchema);