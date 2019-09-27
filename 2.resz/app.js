const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config();

const AppError = require('./utils/error');
const globalErrorHandler = require('./controllers/errorController');
const indexRouter = require('./routes/indexRoute');
const usersRouter = require('./routes/userRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} Oldal nem található a szerveren`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
