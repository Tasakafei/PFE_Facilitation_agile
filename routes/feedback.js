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
var upload = multer({ dest: 'uploads/' });


/*** User routes ***/
router.post('/:instanceId', instances.addFeedbackToInstance);
app.post('/:instanceId/picture', upload.single('photo'), instances.UploadPhoto);
router.post('/:instanceId/picture', instances.UploadPhoto);
module.exports = router;
