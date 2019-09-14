const mysql = require('mysql2');
const jwt = require('jsonwebtoken');

const AppErrpr = require('../utils/error');
const hash = require('../utils/hash');

const connectionOptions = {
  host: 'remotemysql.com',
  user: '3HWv7jHr9Y',
  database: '3HWv7jHr9Y',
  password: process.env.SQL_PASS
};

const singToken = username => {
  return jwt.sign({ username }, 'SuperSecretPrivateKey', { expiresIn: '30d' });
};

exports.register = (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { username, email, password, passwordConfirm } = req.body;

  const query = `INSERT into authme (realname, username, password, email) VALUES (?,?,?,?)`;

  const connection = mysql.createConnection(connectionOptions);

  const newPassword = hash.computeHash(password, hash.generateSalt());

  connection.query(query, [username, username.toLowerCase(), newPassword, email], (err, result) => {
    if (err) {
      connection.close();
      return AppErrpr(res, err.message, 500);
    }
    const token = singToken(username);

    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true
    });

    res.json({
      status: 'success',
      data: result
    });
    connection.close();
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  const query = 'SELECT password from authme WHERE `username` = ?';

  const connection = mysql.createConnection(connectionOptions);

  connection.query(query, [username], (err, result) => {
    if (err) {
      connection.close();
      return AppErrpr(res, err.message, 500);
    }
    if (result.length === 0) {
      return AppErrpr(res, 'Felhasznaló nem található!', 404);
    }
    const storedPassword = result[0].password;
    if (!hash.verifyPassword(storedPassword, password)) {
      return AppErrpr(res, 'Hibás felhasználónév vagy jelszó!', 404);
    }
    singToken(username);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Bejelentkezés sikeres'
      }
    });
  });
};
