var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;


require('./model/files/schemas/photo');
require('./model/events/schemas/event.schema');
require('./model/mongo_connection');
require('./model/account/schemas/user');
require('./model/instances/schemas/workshop-instance.schema');
require('./model/catalogue/schemas/workshop');
var pass = require('./configurations/pass');
var auth = require('./routes/auth');
var users = require('./routes/users');
var catalogue = require('./routes/catalogue');
var feedback = require('./routes/feedback');
var cloudinaryUploader = require('./routes/cloudinaryUploader');
var dbCleaner = require('./routes/db.dev');
var app = express();

var photoModel = require('./model/files/photo');

photoModel.instanciatePhotoFiles();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// required for passport
app.use(require('express-session')({
    secret: 'MEAN',
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/auth', auth);
app.use('/users', users);
app.use('/api/v1/catalogue', catalogue);
app.use('/api/v1/feedback', feedback);
app.use('/api/v1/photos-uploader', cloudinaryUploader);
app.use('/api/v1/db-cleaner', dbCleaner);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;