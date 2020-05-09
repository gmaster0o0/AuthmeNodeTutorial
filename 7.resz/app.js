const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv').config();

const AppError = require('./utils/error');
const globalErrorHandler = require('./controllers/errorController');
const usersRouter = require('./routes/userRoute');
const viewRouter = require('./routes/viewRoute');
const adminRouter = require('./routes/adminRouter');

const app = express();

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use('/', viewRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`${req.originalUrl} Oldal nem található a szerveren`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
