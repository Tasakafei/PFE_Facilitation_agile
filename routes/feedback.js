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
var u =require('./uplo.js');
var multer  = require('multer');

var cloudinary  = require('cloudinary');
cloudinary.config({
    cloud_name: 'pfepfe',
    api_key: '655199678973646',
    api_secret: '6cUzujY9jEAx5n6FeEDV_pCj3YA'
});

var cloudinaryStorage = require('multer-storage-cloudinary');


var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname+'-'+Date.now());
    }
});
var upload = multer({ storage: storage });

router.post('/:instanceId', instances.addFeedbackToInstance);
router.post('/:instanceId/photos', upload.array('photos', 30), instances.UploadPhotos);
module.exports = router;





/*** User routes ***/