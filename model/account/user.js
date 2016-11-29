/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var WorkshopInstance = mongoose.model("WorkshopInstance");

var UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    hashedPassword: String,
    salt: String,
    name: String,
    admin: Boolean,
    guest: Boolean,
    provider: String,
    workshops_favorites: [{
        added_at: {type: Date, default: Date.now},
        title: String,
        photo : {type: String, default: "../../img/default.jpg"},
        educational_aims: [String],
        time_min: {type: Number, default: 60},
        synopsis: {type: String, default: null},
        _id: {
            type: Schema.ObjectId,
            ref: 'Workshop',
            required: true
        }
    }],
    workshops_instances: [{
        title: {type: String, required: true},
        photo : {type: String, default: "../../img/default.jpg"},
        educational_aims: [String],
        time_min: {type: Number, default: 60},
        synopsis: {type: String, default: null},
        added_at: {type: Date, default: Date.now},
        id: {
            type: Schema.ObjectId,
            ref: 'WorkshopInstance',
            required: true
        }
    }]
});

/**
 * Virtuals
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

UserSchema
    .virtual('user_info')
    .get(function () {
        return { '_id': this._id, 'username': this.username, 'email': this.email };
    });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
    return value && value.length;
};

UserSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'The specified email is invalid.');

UserSchema.path('email').validate(function(value, respond) {
    mongoose.models["User"].findOne({email: value}, function(err, user) {
        if(err) throw err;
        if(user) return respond(false);
        respond(true);

    });
}, 'The specified email address is already in use.');

UserSchema.path('username').validate(function(value, respond) {
    mongoose.models["User"].findOne({username: value}, function(err, user) {
        if(err) throw err;
        if(user) return respond(false);
        respond(true);
    });
}, 'The specified username is already in use.');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }

    if (!validatePresenceOf(this.password)) {
        next(new Error('Invalid password'));
    }
    else {
        next();
    }
});

/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     */

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
     * Make salt
     */

    makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
    },

    /**
     * Encrypt password
     */

    encryptPassword: function(password) {
        if (!password || !this.salt) return '';
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
    }

};

mongoose.model('User', UserSchema);