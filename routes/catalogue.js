var express = require('express');
var router = express.Router();
var catalogue = require("../model/database2.js").catalogue;

/* GET workshops listing. */
router.get('/', function(req, res, next) {
    res.json(catalogue.getWorkshops());
});

module.exports = router;
