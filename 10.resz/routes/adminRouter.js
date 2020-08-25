const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get(
  '/',
  authController.protected,
  authController.onlyForAdmin,
  userController.getAll,
  async (req, res, next) => {
    res.render('admin');
  }
);

module.exports = router;
