const express = require('express');

const router = express.Router();
const mysqlConnection = require('../config/mysqlConnection');
const AppError = require('../utils/error');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const connection = await mysqlConnection.connect();

    const results = connection.query('SELECT * FROM `authme`');

    res.json({
      status: 'success',
      data: results
    });
  } catch (error) {
    console.log(error);
    AppError(res, error, 500);
  }
});

module.exports = router;
