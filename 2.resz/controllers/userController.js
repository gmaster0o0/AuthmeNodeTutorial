const UserModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const User = new UserModel();
exports.getAll = catchAsync(async (req, res, next) => {
  const [results] = await User.getAll();

  res.json({
    status: 'success',
    data: results
  });
});
