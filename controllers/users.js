'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    ObjectId = mongoose.Types.ObjectId;


var WorkshopInstance = mongoose.model("WorkshopInstance");
var Workshop = mongoose.model("Workshop");
var WorkshopInstances = require("../model/instances/workshop-instance");

/**
 * Controller users
 * @module controller/user
 */


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
            console.log(model);
            User.findOneAndUpdate(
                { username : user.username },
                {
                    $push:
                    {"workshops_favorites":
                    {
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
    User.findOne({ username : user.username }).populate('workshops_favorites').exec(function (err, user) {
        if (err) {
            return next(new Error('Failed to load User ' + username));
        }
        console.log(user);
        
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
    User.findOne({ username : user.username }).populate('workshops_instances').exec(function (err, userData) {
        if (err) {
            return next(new Error('Failed to load User ' + user.username));
        }
        if(user) {
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
                            instance.title = workshop.title;
                            instance.participants_max = workshop.participants_max;
                            instance.participants_min = workshop.participants_min;
                            var facilitator = {
                                name: user.username,
                                _id: user._id
                            };
                            instance.photo = workshop.photo;
                            instance.workshop_type = workshop.workshop_type;
                            instance.facilitators.push(facilitator);
                            instance.status = "CREATED";
                            for (var i = 0; i < workshop.content.steps.length; ++i) {
                                var wsStep = workshop.content.steps[i];
                                instance.steps[i] = {
                                    title: wsStep.title,
                                    description: wsStep.description,
                                    timing: {
                                        theorical: wsStep.timing,
                                        practical: -1
                                    },
                                    duration: {
                                        theorical: wsStep.duration,
                                        practical: -1
                                    }
                                };
                            }
                            instance.workshopId = workshop._id;
                            instance.goals = workshop.goals;
                            instance.educational_aims = workshop.content.educational_aims;
                            instance.logistics = workshop.content.logistics;
                            instance.folklore = workshop.content.folklore;
                            instance.duration = workshop.duration;
                            instance.synopsis = workshop.synopsis;
                            instance.equipment = workshop.content.equipment;
                            instance.participants_profil = workshop.content.participants_profil;
                            instance.preparation_time = workshop.preparation_time;
                            instance.public_targeted = workshop.public_targeted;
                            instance.save();
                            workshop.instances.push(instance._id);
                            workshop.save();
                            User.findOneAndUpdate(
                                { username : user.username },
                                {
                                    $push:
                                    { "workshops_instances":
                                        {
                                            _id: instance._id
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
                    });

                }
            }
        );
    }
}

function getWorkshopInstanceImpl(req, res, next) {
    //var user = req.user;
    var instanceId = req.params.instanceId;
    //var user = { username: req.body.username };
    WorkshopInstance.findOne(ObjectId(instanceId) , function (err, instanceWorkshop) {
        if (err) {
            return next(new Error('Failed to load User ' + user.username));
        }
        res.json({status: "success", data: instanceWorkshop});
    });
}

function deleteFavoriteWorkshopsImpl(req, res, next) {
    var user = req.user;
    var favoriteId = req.params.favoriteId;
    User.findOneAndUpdate(
        { username : user.username },
        {
            $pull: {
                "workshops_favorites": {
                    _id: favoriteId
                }
            }
        },
        { new: true , safe: true},
        function(err, model) {
            if (err) {
                res.json({status: "error", data: err});
            } else {
                res.json({status: "success", data: "success"})
            }
        }
    );
}

function deleteInstanceWorkshopImpl(req, res, next) {
    var user = req.user;
    var instanceId = req.params.instanceId;
    WorkshopInstances.removeInstance(instanceId).then(function(data) {
        console.log(data);
        res.json({status: "success", data:"success"});
    }, function(err) {
        console.log(err);
        res.json({status:"error", data: "success"});
    });
}

function unauthdeleteFavoriteWorkshopsImpl(req, res, next) {
    req.user = { username: req.params.username};
    res.set('Access-Control-Allow-Origin','*');
    return deleteFavoriteWorkshopsImpl(req, res, next);
}
function unauthgetWorkshopInstancesImpl(req, res, next) {
    req.user = { username: req.params.username};
    res.set('Access-Control-Allow-Origin','*');
    return getWorkshopInstancesImpl(req, res, next);
}

function unauthaddToFavoriteWorkshopsImpl(req, res, next) {
    req.user = { username: req.body.username};
    res.set('Access-Control-Allow-Origin','*');
    return addToFavoriteWorkshopsImpl(req, res, next);
}

function unauthgetFavoriteWorkshopsImpl(req, res, next) {
    req.user = { username: req.params.username};
    res.set('Access-Control-Allow-Origin','*');
    return getFavoriteWorkshopsImpl(req, res, next);
}

function unauthaddWorkshopInstanceImpl(req, res, next) {
    req.user = { username: req.body.username};
    res.set('Access-Control-Allow-Origin','*');
    return addWorkshopInstanceImpl(req, res, next);
}

function unauthgetWorkshopInstanceImpl(req, res, next) {
    req.user = { username: req.body.username};
    res.set('Access-Control-Allow-Origin','*');
    return getWorkshopInstanceImpl(req, res, next);
}

function unauthdeleteInstanceWorkshopImpl(req, res, next) {
    req.user = { username: req.params.username};
    res.set('Access-Control-Allow-Origin','*');
    return deleteInstanceWorkshopImpl(req, res, next);
}

module.exports = {
    /**
     * Create user
     * @param req
     * @param req.body {User} the complete User check moongoose schema for details
     * @param res
     * @param next {Function} callback
     * @return email
     * @return password
     * @method
     */
    create: createImpl,

    /**
     *  Show profile
     *  @param req
     *  @param req.params.userId {String} user Id of the profile asked
     *  @param res
     *  @param next {Function} callback
     *  @return username
     *  @return profile
     *  @method
     */
    show: showImpl,

    /**
     *  Check if the username exists.
     *  @param req
     *  @param req.params.username {String} Username to check if it exists
     *  @param res
     *  @param next {Function} callback
     *  @return exists
     *  @method
     */
    exists: existsImpl,

    /**
     * Add a workshops to favorites of the logged User
     * The user has to be logged in the system.
     * @param req
     * @param req.body.workshop {String} ID of the workshop to add in the user favorites
     * @param res
     * @param next {Function} callback
     * @method
     */
    addToFavoriteWorkshops: addToFavoriteWorkshopsImpl,

    /**
     *  Retrieve favorites workshops from logged user.
     *  The user has to be logged in the system.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<Workshop>}
     *  @method
     */
    getFavoriteWorkshops: getFavoriteWorkshopsImpl,

    /**
     * Retrieve workshop instances of the user
     * The user has to be logged in the system.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<WorkshopInstance>}
     *  @method
     */
    getWorkshopInstances: getWorkshopInstancesImpl,

    /**
     * Instanciate a new workshopInstance and add the reference in the user's instances
     * The user has to be logged in the system.
     * @param req
     * @param req.body.workshopId {String} id of the workshop
     * @param res
     * @param next {Function} callback
     * @method
     */
    addWorkshopInstance: addWorkshopInstanceImpl,

    /**
     *  Retrieve a specific workshop instance by id given in the URL.
     *  The user has to be logged in the system.
     *  @param req
     *  @param req.params.instanceId {String}
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<Workshop>}
     *  @method
     */
    getWorkshopInstance: getWorkshopInstanceImpl,

    /**
     *  Remove the reference of a registered workshop from the user favorites by id given in the URL.
     *  The user has to be logged in.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @method
     */
    deleteFavoriteWorkshops: deleteFavoriteWorkshopsImpl,

    /**
     *  Delete a specific workshop instance by id given in the URL.
     *  The user has to be logged in.
     *  @param req
     *  @param req.params.instanceId {String}
     *  @param res
     *  @param next
     *  @return favorite_workshops
     *  @method
     */
    deleteInstanceWorkshop: deleteInstanceWorkshopImpl,

    unauthgetWorkshopInstances: unauthgetWorkshopInstancesImpl,

    unauthaddToFavoriteWorkshops: unauthaddToFavoriteWorkshopsImpl,

    unauthgetFavoriteWorkshops: unauthgetFavoriteWorkshopsImpl,

    unauthaddWorkshopInstance: unauthaddWorkshopInstanceImpl,

    unauthgetWorkshopInstance: unauthgetWorkshopInstanceImpl,

    unauthdeleteFavoriteWorkshops: unauthdeleteFavoriteWorkshopsImpl,

    unauthdeleteInstanceWorkshop: unauthdeleteInstanceWorkshopImpl
};
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

module.exports = {
    /**
     * Create user
     * @param req
     * @param req.body {User} the complete User check moongoose schema for details
     * @param res
     * @param next {Function} callback
     * @return email
     * @return password
     * @method
     */
    create: createImpl,

    /**
     *  Show profile
     *  @param req
     *  @param req.params.userId {String} user Id of the profile asked
     *  @param res
     *  @param next {Function} callback
     *  @return username
     *  @return profile
     *  @method
     */
    show: showImpl,

    /**
     *  Check if the username exists.
     *  @param req
     *  @param req.params.username {String} Username to check if it exists
     *  @param res
     *  @param next {Function} callback
     *  @return exists
     *  @method
     */
    exists: existsImpl,

    /**
     * Add a workshops to favorites of the logged User
     * The user has to be logged in the system.
     * @param req
     * @param req.body.workshop {String} ID of the workshop to add in the user favorites
     * @param res
     * @param next {Function} callback
     * @method
     */
    addToFavoriteWorkshops: addToFavoriteWorkshopsImpl,

    /**
     *  Retrieve favorites workshops from logged user.
     *  The user has to be logged in the system.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<Workshop>}
     *  @method
     */
    getFavoriteWorkshops: getFavoriteWorkshopsImpl,

    /**
     * Retrieve workshop instances of the user
     * The user has to be logged in the system.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<WorkshopInstance>}
     *  @method
     */
    getWorkshopInstances: getWorkshopInstancesImpl,

    /**
     * Instanciate a new workshopInstance and add the reference in the user's instances
     * The user has to be logged in the system.
     * @param req
     * @param req.body.workshopId {String} id of the workshop
     * @param res
     * @param next {Function} callback
     * @method
     */
    addWorkshopInstance: addWorkshopInstanceImpl,

    /**
     *  Retrieve a specific workshop instance by id given in the URL.
     *  The user has to be logged in the system.
     *  @param req
     *  @param req.params.instanceId {String}
     *  @param res
     *  @param next {Function} callback
     *  @return {Array.<Workshop>}
     *  @method
     */
    getWorkshopInstance: getWorkshopInstanceImpl,

    /**
     *  Remove the reference of a registered workshop from the user favorites by id given in the URL.
     *  The user has to be logged in.
     *  @param req
     *  @param res
     *  @param next {Function} callback
     *  @method
     */
    deleteFavoriteWorkshops: deleteFavoriteWorkshopsImpl,

    /**
     *  Delete a specific workshop instance by id given in the URL.
     *  The user has to be logged in.
     *  @param req
     *  @param req.params.instanceId {String}
     *  @param res
     *  @param next
     *  @return favorite_workshops
     *  @method
     */
    deleteInstanceWorkshop: deleteInstanceWorkshopImpl,

    unauthgetWorkshopInstances: unauthgetWorkshopInstancesImpl,

    unauthaddToFavoriteWorkshops: unauthaddToFavoriteWorkshopsImpl,

    unauthgetFavoriteWorkshops: unauthgetFavoriteWorkshopsImpl,

    unauthaddWorkshopInstance: unauthaddWorkshopInstanceImpl,

    unauthgetWorkshopInstance: unauthgetWorkshopInstanceImpl,

    unauthdeleteFavoriteWorkshops: unauthdeleteFavoriteWorkshopsImpl,

    unauthdeleteInstanceWorkshop: unauthdeleteInstanceWorkshopImpl
};

