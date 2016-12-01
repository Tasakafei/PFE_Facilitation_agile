/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var Workshop = mongoose.model('Workshop');
var ObjectID = require('mongodb').ObjectID;
var WorkshopInstance = mongoose.model("WorkshopInstance");
var Promise = require('promise');

module.exports = {
    saveWorkshop: saveWorkshopFct,
    getWorkshops: getWorkshopsFct,
    getWorkshop: getWorkshopFct,
    getMeanUserNote: getMeanUserNoteFct
};

function saveWorkshopFct (workshop) {
    var test = workshop;
    return new Promise(function (resolve, reject) {
        var newWorkshop = new Workshop(test);
        newWorkshop.save(function(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }else {
                resolve(data);
            }
        })
    })
}

function getWorkshopsFct () {
    return new Promise(function (resolve, reject) {
        var toReturn = [];
        Workshop.find({}, function(req, res) {
            var checksum = 0;
            var tmp_data = res;
            for (var i = 0; i < res.length; ++i) {
                    getMeanWorkshop(res[i], i, function (result) {
                        toReturn.push({
                            workshop: tmp_data[result.rank],
                            votes: result
                        });
                        if (++checksum == res.length) {
                            resolve(toReturn);
                        }
                    });

            }
        });
    })
}

function getMeanWorkshop(data, i, callback) {
    getMeanInstance(data.instances, i).then(function (result) {
        var votes = {
            rank: i,
            dim1: result.dim1,
            dim2: result.dim2,
            participants: result.participants,
            facilitators: result.facilitators
        };
        callback(votes);
    })
}

function getMeanInstance(instancesToCheck, i) {
    return new Promise(function (resolve, reject) {

        WorkshopInstance.find({
            '_id': {$in: instancesToCheck}
        }, 'feedbacks', function (err, docs) {
            if (err) {
                reject(err);
                console.log(err);
            } else {
                var votes = {
                    participants: 0,
                    facilitators: 0,
                    dim1: 0,
                    dim2: 0
                };
                var tot_p = 0;
                var tot_f = 0;
                for (var instanceI = 0; instanceI < docs.length; ++instanceI) {
                    (function () {


                        for (var k = 0; k < docs[instanceI].feedbacks.participants.length; ++k) {
                            (function () {
                                votes.dim1 += docs[instanceI].feedbacks.participants[k].voteDimension1;
                                votes.dim2 += docs[instanceI].feedbacks.participants[k].voteDimension2;
                                votes.participants += (docs[instanceI].feedbacks.participants[k].voteDimension1 + docs[instanceI].feedbacks.participants[k].voteDimension2) / 2;

                                tot_p++;
                            })();
                        }

                        for (var l = 0; l < docs[instanceI].feedbacks.facilitators.length; ++l) {
                            (function () {
                                votes.dim1 += docs[instanceI].feedbacks.facilitators[l].voteDimension1;
                                votes.dim2 += docs[instanceI].feedbacks.facilitators[l].voteDimension2;
                                votes.facilitators += (docs[instanceI].feedbacks.facilitators[l].voteDimension1 + docs[instanceI].feedbacks.facilitators[l].voteDimension2) / 2;
                                tot_f++;
                            })();
                        }
                    })();
                }

                if (tot_f > 0) {
                    votes.facilitators /= tot_f;
                }
                if (tot_p > 0) {
                    votes.participants /= tot_p;
                }
                if (tot_f+tot_p > 0) {
                    votes.dim1 /= (tot_f+tot_p);
                    votes.dim2 /= (tot_f+tot_p);
                }
                resolve(votes);
            }
        });
    });
}
function getWorkshopFct (id) {
    return new Promise(function (resolve, reject) {
        var object = new ObjectID(id);
        Workshop.find({_id: object}, function(req, res) {
            resolve(res);
        });
    })
}

function getMeanUserNoteFct (id) {
    return new Promise(function (resolve, reject) {
        var object = new ObjectID(id);
        Workshop.find({_id:object}, function (req, res) {
            res.getMeanUserGrade();
            resolve(res);
        });
    })
}