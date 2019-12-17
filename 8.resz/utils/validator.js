const { validationResult } = require('express-validator');
const AppError = require('./error');

exports.verify = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors.array({ onlyFirstError: true })[0].msg, 400));
  }
  return next();
};

exports.getErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.mapped();
    return res.render('register', { errorMessage });
  }
  return next();
};
