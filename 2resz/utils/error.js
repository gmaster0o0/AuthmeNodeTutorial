class AppError extends Error {
  constructor(message, statusCode) {
    if (typeof message !== 'string') {
      return new Error('Érvénytelen hiba üzenet');
    }
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
