const express = require('express');
const { check } = require('express-validator');
const csrf = require('csurf');

const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const validatorUtils = require('../utils/validator');

const csrfProtection = csrf({ cookie: true });

router.post(
  '/login',
  check('username')
    .not()
    .isEmpty()
    .withMessage('hiányzik a felhasználónév'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('hiányzik a jelszó'),

  validatorUtils.verify,
  authController.login
);
router.post(
  '/register',
  check('username')
    .isLength({ min: 5 })
    .withMessage('hiányzik a felhasználónév'),
  check('email')
    .isEmail()
    .withMessage('Érvénytelen email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Túl rövid jelszó'),
  check('password')
    .matches(/\d+/)
    .withMessage('Jelszónak legalább egy számot kell tartalmaznia'),
  check('password')
    .matches(/[a-z]+/)
    .withMessage('Jelszónak legalább egy kisbetüt kell tartalmaznia'),
  check('password')
    .matches(/[A-Z]+/)
    .withMessage('Jelszónak legalább egy nagy betüt kell tartalmaznia'),
  check('passwordConfirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('A jelszó megerősítés nem egyezik a jelszóval');
    }
    return true;
  }),

  validatorUtils.getErrors,
  authController.register
);
router.post('/changemypasswordsecure', csrfProtection, authController.protected, userController.changemypassword);
router.post('/changemypassword', authController.protected, userController.changemypassword);
router.get('/delete/:username', authController.protected, authController.onlyForAdmin, userController.deleteUser);
router.post('/updatePassword', authController.protected, authController.onlyForAdmin, userController.updatePassword);

module.exports = router;
