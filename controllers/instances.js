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

exports.addWorkshopInstance = function (req, res, next) {
    var user = { username: req.body.username };
    var workshop = req.body.workshopId;
    if (!user) {
        res.status("404").json({status: "error", data: "NOT_FOUND"});
    } else {
        User.findOne(
            {username: user.username},
            function (err, user) {
                if (err) {
                    res.json({status: "error", data: err});
                } else {
                    mongoose.model("Workshop").findOne({_id: ObjectId(workshop)}, function(err, workshop) {
                        if (err) {
                            throw err;
                        }
                        if (workshop) {
                            var instance = new WorkshopInstance();
                            instance.title = "Instance de l'atelier "+ workshop.title;
                            instance.nbParticipants = 0;
                            var facilitator = {
                                name: user.username,
                                _id: user._id
                            };
                            instance.facilitators.push(facilitator);
                            instance.status = "CREATED";
                            for (var i = 0; i < workshop.content.steps.length; ++i) {
                                var wsStep = workshop.content.steps[i];
                                instance.steps[i] = {
                                    title: wsStep.title,
                                    description: wsStep.description,
                                    timing: {
                                        theorical: wsStep.timing,
                                        practical: 0
                                    }
                                };
                            }
                            instance.workshopId = workshop._id;
                            instance.save();
                            var toAdd = {
                                title: workshop.title,
                                _id: instance._id
                            };
                            User.findOneAndUpdate(
                                { username : user.username },
                                {
                                    $push:
                                    { "workshops_instances": toAdd }
                                },
                                { safe: true, new: true },
                                function(err, model) {
                                    if (err) {
                                        res.json({status: "error", data: err});
                                    } else {
                                        res.json({status: "success", data: "success"})
                                    }
                                }
                            );
                            //User.user.workshops_instances.push(toAdd);
                            //user.save();
                        }
                    });

                }
            }
        );
    }
};