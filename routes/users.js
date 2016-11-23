var express = require('express');
var router = express.Router();
var auth = require('../configurations/auth');
var users = require('../controllers/users');
var session = require('../controllers/session');

/*** User routes ***/
router.post('/users', users.create);
router.get('/users/:userId', users.show);

// Check if username is available
router.get('/check_username/:username', users.exists);


/*** Session routes ***/
router.get('/session', auth.ensureAuthenticated, session.session);
router.post('/session', session.login);
router.delete('/session', session.logout);


// router.post('/register', function(req, res) {
//   Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//     if (err) {
//       return res.render("register", {info: "Sorry. That username already exists. Try again."});
//     }
//
//     passport.authenticate('local')(req, res, function () {
//       res.redirect('/');
//     });
//   });
// });
//
// router.post('/login', passport.authenticate('local'), function(req, res) {
//   res.redirect('/');
// });
//
// router.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
