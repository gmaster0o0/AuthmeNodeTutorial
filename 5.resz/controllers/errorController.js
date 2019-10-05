const createError = (error, req, res) => {
  console.log(error);
  return res.status(error.statusCode).json({
    status: error.status,
    error: error,
    message: error.message,
    stack: error.stack
  });
};

const renderErrorPage = (error, req, res) => {
  console.log(error);
  return res.render('error', { error, title: 'Oldal nem található' });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.statusCode === 404) {
    renderErrorPage(error, req, res);
  }
  createError(error, req, res);
};
