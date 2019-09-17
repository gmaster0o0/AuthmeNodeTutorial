const AppError = require('../utils/error');
const User = require('../models/userModel');

exports.getAll = async (req, res, next) => {
  try {
    const [results] = await User.Model();

    res.json({
      status: 'success',
      data: results
    });
  } catch (error) {
    console.log(error);
    AppError(res, error, 500);
  }
};
