/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  20/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var async = require('async');
function UploadPhotosImpl(req, res) {
    var files = [];
    async.each(req.files, function(file, callback) {
        files.push({ filename: file.url});
        callback();
    }, function() {
        req.files = files;
        return res.json({
            state: "success",
            data: req.files
        })
    });
}

exports.UploadPhotos = UploadPhotosImpl;