const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const authController = require('../controllers/authController');

router.get('/', authController.isLoggedIn, authController.isAdmin, function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/register', authController.isLoggedIn, function(req, res, next) {
  res.render('register', { title: 'Regisztráció' });
});

router.get('/settings', authController.isLoggedIn, function(req, res, next) {
  res.render('settings');
});

router.get('/settingssecure', csrfProtection, authController.isLoggedIn, function(req, res, next) {
  res.render('settingssecure', { csrfToken: req.csrfToken() });
});

router.get('/logout', authController.logout);

module.exports = router;
