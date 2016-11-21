var express = require('express');
var router = express.Router();
var catalogue = require("../model/catalogue/catalogue.js");

/** GET workshops listing. **/
router.get('/', function(req, res, next) {
    catalogue.getWorkshops().then(function (data) {
        res.json({
            state: "success",
            data: data
        });
    });
});

/** POST : Add a workshop to the catalogue **/
/*
EXAMPLE :
{
 title: "Nouveau test",
 workshop_type: "Productif",
 link: "truc",
 goals: ["Bouger", "Echanger", "Partager des idées", "Dynamiser un groupe", "s'amuser"],
 participants_max: {type: Number, default: -1},
 participants_min: {type: Number, default: 3},
 public_targeted: "Tous",
 time_min: 10,
 time_max: 20,
 synopsis: "BLBALBAA,
 preparation_time: 10,
 content: {
     source: ,
     folklore: String,
     educational_aims: [String],
     equipment: [String],
     logistics: [String],
     participants_profil: [String]
 }
 }
 */
router.post('/', function(req, res, next) {
    catalogue.saveWorkshop(req.body).then(function (result) {
        return res.json({
            state: "success",
            data: result
        });
    });
});

module.exports = router;