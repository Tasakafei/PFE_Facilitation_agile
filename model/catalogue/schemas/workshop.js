/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var WorkshopInstance = mongoose.model("WorkshopInstance");
var User = mongoose.model("User");

var ObjectID = require('mongodb').ObjectID;
var Schema = mongoose.Schema;
var Promise = require('promise');
// Workshop
var WorkshopSchema = new mongoose.Schema({
    title: String,
    author: {type: String, default: "Anon"},
    photo : {type: String, default: "https://pfe-facilitation.herokuapp.com/img/default.jpg"},
    workshop_type: {type: String, default: "Production"},
    goals: [String],
    participants_max: {type: Number, default: -1},
    participants_min: {type: Number, default: 3},
    public_targeted: {type: String, default: "Tous"},
    duration: Number,
    synopsis: {type: String, default: null},
    preparation_time: {type: Number, default: 30},
    content: {
        steps: [{
            title: String,
            description: {type: String, default: null},
            timing: Number,
            duration: Number
        }],
        source: {type: String, default: "Aucune source"},
        folklore: {type: String, default:null},
        educational_aims: [String],
        equipment: {type: String, default: "Aucun équipement requis"},
        logistics: [String],
        participants_profil: [String]
    },
    instances: [{
        type: Schema.ObjectId,
        ref: 'WorkshopInstance'
    }],
    grade: {
        facilitators: Number,
        participants: Number
    }
}, {
    toJSON: {
        virtuals:true
    },
    toObject: {
        virtuals: true
    }
});

WorkshopSchema
    .virtual('nb_time_played')
    .get(function() {
        return this.instances.length;
    });

WorkshopSchema.pre('remove', function(callback) {
    var id = new ObjectID(this._id);
    User.update({"workshops_favorites._id": id}, {$pull: { "workshops_favorites": {"_id": id }}}).exec();
    callback();
});
WorkshopSchema.method('computeGrades', function(cb) {
    WorkshopInstance.find({
        '_id': {$in: this.instances}
    }, function (err, docs) {
        if (err) {
            console.error(err);
            return 0;
        } else {
            var totUserGrade = 0;
            var totFacilitatorGrade = 0;
            var denominator = docs.length;
            if (denominator > 0) {
                for (var instanceI = 0; instanceI < denominator; ++instanceI) {
                    totFacilitatorGrade+= docs[instanceI].grade.facilitators;
                    totUserGrade += docs[instanceI].grade.participants;
                }
            }

            if (denominator == 0) {
                denominator = 1;
            }
            var grade = {
                facilitators: totFacilitatorGrade / denominator,
                participants: totUserGrade /denominator
            };
            cb(grade);
        }
    });
});
exports.Workshop = mongoose.model('Workshop', WorkshopSchema);