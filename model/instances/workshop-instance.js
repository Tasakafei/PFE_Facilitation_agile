/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var Workshop = mongoose.model('Workshop');
var ObjectId = mongoose.Types.ObjectId;
var WorkshopInstance = mongoose.model("WorkshopInstance");
var Promise = require('promise');

function addFeedbackImpl (workshopInstanceId, feedback, user, photos) {
    return new Promise(function (resolve, reject) {
        WorkshopInstance.findOne(ObjectId(workshopInstanceId) , function(err, model) {
            if (err) {
                reject(err);
            } else {
                // On rajoute la photo à l'atelier
                photos.forEach(function(photo) {
                    //TODO Check if it is not null
                    model.photos.push(photo);
                });
                // Si l'utilisateur est connecté...
                if (user) {
                    // On regarde si il fait parti des facilitateurs
                    for(var i = 0; i < model.facilitators.length; ++i) {
                        if (model.facilitators[i].name == user.username) {
                            model.feedbacks.facilitators.push(feedback);
                            model.save();
                            resolve({status: "success", data: "success"});
                            return;
                        }
                    }
                }
                // Sinon, on le considère en tant que participant seulement

                model.feedbacks.participants.push(feedback);
                model.save();
                resolve(model);
            }
        });
    })
}

function removeInstance(id) {
    return new Promise(function (resolve, reject) {
        var object = ObjectId(id);
        console.log("HERE");
        WorkshopInstance.findOne(object, function (req, res) {
            res.remove(function(err) {
                if (err) {
                    reject(err)
                } else {
                    console.log("yo");

                    Workshop.update({"instances": object}, {$pull: { "instances": object }}).exec(function() {
                        resolve();
                    });
                }
            });
        });
    })
}
module.exports = {
    addFeedback: addFeedbackImpl,
    removeInstance: removeInstance
};
