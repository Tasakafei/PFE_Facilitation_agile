/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var WorkshopInstance = mongoose.model("WorkshopInstance");
var Schema = mongoose.Schema;
var Promise = require('promise');
// Workshop
var WorkshopSchema = new mongoose.Schema({
    title: String,
    author: {type: String, default: "Anonyme"},
    photo : {type: String, default: "https://pfe-facilitation.herokuapp.com/img/default.jpg"},
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
    }]
});


/**
 * Methods
 */

WorkshopSchema.methods = {

    getMeanUserGrade: function(password) {
        return new Promise(function (resolve, reject) {
            var total = 0;

            WorkshopInstance.find({
                '_id': {$in: this.instances}
            }, 'feedbacks.participants', function (err, docs) {
                if (err) {
                    reject(err);
                } else {
                    console.log(docs);
                    resolve(docs)
                }
            });
            /*var nbVotes = this.feedbacks.participants.length;
             for ( var i = 0; i < nbVotes; ++i) {
             total+= this.feedbacks.participants[i].vote;
             }
             return (total / nbVotes);*/
        });
    }
};

exports.Workshop = mongoose.model('Workshop', WorkshopSchema);