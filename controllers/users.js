/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    ObjectId = mongoose.Types.ObjectId;

var WorkshopInstance = mongoose.model("WorkshopInstance");

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';

    newUser.save(function(err) {
        if (err) {
            console.log(err);
            return res.status(400).json(err);
        }

        req.login(newUser, function(err) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.json(newUser.user_info);
        });
    });
};

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = function (req, res, next) {
    var userId = req.params.userId;

    User.findById(ObjectId(userId), function (err, user) {
        if (err) {
            return next(new Error('Failed to load User'));
        }
        if (user) {
            res.send({username: user.username, profile: user.profile });
        } else {
            res.send(404, 'USER_NOT_FOUND')
        }
    });
};

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = function (req, res, next) {
    var username = req.params.username;
    User.findOne({ username : username }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }

        if(user) {
            res.json({exists: true});
        } else {
            res.json({exists: false});
        }
    });
};

exports.addToFavoriteWorkshops = function (req, res, next) {
    var username = req.body.username;
    var workshop = req.body.workshop;

    User.findOneAndUpdate(
        { username : username },
        {
            $push:
            {"workshops_favorites":
                {
                    added_at: Date.now(),
                    _id: ObjectId(workshop)
                }
            }
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
};

exports.getFavoriteWorkshops = function(req, res, next) {
    User.findOne({ _id : user._id }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }

        if(user) {
            res.json(user.workshops_favorites);
        } else {
            res.json({exists: false});
        }
    });
};

exports.getWorkshopInstances = function (req, res, next) {

};

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
                            console.log(workshop);
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
                            console.log(instance);
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