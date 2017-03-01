/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  20/02/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

app.service('CloudinaryClient', function ($http) {

    /*
     PUBLIC FUNCTIONS
     */
    delete $http.defaults.headers.common['X-Requested-With'];
    this.uploadPhotos = function (photos) {
        var fd = new FormData();
        for (var i = 0; i < photos.length; i++) {
            var imgBlob = dataURItoBlob(photos[i]);
            fd.append('photos', imgBlob);
        }
        return $http.post(
            "/api/v1/photos-uploader",
            fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }
        );
    };

    /*
     PRIVATE FUNCTIONS
     */
    function dataURItoBlob(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {
            type: mimeString
        });
    }

});