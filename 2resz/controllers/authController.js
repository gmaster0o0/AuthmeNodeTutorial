const jwt = require('jsonwebtoken');
const util = require('util');

const AppError = require('../utils/error');
const hash = require('../utils/hash');
const modelFactory = require('../models/modelFactory');
const User = modelFactory.createModel('authme');

const singToken = username => {
  return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const createToken = (user, statusCode, req, res) => {
  const token = singToken(user.username);

  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    httpOnly: true
  });

  res.status(statusCode).json({
    status: 'success',
    data: user
  });
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    const newPassword = hash.computeHash(password, hash.generateSalt());
    const newUser = {
      username,
      realname: username.toLowerCase(),
      password: newPassword,
      email
    };
    const result = await User.createOne(newUser);

    createToken(newUser, 201, req, res);
  } catch (error) {
    return AppError(res, error, 500);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await User.getOne({ username }, ['password']);
    if (result.length === 0) {
      return AppError(res, 'Felhasznaló nem található!', 404);
    }

    const storedPassword = result[0].password;
    if (!hash.verifyPassword(storedPassword, password)) {
      return AppError(res, 'Hibás felhasználónév vagy jelszó!', 404);
    }

    createToken('login succesfull', 200, req, res);
  } catch (error) {
    return AppError(res, error.message, 500);
  }
};

exports.protected = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return AppError(res, 'Nem vagy beloginolva, kérlek tedd meg, hogy elérd ezt az oldalt', 401);
    }

    const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.getOne({ username: decoded });

    if (!user) {
      return AppError(res, 'Ehhez a tokenhez nem tartozik user', 401);
    }
    next();
  } catch (error) {
    return AppError(res, error.message, 500);
  }
};
