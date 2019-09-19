const AppError = require('../utils/error');

const createError = (error, req, res) => {
  console.log(error);
  return res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  createError(error, req, res);
};
