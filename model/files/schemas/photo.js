/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  30/01/17                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema({
        img: { data: Buffer, contentType: String},
        filename: String
    });

mongoose.model('Photo', PhotoSchema);