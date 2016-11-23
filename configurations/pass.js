/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

// Serialize sessions
passport.serializeUser(function(user, done) {
    console.log("==================== SERIALIZEUSER ====================");
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("==================== DESERIALIZEUSER ====================");
    User.findOne({ _id: id }, function (err, user) {
        done(err, user);
    });
});

// Use local strategy
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    'errors': {
                        'email': { type: 'Email is not registered.' }
                    }
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    'errors': {
                        'password': { type: 'Password is incorrect.' }
                    }
                });
            }
            return done(null, user);
        });
    }
));