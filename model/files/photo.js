/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  30/01/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');
var fs = require('fs');
function getPhoto(id, next)  {
    Photo.findOne(id, function (err, doc) {
        if (err) {
            return next(err);
        }
        return next(null, doc);
    })
}

function createPhoto(img, filename, contentType, next) {
    var photo = new Photo;
    photo.img.data = img;
    photo.img.contentType = contentType;
    photo.filename = filename;
    photo.save(function (err, photo) {
        if (err) {
            return next(err);
        }
        next(null, photo);
    })
}

function instanciatePhotoFiles() {
    Photo.find().exec(function (err, docs) {
        docs.forEach(function (doc) {
            fs.writeFile("public/uploads/"+doc.filename, doc.img.data, function(err) {
                if(err) {
                    return console.error(err);
                }
            });
        })
    })
}
module.exports = {
    getPhoto: getPhoto,
    createPhoto: createPhoto,
    instanciatePhotoFiles: instanciatePhotoFiles
};