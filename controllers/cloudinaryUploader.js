/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  20/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
function UploadPhotosImpl(req, res, next) {
    for (var i = 0; i < req.files.length; ++i) {
        req.files[i] = { filename: req.files[i].filename};
    }
    return res.json({
        state: "success",
        data: req.files
    })
}

exports.UploadPhotos = UploadPhotosImpl;