/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

//let db = new sqlite3.Database(':memory:', (err) => {
const db = new sqlite3.Database('./test.db', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to test SQlite database.');
});

//db.run("CREATE TABLE user(username TEXT, password TEXT)");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all('SELECT * FROM user', function(err, users) {
    if (err) return res.send(err);
    res.render('index', { title: 'Express', users });
  });
});

router.post('/login', function(req, res, next) {
  login2(req, res);
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;

  const query = `INSERT INTO user (username, password) VALUES ('${username}', '${password}');`;
  console.log(query);
  db.run(query, (err, result) => {
    if (err) return res.send(err);
    res.redirect('/');
  });
});

//password: [" or ""="] OK 	"password": "\" or \"\"=\""
//password: [' or '1'='1] NEM
//password: [" or ""="] username: [" or ""="] OK
//password: [' or ''='] username: [' or ''='] NEM
const login1 = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username = "${username}" AND password = "${password}"`;
  console.log(query);
  db.all(query, (err, user) => {
    if (err) return res.send(err);
    if (!user || user.length === 0) return res.send('Nincs ilyen felhasznaló');

    res.send({ status: 'sikers bejelntkezes', user });
  });
};
//password: [' or '1'='1] OK
//password: [" or ""="] NEM
//password: [" or ""="] username: [" or ""="] NEM
//password: [' or ''='] username: [' or ''='] OK
// [' or '1'='1]
// [' or 1='1]
// [1' or 1=1 -- -]
// [' or '1'='1] [' or '1'='1]
// [1' or 1=1 -- -] [eztutinemjo]
// [1' or 1=1 --] [eztutinemjo]
// [';DROP TABLE user --]
const login2 = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`;
  console.log(query);
  db.all(query, (err, user) => {
    if (err) return res.send(err);
    if (!user || user.length === 0) return res.send('Nincs ilyen felhasznaló');

    res.send({ status: 'sikers bejelntkezes', user });
  });
};

const login3 = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM user WHERE username  = "${username}"`;
  db.get(query, (err, user) => {
    if (err) return res.send(err);
    if (!user || user.length === 0) return res.send('Nincs ilyen felhasznaló');
    if (user.password !== password) return res.send('Hibás jelszó');

    res.send({ status: 'sikers bejelntkezes', user });
  });
};

module.exports = router;
