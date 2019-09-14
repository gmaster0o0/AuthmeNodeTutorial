const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD
});

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM `authme`', function(err, results) {
    if (err) {
      return res.json({
        status: 'fail',
        message: err.message
      });
    }
    res.json({
      status: 'success',
      data: results
    });
  });
});

module.exports = router;
