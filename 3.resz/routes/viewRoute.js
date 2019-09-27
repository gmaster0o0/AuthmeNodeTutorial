const express = require('express');
const UserModel = require('../models/userModel');

const router = express.Router();

const User = new UserModel();
const authController = require('../controllers/authController');

router.get('/', authController.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', authController.protected, async function(req, res, next) {
  const [results] = await User.getAll();
  res.render('list', { userList: results });
});
module.exports = router;
