/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
'use strict';


var mongoose = require('mongoose');
var Workshop = mongoose.model('Workshop');
var ObjectID = require('mongodb').ObjectID;

var catalogue = require("../model/catalogue/catalogue.js");
/*** INTERFACE ***/
exports.getAllWorkshops = getAllWorkshopsImpl;
exports.createNewWorkshop = createNewWorkshopImpl;
exports.getWorkshop = getWorkshopImpl;
exports.removeWorkshop = removeWorkshopImpl;


/*** IMPLEMENTATION ***/

/**
 * Implementation : Return all workshops
 * @param req
 * @param res
 * @param next
 * @return [Workshop]
 */
function getAllWorkshopsImpl(req, res, next) {
    catalogue.getWorkshops().then(function (data) {
        res.json({
            state: "success",
            data: data
        });
    });
}

/**
 * Implementation : Create a new workshop
 * @param req
 * @param res
 * @param next
 *
 */
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

/**
 * Retrieve and return a specific workshop
 * @param req
 * @param res
 * @param next
 *
 * @return Workshop
 */
function getWorkshopImpl(req, res, next) {
    var id = req.params.id;
    catalogue.getWorkshop(id).then(function (data) {
        if (data) {
            res.json({
                state: "success",
                data: data
            });
        } else {
            res.json({
                state: "error",
                data: "NOT_FOUND"
            })
        }
    });

}

function removeWorkshopImpl(req, res, next) {
    console.log("DELETE WORKSHOP");
    var id = req.params.id;
    Workshop.remove({'_id': ObjectID(id)}, function (err) {
        if (err) {
            res.json({state: "error", data:err})
        }
        else {
            res.json({state: "success", data: "WORKSHOP_REMOVED"})
        }
    })
}