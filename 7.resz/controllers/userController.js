const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const hash = require('../utils/hash');

const user = new UserModel();
exports.getAll = catchAsync(async (req, res, next) => {
  const [results] = await user.getAll();

  res.locals.userList = results;

  next();
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const result = await user.deleteOne({ username });

  if (result.affectedRows) {
    return res.status(200).redirect('/admin');
  }

  return res.status(304).redirect('/admin');
});

// TODO updatePassword
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const newPassword = hash.computeHash(password, hash.generateSalt());

  const result = await user.updateOne({ username }, { password: newPassword });

  if (result.affectedRows) {
    return res.status(200).redirect('/admin');
  }

  return res.status(304).redirect('/admin');
});
