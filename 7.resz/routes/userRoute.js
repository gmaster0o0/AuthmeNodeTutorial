const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/delete/:username', authController.protected, authController.onlyForAdmin, userController.deleteUser);
router.post('/updatePassword', authController.protected, authController.onlyForAdmin, userController.updatePassword);

module.exports = router;
