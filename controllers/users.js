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
var Workshop = mongoose.model("Workshop");

/**
 * Create user
 * requires: {username, password, email}
 * returns: {email, password}
 */
exports.create = createImpl;

/**
 *  Show profile
 *  returns {username, profile}
 */
exports.show = showImpl;

/**
 *  Username exists
 *  returns {exists}
 */
exports.exists = existsImpl;

/**
 * Add a workshops to favorites of the logged User;
 *
 */
exports.addToFavoriteWorkshops = addToFavoriteWorkshopsImpl;

/**
 * Retrieve favorites workshops from logged user
 * @type {getFavoriteWorkshopsImpl}
 * returns favorite_workshops
 */
exports.getFavoriteWorkshops =  getFavoriteWorkshopsImpl;

/**
 * Retrieve workshop instances of the user
 * @type {getWorkshopInstancesImpl}
 */
exports.getWorkshopInstances = getWorkshopInstancesImpl;

/**
 * Instanciate a new workshopInstance
 * @type {addWorkshopInstanceImpl}
 */
exports.addWorkshopInstance = addWorkshopInstanceImpl;

exports.getWorkshopInstance = getWorkshopInstanceImpl;


exports.unauthgetWorkshopInstances = unauthgetWorkshopInstancesImpl;

exports.unauthaddToFavoriteWorkshops = unauthaddToFavoriteWorkshopsImpl;

exports.unauthgetFavoriteWorkshops = unauthgetFavoriteWorkshopsImpl;

exports.unauthaddWorkshopInstance = unauthaddWorkshopInstanceImpl;

exports.unauthgetWorkshopInstance = unauthgetWorkshopInstanceImpl;
/*********************************************************
 * IMPLEMENTATION                                        *
 *********************************************************/

function createImpl(req, res, next) {
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
}


function showImpl(req, res, next) {
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
}

function existsImpl (req, res, next) {
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
}

function addToFavoriteWorkshopsImpl (req, res, next) {
    var user = req.user;
    //var username = req.body.username;
    var workshop = req.body.workshop;
    Workshop.findOne(ObjectId(workshop),  function(err, model) {
        if (err) {
            res.json({status: "error", data: err});
        } else {
            User.findOneAndUpdate(
                { username : user.username },
                {
                    $push:
                    {"workshops_favorites":
                    {
                        title: model.title,
                        photo : model.photo,
                        educational_aims: model.content.educational_aims,
                        time_min: model.time_min,
                        synopsis: model.synopsis,
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
        }
    })

}

function getFavoriteWorkshopsImpl(req, res, next) {
    var user = req.user;
    User.findOne({ username : user.username }, function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }

        if(user) {
            res.json(user.workshops_favorites);
        } else {
            res.json({status:"error", data: "USER_NOT_FOUND"});
        }
    });
}

function getWorkshopInstancesImpl(req, res, next) {
    var user = req.user;
    //var user = { username: req.body.username };
    User.findOne({ username : user.username }, function (err, userData) {
        if (err) {
            return next(new Error('Failed to load User ' + user.username));
        }

        if(user) {
            console.log(userData.workshops_instances);
            res.json({status: "success", data: userData.workshops_instances});
        } else {
            res.json({status: "error", data: "USER_NOT_FOUND"});
        }
    });
}

function addWorkshopInstanceImpl(req, res, next) {
    var user = req.user;
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
                                photo : workshop.photo,
                                educational_aims: workshop.content.educational_aims,
                                time_min: workshop.time_min,
                                synopsis: workshop.synopsis,
                                title: workshop.title,
                                _id: instance._id
                            };
                            workshop.instances.push(instance._id);
                            workshop.save();
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
}

function getWorkshopInstanceImpl(req, res, next) {
    var user = req.user;
    var instanceId = req.params.instanceId;
    //var user = { username: req.body.username };
    WorkshopInstance.findOne(ObjectId(instanceId) , function (err, instanceWorkshop) {
        if (err) {
            return next(new Error('Failed to load User ' + user.username));
        }

        if(user) {
            res.json({status: "success", data: instanceWorkshop});
        } else {
            res.json({status: "error", data: "INSTANCE_NOT_FOUND"});
        }
    });
}

function unauthgetWorkshopInstancesImpl(req, res, next) {
    req.user = { username: req.params.username};
    return this.getWorkshopInstancesImpl(req, res, next);
}

function unauthaddToFavoriteWorkshopsImpl(req, res, next) {
    req.user = { username: req.body.username};
    return this.addToFavoriteWorkshopsImpl(req, res, next);
}

function unauthgetFavoriteWorkshopsImpl(req, res, next) {
    req.user = { username: req.params.username};
    return getFavoriteWorkshopsImpl(req, res, next);
}

function unauthaddWorkshopInstanceImpl(req, res, next) {
    req.user = { username: req.body.username};
    return this.addWorkshopInstanceImpl(req, res, next);
}

function unauthgetWorkshopInstanceImpl(req, res, next) {
    req.user = { username: req.body.username};
    return this.getWorkshopInstanceImpl(req, res, next);
}