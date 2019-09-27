const AppError = (res, message, status) => {
  return res.status(status).json({
    status: 'fail',
    message
  });
};

module.exports = AppError;
