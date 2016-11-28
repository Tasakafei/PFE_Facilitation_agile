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
router.post('/favorites', auth.ensureAuthenticated, users.addToFavoriteWorkshops);
router.get('/favorites', auth.ensureAuthenticated,  users.getFavoriteWorkshops);
router.post('/instances', auth.ensureAuthenticated, users.addWorkshopInstance);
router.get('/instances', auth.ensureAuthenticated, users.getFavoriteWorkshops);

router.post('/unauth/:username/favorites', users.unauthaddToFavoriteWorkshops);
router.get('/unauth/:username/favorites', users.unauthgetFavoriteWorkshops);
router.post('/unauth/:username/instances', users.unauthaddWorkshopInstance);
router.get('/unauth/:username/instances', users.unauthgetFavoriteWorkshops);

module.exports = router;
