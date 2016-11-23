var mongoose = require('mongoose');
var config = require('../configurations/database');
mongoose.connect(config.db);