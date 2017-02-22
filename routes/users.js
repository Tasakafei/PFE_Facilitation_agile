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
router.delete('/favorites/:favoriteId', auth.ensureAuthenticated, users.deleteFavoriteWorkshops);
router.post('/instances', auth.ensureAuthenticated, users.addWorkshopInstance);
router.get('/instances', auth.ensureAuthenticated, users.getWorkshopInstances);
router.get('/instances/:instanceId', users.getWorkshopInstance);
router.post('/events', auth.ensureAuthenticated, users.addWorkshopEvent);
router.get('/events', auth.ensureAuthenticated, users.getEvents);
router.delete('/instances/:instanceId', auth.ensureAuthenticated, users.deleteInstanceWorkshop);
router.put('/profile', auth.ensureAuthenticated,users.changePassword);

/*** TEMPORARY ROUTES (TO_DELETE WHEN ACCOUNTS ARE INTEGRATED TO THE TAB) ***/
router.post('/unauth/:username/favorites', users.unauthaddToFavoriteWorkshops);
router.get('/unauth/:username/favorites', users.unauthgetFavoriteWorkshops);
router.post('/unauth/:username/instances', users.unauthaddWorkshopInstance);
router.get('/unauth/:username/instances', users.unauthgetWorkshopInstances);
router.get('/unauth/:username/instances/:instanceId', users.unauthgetWorkshopInstance);
router.delete('/unauth/:username/favorites/:favoriteId', users.unauthdeleteFavoriteWorkshops);
router.delete('/unauth/:username/instances/:instanceId', users.unauthdeleteInstanceWorkshop);
router.post('/unauth/:username/event/', users.unauthPostEvent);
router.get('/unauth/:username/events/', users.unauthGetEvents);

module.exports = router;
