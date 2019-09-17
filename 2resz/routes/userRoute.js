const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
/* GET users listing. */
router.get('/', authController.protected, userController.getAll);

module.exports = router;
