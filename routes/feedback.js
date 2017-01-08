/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  25/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var express = require('express');
var router = express.Router();
var auth = require('../configurations/auth');
var instances = require('../controllers/instances');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname+ '-' + Date.now()+'.jpg')
    }
});

var upload = multer({ storage: storage });


/*** User routes ***/
router.post('/:instanceId', instances.addFeedbackToInstance);
router.post('/:instanceId/photos', upload.array('photos', 30), instances.UploadPhotos);
module.exports = router;
