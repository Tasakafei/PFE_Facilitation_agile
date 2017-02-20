'use strict';

/**
 * Controller of an instance of a workshop (see global documentation on github for more information)
 * @author Alexandre Cazala <alexandre.cazala@gmail.com>
 * @module controller/instance
 */
var WorkshopInstance = require('../model/instances/workshop-instance');

function addFeedbackToInstanceImpl (req, res) {
    var workshopInstanceId = req.params.instanceId;
    var feedback = req.body.feedback;
    var photos = feedback.photos.slice(0);
    delete feedback.photos;
    WorkshopInstance.addFeedback(workshopInstanceId, feedback, req.user, photos)
        .then(function (result) {
        return res.json({
            state: "success",
            data: result
        });
        })
}

exports.addFeedbackToInstance = addFeedbackToInstanceImpl;
