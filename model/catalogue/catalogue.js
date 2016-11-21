/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
require('./schemas/workshop');
var Workshop = mongoose.model('Workshop');

var Promise = require('promise');

module.exports = {
    saveWorkshop: saveWorkshopFct,
    getWorkshops: getWorkshopsFct
};

function saveWorkshopFct (workshop) {
    var test = workshop;
    return new Promise(function (resolve, reject) {
        var newWorkshop = new Workshop(test);
        newWorkshop.save(function(err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }else {

                console.log("succ");
                resolve(data);
            }
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

