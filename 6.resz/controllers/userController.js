const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

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

exports.changeUserPass = catchAsync(async (req, res, next) =>{
  const { username, newpassword } = req.body;
  const result = await user.changeUserPass({username, password:newpassword})
  console.log(result);
});