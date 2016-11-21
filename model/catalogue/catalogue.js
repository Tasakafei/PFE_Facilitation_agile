/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
require('./schemas/workshop');
require('./schemas/step');
var Workshop = mongoose.model('Workshop');

var Promise = require('promise');

module.exports = {
    saveWorkshop: saveWorkshopFct,
    getWorkshops: getWorkshopsFct
};

function saveWorkshopFct (workshop) {
    console.log("Save workshop");
    return new Promise(function (resolve, reject) {
        var workshop = new Workshop(workshop);
        workshop.save(function(err, workshop) {
            if (err) {
                return reject(err)
            }
            return resolve(workshop);
        })
    })
}

function getWorkshopsFct () {
    return new Promise(function (resolve, reject) {
        Workshop.find({}, function(req, res) {
            console.log(res);
            resolve(res);
        });
    })
}

