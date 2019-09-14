const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authController.login);
router.post('/register', authController.register);
module.exports = router;
