/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  25/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/
var express = require('express');
var router = express.Router();
var auth = require('../configurations/auth');
var users = require('../controllers/users');

/*** User routes ***/
router.post('/', users.addToFavoriteWorkshops);
router.get('/favorites', auth.ensureAuthenticated, users.getFavoriteWorkshops);
router.post('/instances', users.addWorkshopInstance);
router.get('/instances', users.getFavoriteWorkshops);

module.exports = router;
