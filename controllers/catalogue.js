'use strict';

/**
 * Controller of the catalogue (describe which action is allowed on the catalogue)
 * @module controller/catalogue
 * @author Alexandre Cazala <alexandre.cazala@gmail.com>
 * @created_at 23/11/16
 */

var mongoose = require('mongoose');
var Workshop = mongoose.model('Workshop');
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var catalogue = require("../model/catalogue/catalogue.js");
/*** INTERFACE ***/
/**
 * Implementation : Return all workshops
 * @param req
 * @param res
 * @param next
 * @method
 */
exports.getAllWorkshops = getAllWorkshopsImpl;

/**
 * Implementation : Create a new workshop
 * @param req
 * @param res
 * @param next
 *
 */
exports.createNewWorkshop = createNewWorkshopImpl;

/**
 * Retrieve and return a specific workshop
 * @param req
 * @param res
 * @param next
 *
 */
exports.getWorkshop = getWorkshopImpl;

/**
 * Retrieve and return a specific workshop
 *
 * @param req
 * @param res
 * @param next
 *
 */
exports.removeWorkshop = removeWorkshopImpl;


/*** IMPLEMENTATION ***/

function getAllWorkshopsImpl(req, res, next) {
    catalogue.getWorkshops().then(function (data) {
        res.json({
            state: "success",
            data: data
        });
    });
}

function createNewWorkshopImpl(req, res, next) {
    catalogue.saveWorkshop(req.body)
        .then(function (result) {
            return res.json({
                state: "success",
                data: result
            });
        })
        .then(function (error) {
            console.log(error);
            res.json({
                state: "error",
                data: error
            })
        });
}


function getWorkshopImpl(req, res, next) {
    var id = req.params.id;
    catalogue.getWorkshop(id).then(function (data) {
        if (data) {
            if (req.user) {
                var user = req.user;
                if (user.workshops_favorites !== []) {
                    async.each(user.workshops_favorites, function (item, _callback) {
                        var t1 = item._id.toString();
                        var t2 = data._id.toString();
                        if (t1 === t2) {
                            _callback(true);
                        } else {

                            _callback(null);
                        }
                    }, function (isFav) {
                        res.json({
                            state: "success",
                            data: data,
                            isFavorite: isFav
                        });

                    });
                } else {
                    res.json({
                        state: "success",
                        data: data
                    })
                }

            }
            else {
                res.json({
                    state: "success",
                    data: data
                })
            }
        } else {
            res.json({
                state: "error",
                data: "NOT_FOUND"
            })
        }
    });

}

function removeWorkshopImpl(req, res, next) {
    var id = req.params.id;
    catalogue.deleteWorkshop(id).then(function (data) {
        res.json({state: "success", data: data})
    }, function(err) {
        console.error(err);
        res.json({state: "error", data: err})
    });
    /*Workshop.remove({'_id': ObjectID(id)}, function (err) {
        if (err) {
            res.json({state: "error", data:err})
        }
        else {
            res.json({state: "success", data: "WORKSHOP_REMOVED"})
        }
    })*/
}