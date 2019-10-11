const jwt = require('jsonwebtoken');
const util = require('util');
const fs = require('fs');
const path = require('path');

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

  res.redirect('/');
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
  const result = await User.getOne({ username }, ['username, password']);

  if (result.length === 0) {
    return next(new AppError('Felhasznaló nem található!', 404));
  }

  const storedPassword = result.password;
  if (!hash.verifyPassword(storedPassword, password)) {
    return next(new AppError('Hibás felhasználónév vagy jelszó!', 404));
  }

  createToken(result, 200, req, res);
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
  const user = await User.getOne({ username: decoded.username });

  if (!user) {
    return next(new AppError('Ehhez a tokenhez nem tartozik user', 401));
  }
  //HA eljutnk ide akkor mindek oke es tobbi middleware szamara kuldunk adatot
  req.user = user;
  res.locals.user = user;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.getOne({ username: decoded.username });

  req.user = user;
  res.locals.user = user;
  if (!user) {
    return next();
  }
  next();
});

exports.isAdmin = (req, res, next) => {
  const userRoles = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/userRoles.json')));
  const { admins } = userRoles;

  if (!admins.includes(req.user.username)) {
    return next();
  }
  res.locals.isAdmin = true;
  next();
};

exports.onlyForAdmin = (req, res, next) => {
  const userRoles = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/userRoles.json')));
  const { admins } = userRoles;

  if (!admins.includes(req.user.username)) {
    return next(new AppError('Ehhez az oldalhoz adminak kell lenned', 403));
  }
  req.isAdmin = true;
  res.locals.isAdmin = true;
  next();
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'logout', { expires: new Date(Date.now()), httpOnly: true });
<<<<<<< HEAD
  return res.redirect('/');
=======
  res.redirect('/');
>>>>>>> 77da9414b3f2ae621856ad02408ab7be9a487fc9
};
