var express = require('express');
var router = express.Router();
var auth = require('../configurations/auth');
var users = require('../controllers/users');
var session = require('../controllers/session');

/*** User routes ***/
router.post('/users', users.create);
router.get('/users/:userId', users.show);
router.put('/users', users.changePassword);


// Check if username is available
router.get('/check_username/:username', users.exists);
router.post('/favorites', users.addToFavoriteWorkshops);

/*** Session routes ***/
router.get('/session', session.session);
router.post('/session', session.login);
router.delete('/session', session.logout);

module.exports = router;
