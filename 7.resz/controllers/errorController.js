const createError = (error, req, res) => {
  console.log(error);
  return res.render('error', { error, title: error.message, message: error.message });
};

const pageNotFound = (error, req, res) => {
  console.log(error);
  return res.render('error', { error, title: 'Oldal nem található', message: error.message });
};

const InternalServerError = (error, req, res) => {
  console.log(error);
  return res.render('error', { error, title: 'Valami baj történt', message: 'Valami nem jól sült el' });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.statusCode === 404) {
    return pageNotFound(error, req, res);
  }

  if (error.statusCode === 500) {
    return InternalServerError(error, req, res);
  }
  return createError(error, req, res);
};
