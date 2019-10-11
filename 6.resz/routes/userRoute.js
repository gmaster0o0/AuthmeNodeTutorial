const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/delete/:username', userController.deleteUser);

module.exports = router;
