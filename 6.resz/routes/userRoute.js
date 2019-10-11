const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
<<<<<<< HEAD
const userController = require('../controllers/userController');
=======
>>>>>>> 77da9414b3f2ae621856ad02408ab7be9a487fc9

router.post('/login', authController.login);
router.post('/register', authController.register);

<<<<<<< HEAD
router.get('/delete/:username', userController.deleteUser);

=======
>>>>>>> 77da9414b3f2ae621856ad02408ab7be9a487fc9
module.exports = router;
