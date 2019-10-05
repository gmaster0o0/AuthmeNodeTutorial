const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

//TODO logout route elkeszitese

module.exports = router;
