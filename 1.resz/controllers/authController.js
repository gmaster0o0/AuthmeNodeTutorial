const jwt = require('jsonwebtoken');

const AppError = require('../utils/error');
const hash = require('../utils/hash');
const mysqlConnection = require('../config/mysqlConnection');

let connection;

const singToken = username => {
  return jwt.sign({ username }, 'SuperSecretPrivateKey', { expiresIn: '30d' });
};

exports.register = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    const newPassword = hash.computeHash(password, hash.generateSalt());
    const queryString = `INSERT into authme (realname, username, password, email) VALUES (?,?,?,?)`;
    connection = await mysqlConnection.connect();
    const result = await connection.query(queryString, [username, username.toLowerCase(), newPassword, email]);

    const token = singToken(username);
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true
    });
    res.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    return AppError(res, error, 500);
  } finally {
    connection.close();
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const query = 'SELECT password from authme WHERE `username` = ?';
    const connection = await mysql.createConnection(connectionOptions);
    const result = await connection.query(query, [username]);

    if (result.length === 0) {
      return AppError(res, 'Felhasznaló nem található!', 404);
    }

    const storedPassword = result[0].password;
    if (!hash.verifyPassword(storedPassword, password)) {
      return AppError(res, 'Hibás felhasználónév vagy jelszó!', 404);
    }
    const token = singToken(username);
    res.cookie('jwt', token, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Bejelentkezés sikeres'
      }
    });
  } catch (error) {
    return AppError(res, error.message, 500);
  } finally {
    connection.close();
  }
};
