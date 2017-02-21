/**
 * Sessions controller (authentication)
 * @author Alexandre Cazala <alexandre.cazala@gmail.com>
 * @module controller/session
 */
'use strict';

var mongoose = require('mongoose'),
    passport = require('passport');

/**
 * Session
 * returns info on authenticated user
 */
exports.session = function (req, res) {
    res.set('Access-Control-Allow-Origin','*');
    res.json(req.user.user_info);
};

/**
 * Logout
 * returns nothing
 */
exports.logout = function (req, res) {
    if(req.user) {
        req.logout();
        res.set('Access-Control-Allow-Origin','*');
        res.send(200);
    } else {
        res.set('Access-Control-Allow-Origin','*');
        res.status(400).send("Not logged in");
    }
};

/**
 *  Login
 *  requires: {email, password}
 */
exports.login = function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) {
            console.error(error);
            res.set('Access-Control-Allow-Origin','*');
            return res.json(400, error);
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.send(err);
            }
            res.set('Access-Control-Allow-Origin','*');
            res.json(req.user.user_info);
        });
    })(req, res, next);
}