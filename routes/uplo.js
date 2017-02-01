
var cloudinary  = require('cloudinary');
module.exports = {

    uploadImage: function(req, res, next) {
        if(req.files.file) {
            cloudinary.uploader.upload(req.files.file.path, function(result) {
                if (result.url) {
                    req.imageLink = result.url;
                    next();
                } else {
                    res.json(error);
                }
            });
        } else {
            next();
        }
    }
};