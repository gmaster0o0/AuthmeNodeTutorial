const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/login', authController.login);
router.post(
  '/register',
  [
    // username must be an email
    check('username').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 8 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('info', 'validalasi hiba');
      return res.redirect('/register');
    }
    return next();
  },
  authController.register
);

router.get('/delete/:username', authController.protected, authController.onlyForAdmin, userController.deleteUser);
router.post('/updatePassword', authController.protected, authController.onlyForAdmin, userController.updatePassword);

module.exports = router;
