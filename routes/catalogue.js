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

router.post('/', function(req, res, next) {
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
});

/** GET workshop **/
router.get('/:id', function(req, res, next) {
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

});

module.exports = router;