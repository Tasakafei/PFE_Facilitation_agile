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
router.put('/instances/:instanceId', auth.ensureAuthenticated, users.updateWorkshopInstance);
router.get('/instances/:instanceId', users.getWorkshopInstance);
router.post('/events', auth.ensureAuthenticated, users.addWorkshopEvent);
router.get('/events', auth.ensureAuthenticated, users.getEvents);
router.put('/events/:eventId', auth.ensureAuthenticated, users.updateEvent);
router.delete('/instances/:instanceId', auth.ensureAuthenticated, users.deleteInstanceWorkshop);

router.put('/auth/users/:id', auth.ensureAuthenticated,users.updatePseudo);



module.exports = router;
