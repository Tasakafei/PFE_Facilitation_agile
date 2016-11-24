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
                    favorite: ObjectId(workshop)
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
    console.log("===============================================");
    console.log("===============================================");
    var user = req.user;
    console.log("===============================================");
    console.log("===============================================");
    console.log(user);
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