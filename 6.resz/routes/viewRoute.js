const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.isLoggedIn, authController.isAdmin, function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/register', authController.isLoggedIn, function(req, res, next) {
  res.render('register', { title: 'Regisztráció' });
});

router.get('/logout', authController.logout);

router.get('/changepassword', function(req, res, next){
  res.render('changepass', {title: 'Jelszó változtatás'});
});

module.exports = router;
