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

const DuplicatedEntryError = (error, req, res) => {
  const pattern = /entry '(\w+).+key\s*'(\w+)/;
  const match = pattern.exec(error.message);
  if (match[2] === 'username') {
    return res.render('error', { error, title: 'Valami baj történt', message: 'Ez a felhasználónév már szerepel' });
  }
  console.log(error);
  return res.render('error', { error, title: 'Valami baj történt', message: 'Valami nem jól sült el' });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.message.startsWith('Duplicate entry')) {
    return DuplicatedEntryError(error, req, res);
  }

  if (error.statusCode === 404) {
    return pageNotFound(error, req, res);
  }

  if (error.statusCode === 500) {
    return InternalServerError(error, req, res);
  }
  return createError(error, req, res);
};
