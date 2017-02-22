/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
/***
 * WARNING : FICHIER A DELETE POUR LA RELEASE
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/clean', function (req, res, next) {
    mongoose.model("Workshop").collection.drop();
    mongoose.model("Event").collection.drop();
    mongoose.model("User").collection.drop();
    mongoose.model("WorkshopInstance").collection.drop();
    res.json("Sauvage a cassé la DB, les données ont été supprimées");
});
module.exports = router;