/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  21/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');

// Step
var WorkshopStepSchema = new mongoose.Schema({
    title: String,
    description: String,
    timing: Number
});

mongoose.model('WorkshopStep', WorkshopStepSchema);

