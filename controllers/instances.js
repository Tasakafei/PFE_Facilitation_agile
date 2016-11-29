/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var ObjectId = mongoose.Types.ObjectId;

var WorkshopInstance = mongoose.model("WorkshopInstance");

exports.addFeedbackToInstance = function (req, res, next) {
    var workshopInstanceId = req.params.instanceId;
    var feedback = req.body.feedback;
    WorkshopInstance.findOne(ObjectId(workshopInstanceId) , function(err, model) {
        if (err) {
            res.json({status: "error", data: err});
        } else {
            if (req.user) {
                for(var i = 0; i < model.facilitators.length; ++i) {
                    if (model.facilitators[i].name == req.user.username) {
                        model.feedbacks.facilitators.push(feedback);
                        model.save();
                        res.json({status: "success", data: "success"});
                        return;
                    }
                }
            }

            model.feedbacks.participants.push(feedback);
            model.save();
            res.json({status: "success", data: "success"});
        }
    });
};