const jwt = require('jsonwebtoken');
const util = require('util');

const AppError = require('../utils/error');
const catchAsync = require('../utils/catchAsync');
const hash = require('../utils/hash');
const UserModel = require('../models/userModel');

const User = new UserModel();

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

exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return next(new AppError('Jelszó és a megerősítés különbözik', 400));
  }

  const newPassword = hash.computeHash(password, hash.generateSalt());
  const newUser = {
    username,
    realname: username.toLowerCase(),
    password: newPassword,
    email
  };
  await User.createOne(newUser);

  createToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const result = await User.getOne({ username }, ['password']);
  if (result.length === 0) {
    return next(new AppError('Felhasznaló nem található!', 404));
  }

  const storedPassword = result[0].password;
  if (!hash.verifyPassword(storedPassword, password)) {
    return next(new AppError('Hibás felhasználónév vagy jelszó!', 404));
  }

  createToken('login succesfull', 200, req, res);
});

exports.protected = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('Nem vagy beloginolva, kérlek tedd meg, hogy elérd ezt az oldalt', 401));
  }

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.getOne({ username: decoded });

  if (!user) {
    return next(new AppError('Ehhez a tokenhez nem tartozik user', 401));
  }
  next();
});
