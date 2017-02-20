/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  20/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var express = require('express');
var router = express.Router();
var multer  = require('multer');

var cloudinaryUploaderCtrl = require('../controllers/cloudinaryUploader');
var cloudinary  = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'pfepfe',
    api_key: '655199678973646',
    api_secret: '6cUzujY9jEAx5n6FeEDV_pCj3YA'
});


var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalname+'-'+Date.now());
    }
});

var upload = multer({ storage: storage });

router.post('/', upload.array('photos', 30), cloudinaryUploaderCtrl.UploadPhotos);
module.exports = router;